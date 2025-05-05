import React, { useRef, useContext, useEffect, useState, useMemo } from "react";
import { RenderEngineContext } from "../DataContenxt";
import * as cornerstone from "@cornerstonejs/core";
import * as cornerstoneTools from "@cornerstonejs/tools";
import { MetaData, recreateUriStringList, initalValues } from "../utils";
import { MetaDataListContext } from "../DataContenxt";
import { Loader2 } from "lucide-react";


interface ViewportCompProps {
  metadataId: number;
  stateFlag: boolean;
  setStateFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

const ViewportComp: React.VFC<ViewportCompProps> = ({
  metadataId,
  stateFlag,
  setStateFlag,
}) => {
  const { metaDataList, setMetaDataList } = useContext(MetaDataListContext);
  const refValue = useRef(metaDataList);
  const [metadata, setMetadata] = useState<MetaData>(initalValues);
  const [isloading, setIsloading] = useState(true);
  const [progress, setProgress] = useState(0);

  const stack = recreateUriStringList(
    metadata.prefix,
    metadata.suffix,
    metadata.min_slice,
    metadata.max_slice,
    metadata.pad,
    metadata.step
  );

  const viewportId = `${String(metadata.id)}-vp`;
  const elementRef = useRef<HTMLDivElement>(null);
  const renderingEngine = useContext(RenderEngineContext);

  useMemo(() => {
    setMetadata(metaDataList.find((x) => x.id === metadataId) || initalValues);
    refValue.current = metaDataList;
  }, [metaDataList, metadataId]);

  const updateStates = (_event: Event) => {
    if (renderingEngine) {
      const vp = renderingEngine.getViewport(viewportId) as cornerstone.StackViewport;
      //@ts-ignore
      const window = cornerstone.utilities.windowLevel.toWindowLevel(vp.voiRange.lower, vp.voiRange.upper);
      const [x, y] = vp.getPan();
      setMetaDataList(
        [...refValue.current].map((object) => {
          if (object.id === metadata.id) {
            return {
              ...object,
              wc: window.windowCenter,
              ww: window.windowWidth,
              ci: vp.getCurrentImageIdIndex() + object.start_slice,
              z: vp.getZoom(),
              px: String(x),
              py: String(y),
            };
          } else return object;
        })
      );
    }
  };


  const pLimit = (limit: number) => {
    const queue: (() => Promise<void>)[] = [];
    let active = 0;
  
    const next = () => {
      if (active >= limit || queue.length === 0) return;
      const fn = queue.shift();
      if (fn) {
        active++;
        fn().finally(() => {
          active--;
          next();
        });
      }
    };
  
    return async (fn: () => Promise<void>) => {
      queue.push(fn);
      next();
    };
  };

  useEffect(() => {
    const viewportInput = {
      viewportId,
      type: cornerstone.Enums.ViewportType.STACK,
      element: elementRef.current as HTMLInputElement,
      defaultOptions: {},
    };

    const loadImagesAndDisplay = async () => {
      if (!renderingEngine) return;

      setIsloading(true); // Start loading

      renderingEngine.enableElement(viewportInput);
      const viewport = renderingEngine.getViewport(viewportId) as cornerstone.StackViewport;

      viewport.element.addEventListener("mousemove", updateStates);
      viewport.element.addEventListener("wheel", updateStates);

      const imageSliceStack = stack.slice(
        metadata.start_slice,
        metadata.end_slice + 1
      );
      //await preloadImagesThrottled(imageSliceStack); // Preload all slices before setStack

      const limit = pLimit(10);
      imageSliceStack.forEach((id) => {
        limit(() => cornerstone.imageLoader.loadAndCacheImage(id));
      });

      await viewport.setStack(
        imageSliceStack,
        metadata.ci - metadata.start_slice
      );

      viewport.setZoom(metadata.z);
      viewport.setPan([Number(metadata.px), Number(metadata.py)]);

      viewport.setProperties({
        voiRange: cornerstone.utilities.windowLevel.toLowHighRange(metadata.ww, metadata.wc),
        isComputedVOI: true,
      });

      viewport.render();
      setIsloading(false); // Finish loading
    };

    const addCornerstoneTools = () => {
      const {
        PanTool,
        WindowLevelTool,
        StackScrollMouseWheelTool,
        ZoomTool,
        ToolGroupManager,
        Enums: csToolsEnums,
      } = cornerstoneTools;

      const { MouseBindings } = csToolsEnums;
      const toolGroupId = `${String(metadata.id)}-tl`;

      ToolGroupManager.createToolGroup(toolGroupId);
      const toolGroup = ToolGroupManager.getToolGroup(toolGroupId);
      if (toolGroup) {
        toolGroup.addTool(WindowLevelTool.toolName);
        toolGroup.addTool(PanTool.toolName);
        toolGroup.addTool(ZoomTool.toolName);
        toolGroup.addTool(StackScrollMouseWheelTool.toolName, { loop: false });

        toolGroup.setToolActive(WindowLevelTool.toolName, {
          bindings: [{ mouseButton: MouseBindings.Primary }],
        });
        toolGroup.setToolActive(PanTool.toolName, {
          bindings: [{ mouseButton: MouseBindings.Auxiliary }],
        });
        toolGroup.setToolActive(ZoomTool.toolName, {
          bindings: [{ mouseButton: MouseBindings.Secondary }],
        });
        toolGroup.setToolActive(StackScrollMouseWheelTool.toolName);

        toolGroup.addViewport(`${viewportId}`, "myRenderingEngine");
      }
    };

    if (renderingEngine) {
      loadImagesAndDisplay().then(() => {
        addCornerstoneTools();
      });
    }

    return () => {
      console.log("unmounting viewport");
    };
  }, [metadataId]);

  useEffect(() => {
    const update = async () => {
      if (renderingEngine) {
        const viewport = renderingEngine.getViewport(viewportId) as cornerstone.StackViewport;
        if (viewport && stateFlag) {
          await viewport.setStack(
            stack.slice(metadata.start_slice, metadata.end_slice + 1),
            metadata.ci - metadata.start_slice
          );
          viewport.setZoom(metadata.z);
          viewport.setPan([
            metadata.px === "-" ? 0 : Number(metadata.px),
            metadata.py === "-" ? 0 : Number(metadata.py),
          ]);
          viewport.setProperties({
            voiRange: cornerstone.utilities.windowLevel.toLowHighRange(metadata.ww, metadata.wc),
            isComputedVOI: true,
          });
          viewport.render();
          setStateFlag(false);
        }
      }
    };
    update();
  }, [metaDataList]);

  return (
    <>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div
          ref={elementRef}
          id={viewportId}
          style={{ width: "100%", height: "100%" }}
        />
        {isloading && (
            <div className="absolute inset-0 z-50 bg-black/60 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-16 h-16 animate-spin text-white" aria-hidden="true" />
            <h2 className="text-2xl font-semibold text-white">Loading...</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewportComp;
