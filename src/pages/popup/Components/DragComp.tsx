import { MetaData } from "../utils";
import * as React from "react";
import { useDrag } from "react-dnd";
import { Button } from "./ui/button";
import { X, Pencil, GripVertical } from "lucide-react";


interface DragCompProps {
    metadata: MetaData;
    metaDataList: MetaData[];
    setMetaDataList: React.Dispatch<React.SetStateAction<MetaData[]>>;
    setMetaDataSelected: React.Dispatch<React.SetStateAction<number>>;
    setDrawerState: React.Dispatch<React.SetStateAction<boolean>>;
}

const DragComp: React.VFC<DragCompProps> = ({
    metadata,
    metaDataList,
    setMetaDataList,
    setMetaDataSelected,
    setDrawerState
}) => {
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
            <GripVertical size={16} style={{ position: 'fixed', left: '0px' }} />
            <X className="hover:bg-accent rounded-sm" size={16} onClick={resetPosition} style={{ position: 'fixed', right: '2px', top: '2px' }} />
            <Pencil onClick={() => toggleDrawer(metadata)} className="hover:bg-accent rounded-sm" size={16} style={{ position: 'fixed', right: '2px', bottom: '2px' }} />
            <div className="ml-1 break-words">
                <p className="break-words">{metadata.label}</p>
            </div>
        </div>


    );
};

export default DragComp;