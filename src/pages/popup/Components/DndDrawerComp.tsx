
import { useState, useEffect } from "react";

import { MetaData } from "../utils";

import * as React from "react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { X, Plus, Minus, ClipboardCopy, Copy, CopyCheck } from "lucide-react";
import Drawer from 'react-modern-drawer'
import ImageDrawerComp from "./ImageDrawerComp";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card"
import { Label } from "./ui/label";
import DragComp from "./DragComp";
import DropComp from "./DropComp";
import Grid from 'dynamic-react-grid'
import { Input } from "./ui/input";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip"


import { generateGridURL } from "../utils";




interface DndDrawerCompProps {
    metaDataList: MetaData[];
    setMetaDataList: React.Dispatch<React.SetStateAction<MetaData[]>>;
    setDrawerState: React.Dispatch<React.SetStateAction<boolean>>;
}

const DndDrawerComp: React.VFC<DndDrawerCompProps> = ({
    metaDataList,
    setMetaDataList,
    setDrawerState,
}) => {
    const [url, setURL] = useState<string>("Click Generate URL");
    const [copyClicked, setCopyClicked] = useState<boolean>(false);
    const [rows, setRows] = useState<number>(1);
    const [cols, setCols] = useState<number>(1);
    const [metaDataSelected, setMetaDataSelected] = useState(0);
    const [drawerState, setDrawerState] = useState(false);

    const addCol = () => {
        if (cols < 3) setCols(cols + 1);
    };
    const minusCol = () => {
        if (cols > 1) setCols(cols - 1);
    };
    const addRow = () => {
        if (rows < 3) setRows(rows + 1);
    };
    const minusRow = () => {
        if (rows > 1) setRows(rows - 1);
    };
    useEffect(() => {

        setURL(generateGridURL(metaDataList, rows, cols))
        setCopyClicked(false)


    }, [metaDataList]);


    return (
        <>  <ScrollArea className="h-[600px] w-[400px]">

<Drawer
          open={drawerState}
          onClose={() => setDrawerState(false)}
          direction='left'
          size="400px"
        >

          <ImageDrawerComp
            setDrawerState={setDrawerState}
            metadataId={metaDataSelected}
          />

        </Drawer>
            <Button variant="ghost" onClick={() => setDrawerState(false)}>
                <X />
            </Button>
            <Card >
            <CardHeader>
          <CardTitle>AtTheViewBox Url Generator</CardTitle>
          <CardDescription>Create iframe urls for presentation</CardDescription>
        </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid w-full max-w-sm items-center gap-2 grid-cols-3">
                        {metaDataList.map((data) => {
                            if (data.cord[0] == -1 && data.cord[1] == -1) {
                                return (

                                    <DragComp
                                        metadata={data}
                                        metaDataList={metaDataList}
                                        setMetaDataList={setMetaDataList}
                                    />

                                );
                            }
                        })}
                    </div>
                    <div className="flex h-[350px] w-[350px] items-center justify-center rounded-md">
                        {Array.from(Array(cols).keys()).map((c) => (
                            <Grid row className="h-full">
                                {Array.from(Array(rows).keys()).map((r) => (
                                    <Grid spacing={1}>
                                        <DropComp
                                            metaDataList={metaDataList}
                                            r={r}
                                            c={c}

                                            setMetaDataList={setMetaDataList}
                                        /></Grid>
                                )
                                )}
                            </Grid>
                        ))}
                    </div>

                    <div className="flex w-full max-w-sm items-center space-x-3">
                        <div className="flex w-full max-w-sm items-center space-x-2">
                            <Label>Columns</Label>
                            <Plus onClick={addCol} className="hover:bg-accent" />
                            <Minus onClick={minusCol} className="hover:bg-accent" />
                        </div>
                        <div className="flex w-full max-w-sm items-center space-x-2">
                            <Label>Rows</Label>
                            <Plus onClick={addRow} className="hover:bg-accent" />
                            <Minus onClick={minusRow} className="hover:bg-accent" />
                        </div>
                    </div>

                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input disabled placeholder={url} />

                        <TooltipProvider delayDuration={50}  >
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button size="icon" onClick={() => {
                                        navigator.clipboard.writeText(url)
                                        setCopyClicked(true)
                                    }
                                    }>
                                        {copyClicked ?

                                            <CopyCheck className="h-4 w-4" />
                                            :
                                            <Copy className="h-4 w-4" />}

                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent align={'end'} alignOffset={0} avoidCollisions={false}>
                                    
                                    {copyClicked ? "Copied!": "Copy Url"}
                                    
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                    </div>
                </CardContent>

            </Card>
        </ScrollArea>
        </>
    );
};

export default DndDrawerComp;