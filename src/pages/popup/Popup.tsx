
import { useContext, useEffect, useState } from "react";
import { MetaDataListContext } from "./DataContenxt";
import { Button } from "./Components/ui/button"
import { Plus, Minus, Copy, Check } from "lucide-react";
import { Input } from "./Components/ui/input";
import { Label } from "./Components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./Components/ui/card"
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import ImageDrawerComp from "./Components/ImageDrawerComp";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Grid from 'dynamic-react-grid'
import { ScrollArea } from "./Components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./Components/ui/tooltip"
import DragComp from "./Components/DragComp";
import DropComp from "./Components/DropComp";
import { generateGridURL } from "./utils";
import { Switch } from "./Components/ui/switch"
import { Skeleton } from "./Components/ui/skeleton";


function App() {
  const { metaDataList, setMetaDataList } = useContext(MetaDataListContext);
  const [metaDataSelected, setMetaDataSelected] = useState(0);
  const [drawerState, setDrawerState] = useState(false);
  const [imageToggle, setImageToggle] = useState(false);
  const [rows, setRows] = useState<number>(1);
  const [cols, setCols] = useState<number>(1);
  const [copyClicked, setCopyClicked] = useState<boolean>(false);
  const [url, setURL] = useState<string>("Click Generate URL");
 
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

    console.log(url)
  }, [metaDataList,imageToggle]);


  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <ScrollArea className="h-[600px] w-[400px]">

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
                      data.intLoad?
                      <Skeleton className="h-[100px] w-[100px] rounded-xl" />:
                      <DragComp
                        metadata={data}
                        metaDataList={metaDataList}
                        setMetaDataList={setMetaDataList}
                        setMetaDataSelected={setMetaDataSelected}
                        setDrawerState={setDrawerState}
                        imageToggle = {imageToggle}
                      />
                    );
                  }
                })}
              </div>

              <div className="flex w-full max-w-sm items-center space-x-2">
                  <Label>Image Toggle</Label>
                  <Switch id="toggle" checked={imageToggle}
                      onCheckedChange={()=>setImageToggle(!imageToggle)}/>
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
                          setMetaDataSelected={setMetaDataSelected}
                          setDrawerState={setDrawerState}
                          imageToggle = {imageToggle}

                        /></Grid>
                    )
                    )}
                  </Grid>
                ))}
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

                          <Check className="h-4 w-4" />
                          :
                          <Copy className="h-4 w-4" />}

                      </Button>
                    </TooltipTrigger>
                    <TooltipContent align={'end'} alignOffset={0} avoidCollisions={false}>

                      {copyClicked ? "Copied!" : "Copy Url"}

                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

              </div>
            </CardContent>

          </Card>
        </ScrollArea>
      </DndProvider>
    </>
  )
}

export default App;