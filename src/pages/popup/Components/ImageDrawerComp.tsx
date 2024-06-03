import { useState, useMemo, useEffect } from "react";
import { MetaDataListContext } from "../DataContenxt";
import { MetaData, initalValues } from "../utils";
import { useContext } from "react";
import { X } from 'lucide-react';
import { Button } from "./ui/button";
import ViewportComp from "./ViewportComp";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label"
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Info } from 'lucide-react';
import TooltipSliderComp from "./TooltipSliderComp";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import '/src/pages/popup/Components/slider.css'






interface ImageDrawerCompProps {
  metadataId: number;
  setDrawerState: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageDrawerComp: React.VFC<ImageDrawerCompProps> = ({
  metadataId,
  setDrawerState,
}) => {

  const [metadata, setMetadata] = useState<MetaData>(initalValues);
  const [stateFlag, setStateFlag] = useState(false);
  const { metaDataList, setMetaDataList, setValue } = useContext(MetaDataListContext);

  const handleRangeChange = (value:any) => {
    if (!Array.isArray(value)) {
      return;
    }
    console.log(value)
    setStateFlag(true)
  
   
      setMetaDataList([...metaDataList].map(object => {
        if(object.id === metadata.id) {
          return {
            ...object,
            start_slice: value[0],
            end_slice:value[1],
            ci: (metadata.ci<value[0])?value[0]:(metadata.ci>value[1])?value[1]:metadata.ci

          }
        }
        else return object;
      }))}


  useEffect(() => {
    // @ts-ignore
    setMetadata(metaDataList.find((x) => x.id === metadataId) || initalValues);
    console.log(metadata)
  }, [metaDataList, metadataId]);

  const handleClose = () => {
    setDrawerState(false)
    setValue(metaDataList);
  };

  const saveStates = (
    key: string,
    event: any
  ) => {
    if (event.key === 'Enter'){
    setStateFlag(true);

    setMetaDataList(
      [...metaDataList].map((object) => {
        if (object.id === metadataId) {
          if (key === "ci") {
            
            if (Number(event.target.value) > object.end_slice) {
              return {
                ...object,
                [key]: object.end_slice,
              };
            }
            if (Number(event.target.value) < object.start_slice) {
              return {
                ...object,
                [key]: 0,
              };
            }
          }
          return {
            ...object,
            [key]: event.target.value,
          };
        } else return object;
      })
    );
  }
  };

  return (
    <>
      <ScrollArea className="h-[600px] w-[400px]">
        <div className="flex w-full max-w-sm items-center">
        <Button variant="ghost" onClick={() => handleClose()}>
          <X />
        </Button>
        {/**<div className="items-right">
        <Info/>
  </div>*/}
        </div>

        <div style={{ height: "400px", width: "400px" }}>
          <ViewportComp
            metadataId={metadata.id}
            stateFlag={stateFlag}
            setStateFlag={setStateFlag}
          />
        </div>
        <Card className="w-[400px] mt-4">
        
          <CardContent className="grid gap-4">
            <div className="grid gap-y-5"> 
              <div className="grid w-full max-w-sm items-center gap-2 ">
                <Label htmlFor="email">Slice Range</Label>
                <TooltipSliderComp range
                min={metadata.min_slice} 
                max={metadata.max_slice} 
                value={[metadata.start_slice,metadata.end_slice]}
                tipFormatter={(value) => `${value}`}
                onChange={handleRangeChange}

                styles={{
                  tracks: {
                    background: `black`,
                  },
                  track: {
                    background: 'transparent',
                  },
                  handle:{
                    background:`black`,
                    borderColor:'black',
                    cursor: "pointer",
                    boxShadow:"black",
                  
                  },
                  
                
              
                }}
                
                />
         
              </div>
              <div className="grid w-full max-w-sm items-center gap-2 grid-cols-2">
                <Label htmlFor="ww">Window Width: {metadata.ww}</Label>
                <Input type="ww" id="ww" placeholder="Window Width" onKeyDown={(e:React.KeyboardEvent<HTMLInputElement>) =>
                saveStates("ww", e)}/>
                <Label htmlFor="wc">Window Center: {metadata.wc}</Label>
                <Input type="wc" id="wc" placeholder="Window Center" onKeyDown={(e:React.KeyboardEvent<HTMLInputElement>) =>
                saveStates("wc", e)}/>
                <Label htmlFor="wc">Current Slice: {metadata.ci}</Label>
                <Input type="ci" id="ci" placeholder="Current Slice" onKeyDown={(e:React.KeyboardEvent<HTMLInputElement>) =>
                saveStates("ci", e)}/>
                <Label htmlFor="zoom">Zoom: {metadata.z}</Label>
                <Input type="zoom" id="zoom" placeholder="Zoom" onKeyDown={(e:React.KeyboardEvent<HTMLInputElement>) =>
                saveStates("z", e)}/>
                <Label htmlFor="panx">Pan X: {metadata.px}</Label>
                <Input type="panx" id="panx" placeholder="Pan X axis" onKeyDown={(e:React.KeyboardEvent<HTMLInputElement>) =>
                saveStates("px", e)}/>
                <Label htmlFor="pany">Pan Y: {metadata.py}</Label>
                <Input type="pany" id="pany" placeholder="Pan Y axis" onKeyDown={(e:React.KeyboardEvent<HTMLInputElement>) =>
                saveStates("py", e)}/>

              </div>
            </div>
          </CardContent>
        </Card>
      </ScrollArea>
    </>


  );
};

export default ImageDrawerComp;