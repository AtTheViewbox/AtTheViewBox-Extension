import { MetaData } from "../utils";
import * as React from "react";
import { useContext } from "react";
import { useDrag } from "react-dnd";
import { X, Pencil, GripVertical } from "lucide-react";
import { RenderEngineContext } from "../DataContenxt";
import ThumbnailViewportComp from "./ThumbnailViewportComp";


interface DragCompProps {
    metadata: MetaData;
    metaDataList: MetaData[];
    setMetaDataList: React.Dispatch<React.SetStateAction<MetaData[]>>;
    setMetaDataSelected: React.Dispatch<React.SetStateAction<number>>;
    setDrawerState: React.Dispatch<React.SetStateAction<boolean>>;
    imageToggle: boolean
}

const DragComp: React.VFC<DragCompProps> = ({
    metadata,
    metaDataList,
    setMetaDataList,
    setMetaDataSelected,
    setDrawerState,
    imageToggle,
}) => {
    const renderingEngine = useContext(RenderEngineContext);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "card",
        item: { id: metadata.id },
        collect: (monitor: any) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const toggleDrawer = (metadata: MetaData) => {
        setMetaDataSelected(metadata.id);
        setDrawerState(true);
    };

    const resetPosition = () => {
        setMetaDataList(
            [...metaDataList].map((object) => {
                if (object.id === metadata.id) {
                    return {
                        ...object,
                        cord: [-1, -1],
                    };
                } else return object;
            })
        );
    };

    return (
        <div className="flex min-h-[100px] min-w-[100px] max-h-[110px] max-w-[110px]  items-center space-x-4 rounded-md border p-4 transform overflow-hidden" ref={drag}>
            < GripVertical size={16} style={{ position: 'fixed', left: '0px' }} />
            {metadata.cord.toString() === "-1,-1" ? null : <X className="hover:bg-accent rounded-sm" size={16} onClick={resetPosition} style={{ position: 'fixed', right: '2px', top: '2px' }} />}
            <Pencil onClick={() => toggleDrawer(metadata)} className="hover:bg-accent rounded-sm" size={16} style={{ position: 'fixed', right: '2px', bottom: '2px' }} />

            {imageToggle ?
                <div style={{ height: "60px", width: "80px" }}>
                    {renderingEngine ?
                        <ThumbnailViewportComp metadata={metadata} renderingEngine={renderingEngine} /> : null}
                </div> :
                <div className="ml-1 break-words">
                    <p className="break-words">{metadata.label}</p>
                </div>

            }
        </div>

    );
};

export default DragComp;