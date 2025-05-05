import { createContext, useState, useEffect } from "react";
import { PropsWithChildren } from "react";
import * as cornerstone from "@cornerstonejs/core";
import * as cornerstoneTools from "@cornerstonejs/tools";
import { useChromeStorageLocal } from "use-chrome-storage";

//@ts-ignore
import cornerstoneDICOMImageLoader from "@cornerstonejs/dicom-image-loader";
import dicomParser from "dicom-parser";
import { MetaData,checkUrlQuery,getAdjustedWC,getAdjustedWW } from "./utils";
import { parseDicom } from "dicom-parser";
import { createClient } from '@supabase/supabase-js';

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



  const cl = createClient(
    "https://gcoomnnwmbehpkmbgroi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdjb29tbm53bWJlaHBrbWJncm9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzNDE5NDEsImV4cCI6MjA0MDkxNzk0MX0.S3Supif3vuWlAIz3JlRTeWDx6vMttsP5ynx_XM9Kvyw"
  );



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

  useEffect(() => {

    const makerequest = async (metaDataList: MetaData[]) => {
      const newMetaDataList = [...metaDataList]
      for (let metadata of metaDataList) {
        
        const response = await fetch(metadata.thumbnail);
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
        var rescaleSlope = Number(
          dataSet.string("x00281053")?.split("\\")[0]
        );
        newMetaData.rescaleSlope = rescaleSlope?rescaleSlope:1
        
        newMetaData.wc =checkUrlQuery(newMetaData, "wc")? getAdjustedWC(checkUrlQuery(newMetaData, "wc"),newMetaData):getAdjustedWC(windowCenter,newMetaData)
        
        newMetaData.ww =checkUrlQuery(newMetaData, "ww")? getAdjustedWW(checkUrlQuery(newMetaData, "ww"),newMetaData):getAdjustedWW(windowWidth,newMetaData)
   
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
        setValue,cl
      }}>
        {children}
      </MetaDataListContext.Provider>
    </RenderEngineContext.Provider>
  );
};