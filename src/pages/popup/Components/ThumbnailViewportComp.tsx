import React, { useRef, useEffect } from "react";
import * as cornerstone from "@cornerstonejs/core";
import { MetaData, recreateUriStringList } from "../utils";

interface ViewportCompProps {
  metadata: MetaData;
  renderingEngine: cornerstone.RenderingEngine;
}

const ThumbnailViewportComp: React.VFC<ViewportCompProps> = ({
  metadata,
  renderingEngine
}) => {

  //const [metadata, setMetadata] = useState<MetaData>(initalValues);
  const viewportId = `${String(metadata.id)}TN-vp`;
  const elementRef = useRef<HTMLDivElement>(null);

  const stack = recreateUriStringList(
    metadata.prefix,
    metadata.suffix,
    metadata.min_slice,
    metadata.max_slice,
    metadata.pad,
    metadata.step
  );

  useEffect(() => {
    const viewportInput = {
      viewportId,
      type: cornerstone.Enums.ViewportType.STACK,
      element: elementRef.current as HTMLInputElement,
      defaultOptions: {},
    };

    const loadImagesAndDisplay = async () => {
      if (renderingEngine) {
        renderingEngine.enableElement(viewportInput);
        const viewport = renderingEngine.getViewport(
          viewportId
        ) as cornerstone.StackViewport;
         
        const thumbnail = stack[metadata.ci]
     
        cornerstone.imageLoader.loadAndCacheImage(thumbnail);
         
        await viewport.setStack([thumbnail]);
        
        viewport.setZoom(metadata.z);
        viewport.setPan([Number(metadata.px), Number(metadata.py)]);

       viewport.setProperties({
        voiRange: cornerstone.utilities.windowLevel.toLowHighRange(metadata.ww, metadata.wc),
        isComputedVOI: true,
      });

        viewport.render();
      }
    };


    if (renderingEngine) {
      loadImagesAndDisplay()
    }

  }, [ metadata]);

  return (
    <><div
        ref={elementRef}
        id={viewportId}
        style={{ width: "100%", height: "100%" }}
      />
      
    </>
  );
};

export default ThumbnailViewportComp;