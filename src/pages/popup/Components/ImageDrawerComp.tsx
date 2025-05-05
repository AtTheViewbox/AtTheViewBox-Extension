import { useState, useEffect } from "react";
import { MetaDataListContext } from "../DataContenxt";
import { MetaData, initalValues } from "../utils";
import { useContext } from "react";
import { X} from 'lucide-react';
import { Button } from "./ui/button";
import ViewportComp from "./ViewportComp";
import {
  Card,
  CardContent,
  CardDescription,

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
          ci: value[1]
        }
      }
      else return object;
    }))
  }


  useEffect(() => {

    setMetadata(metaDataList.find((x) => x.id === metadataId) || initalValues);
  }, [metaDataList, metadataId]);

  const handleClose = () => {
    setDrawerState(false)
    setValue(metaDataList);
  };

  return (
    <>
      <ScrollArea className="h-[600px] w-[400px]">
        <div className="flex w-full max-w-sm items-center">
          <Button variant="ghost" onClick={() => handleClose()}>
            <X />
          </Button>
          <Label>{metadata.label}</Label>

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
                  min={0}
                  max={Number((metadata.max_slice-metadata.min_slice)/metadata.step)}
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
              <InputComp setting="ww" label="Window Width" metadata={metadata} setStateFlag={setStateFlag}/>
              <InputComp setting="wc" label="Window Center"  metadata={metadata} setStateFlag={setStateFlag}/>
              <InputComp setting="ci" label="Current Slice"  metadata={metadata} setStateFlag={setStateFlag}/>
              <InputComp setting="z" label="Zoom"  metadata={metadata} setStateFlag={setStateFlag}/>
              <InputComp setting="px" label="Pan Horizontal"  metadata={metadata} setStateFlag={setStateFlag}/>
              <InputComp setting="py" label="Pan Vertical"  metadata={metadata} setStateFlag={setStateFlag}/>

            </div>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Button className="w-full" onClick={handleClose}>

                Save and Close
              </Button>
            </div>
          </CardContent>
        </Card>
      </ScrollArea>
    </>


  );
};

export default ImageDrawerComp;