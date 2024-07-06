import { createContext, useState, useEffect } from "react";
import { PropsWithChildren } from "react";
import * as cornerstone from "@cornerstonejs/core";
import * as cornerstoneTools from "@cornerstonejs/tools";
import { useChromeStorageLocal } from "use-chrome-storage";

//@ts-ignore
import cornerstoneDICOMImageLoader from "@cornerstonejs/dicom-image-loader";
import dicomParser from "dicom-parser";
import { MetaData } from "./utils";
import { parseDicom } from "dicom-parser";
import { flushSync } from "react-dom";

//export const DataContext = createContext();
interface MetaDataListContextProp {
  metaDataList: MetaData[];
  setMetaDataList: React.Dispatch<React.SetStateAction<MetaData[]>>;
  setValue: React.Dispatch<React.SetStateAction<MetaData[]>>;
}

export const RenderEngineContext = createContext<
  cornerstone.RenderingEngine | undefined
>(undefined);
export const MetaDataListContext = createContext<MetaDataListContextProp>({
  metaDataList: [],
  setMetaDataList: () => { },
  setValue: () => { },
});

export const DataProvider = ({ children }: PropsWithChildren<{}>) => {
  const [metaDataList, setMetaDataList] = useState<MetaData[]>([]);
  const [renderingEngine, SetRenderingEngine] =
    useState<cornerstone.RenderingEngine>();
  const [value, setValue, isPersistent, error, isInitialStateResolved] =
    useChromeStorageLocal("PAC_DATA", []);
  const [isLoaded, setisLoaded] = useState(false);

  useEffect(() => {

    const setupCornerstone = async () => {
      cornerstoneDICOMImageLoader.external.cornerstone = cornerstone;
      cornerstoneDICOMImageLoader.external.dicomParser = dicomParser;
      await cornerstone.init();
      await cornerstoneTools.init();

      const renderingEngineId = "myRenderingEngine";
      const re = new cornerstone.RenderingEngine(renderingEngineId);
      SetRenderingEngine(re);

      const {
        PanTool,
        WindowLevelTool,
        StackScrollTool,
        StackScrollMouseWheelTool,
        ZoomTool,
        PlanarRotateTool,
      } = cornerstoneTools;

      cornerstoneTools.addTool(PanTool);
      cornerstoneTools.addTool(WindowLevelTool);
      cornerstoneTools.addTool(StackScrollTool);
      cornerstoneTools.addTool(StackScrollMouseWheelTool);
      cornerstoneTools.addTool(ZoomTool);
      cornerstoneTools.addTool(PlanarRotateTool);
    };

    setupCornerstone();
  }, []);

  useEffect(() => {
    setMetaDataList(value);
  }, [value]);

  function checkUrlQuery(object: MetaData, search: string) {
    const urlParams = new URLSearchParams(object.url.split("?")[1]);

    if (urlParams.get("s") == String(object.id) && urlParams.has(search)) {
      return Number(urlParams.get(search));
    }
    return 0;
  }


  useEffect(() => {

    const makerequest = async (metaDataList: MetaData[]) => {
      const newMetaDataList = [...metaDataList]
      for (let metadata of metaDataList) {
        
        var url =
          metadata.prefix +
          String(metadata.start_slice).padStart(metadata.pad, "0") +
          metadata.suffix;
        const response = await fetch(url);
        const buffer = await response.arrayBuffer();
        var byteArray = new Uint8Array(buffer);
        var dataSet = parseDicom(byteArray);
        var windowCenter = Number(
          dataSet.string("x00281050")?.split("\\")[0]
        );
        var windowWidth = Number(
          dataSet.string("x00281051")?.split("\\")[0]
        );

        var rescaleIntercept = Number(
          dataSet.string("x00281052")?.split("\\")[0]
        );

        const newMetaData = newMetaDataList.find(
          object => object.id == metadata.id && metadata.intLoad
        );
        if (newMetaData){
        newMetaData.rescaleIntercept=rescaleIntercept?rescaleIntercept:0
        //newMetaData.wc =checkUrlQuery(newMetaData, "wc")? newMetaData.wc: metadata.modality == "CT" ? windowCenter + 1000 : windowCenter
        newMetaData.wc =checkUrlQuery(newMetaData, "wc")? checkUrlQuery(newMetaData, "wc")- newMetaData.rescaleIntercept: windowCenter- newMetaData.rescaleIntercept
        if (!newMetaData.wc){
          newMetaData.wc =40
        }
        newMetaData.ww =checkUrlQuery(newMetaData, "ww")? checkUrlQuery(newMetaData, "ww"): windowWidth
        if (!newMetaData.ww){
          newMetaData.ww =400
        }
        newMetaData.intLoad = false


        } 
       
      }
    
      setMetaDataList(newMetaDataList)
    }
    if (metaDataList.length != 0 && !isLoaded) {
      setisLoaded(true);
     makerequest(metaDataList)

      }
  }, [metaDataList]);

  return (
    <RenderEngineContext.Provider value={renderingEngine}>

      <MetaDataListContext.Provider value={{
        metaDataList, setMetaDataList,
        // @ts-ignore
        setValue
      }}>
        {children}
      </MetaDataListContext.Provider>
    </RenderEngineContext.Provider>
  );
};