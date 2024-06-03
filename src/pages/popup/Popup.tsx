
import { useContext, useEffect, useState } from "react";
import { MetaDataListContext } from "./DataContenxt";
import { Button } from "./Components/ui/button"
import { MetaData } from "./utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./Components/ui/card"
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import ImageDrawerComp from "./Components/ImageDrawerComp";
import DndDrawerComp from "./Components/DndDrawerComp";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


function App() {
  const { metaDataList, setMetaDataList } = useContext(MetaDataListContext);
  const [metaDataSelected, setMetaDataSelected] = useState(0);
  const [drawerState, setDrawerState] = useState(false);
  const [dndDrawerState, setDndDrawerState] = useState(false);
  useEffect(() => {

    console.log(metaDataList)

  }, [metaDataList]);

  const handleClick = (metadata: MetaData) => {
    setMetaDataSelected(metadata.id);
    setDrawerState(true);
  };

  const handleClickDndDrawer = () => {
    setDndDrawerState(true);
  };
  return (
    <>
  <DndProvider backend={HTML5Backend}>
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>AtTheViewBox Url Generator</CardTitle>
          <CardDescription>Create iframe urls for presentation</CardDescription>
        </CardHeader>

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

        <Drawer
          direction='right'
          open={dndDrawerState}
          onClose={() => setDndDrawerState(false)}
          size="400px"
        >
          <DndDrawerComp
            setDrawerState={setDndDrawerState}
            metaDataList={metaDataList}
            setMetaDataList={setMetaDataList}
          />
        </Drawer>
        <CardContent className="grid gap-4">


          {metaDataList.map((metadata) => (
            <Button variant="ghost" onClick={() => handleClick(metadata)}>

              <p className="text-lg font-normal ">
                {metadata.label}
              </p>

            </Button>

          ))}

        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleClickDndDrawer}>Format</Button>
        </CardFooter>
      </Card>
      </DndProvider>
    </>
  )
}

export default App;