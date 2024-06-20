import { useState, useMemo, useEffect } from "react";
import { MetaDataListContext } from "../DataContenxt";
import { MetaData, initalValues } from "../utils";
import { useContext } from "react";
import { X,Trash,Save } from 'lucide-react';
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

import { ScrollArea } from "./ui/scroll-area";
import TooltipSliderComp from "./TooltipSliderComp";

import 'rc-slider/assets/index.css';
import '/src/pages/popup/Components/slider.css'
import InputComp from "./InputComp";







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
  const [disabled,setDisabled]= useState(false);


  const handleRangeChange = (value: any) => {
    if (!Array.isArray(value)) {
      return;
    }
    setStateFlag(true)


    setMetaDataList([...metaDataList].map(object => {
      if (object.id === metadata.id) {
        return {
          ...object,
          start_slice: value[0],
          end_slice: value[2],
          //ci: (metadata.ci<value[0])?value[0]:(metadata.ci>value[2])?value[2]:metadata.ci
          ci: value[1]

        }
      }
      else return object;
    }))
  }


  useEffect(() => {
    // @ts-ignore
    setMetadata(metaDataList.find((x) => x.id === metadataId) || initalValues);
  
  }, [metaDataList, metadataId]);



  const handleClose = () => {
    setDrawerState(false)
    setValue(metaDataList);
  };

  const saveStates = (
    key: string,
    event: any
  ) => {
    if (event.key === 'Enter') {
      setStateFlag(true);
      

      setMetaDataList(
        [...metaDataList].map((object) => {
          if (object.id === metadataId) {
            if (key === "wc") {
              return {
                ...object,
                [key]: object.modality == "CT" ? (Number(event.target.value) + 1000) : Number(event.target.value),
                //[key]: (Number(event.target.value)),
              }

            }

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
          <Label>{metadata.label}</Label>
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
          <CardDescription>Adjust the values the scan will initially load with.</CardDescription>

            <div className="grid gap-y-3">
              <div className="grid w-full max-w-sm items-center gap-2 ">
                <Label htmlFor="email">Slice Range</Label>
                <TooltipSliderComp range
                  min={metadata.min_slice}
                  max={metadata.max_slice}
                  value={[metadata.start_slice, metadata.ci, metadata.end_slice]}
                  tipFormatter={(value) => `${value}`}
                  onChange={handleRangeChange}
                  handleStyle={[
                    {
                      backgroundColor: 'black',
                      borderColor: 'black',
                      cursor: "pointer",
                      boxShadow: "black",

                    }, {
                      backgroundColor: 'white',
                      borderColor: 'black',
                      cursor: "pointer",
                      boxShadow: "black",

                    }, {
                      backgroundColor: 'black',
                      borderColor: 'black',
                      cursor: "pointer",
                      boxShadow: "black",

                    }]}
                  styles={{
                    tracks: {
                      background: `black`,
                    },
                    track: {
                      background: 'transparent',
                    },



                  }}

                />

              </div>
              <InputComp setting="ww" label="Window Width" saveStates={saveStates} metadata={metadata}/>
              <InputComp setting="wc" label="Window Center" saveStates={saveStates} metadata={metadata}/>
              <InputComp setting="ci" label="Current Slice" saveStates={saveStates} metadata={metadata}/>
              <InputComp setting="z" label="Zoom" saveStates={saveStates} metadata={metadata}/>
              <InputComp setting="px" label="Pan Horizontal" saveStates={saveStates} metadata={metadata}/>
              <InputComp setting="py" label="Pan Vertical" saveStates={saveStates} metadata={metadata}/>
             
            
            </div>
            <div className="flex w-full max-w-sm items-center space-x-2">
                {/**<Button className="w-1/2" onClick={()={}}><Trash />Discard</Button>*/}
              <Button className="w-full" disabled ={disabled} onClick={()=>{
              
                setValue(metaDataList)
                setDisabled(true)
                setTimeout(function() {
                  setDisabled(false)
                }, 1000);
            

              }}><Save />Save</Button>
              </div>
          </CardContent>
        </Card>
      </ScrollArea>
    </>


  );
};

export default ImageDrawerComp;