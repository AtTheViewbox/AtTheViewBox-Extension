import { MetaData } from "../utils";
import * as React from "react";
import { useDrag } from "react-dnd";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { GripVertical } from "lucide-react";

interface DragCompProps {
    metadata: MetaData;
    metaDataList: MetaData[];
    setMetaDataList: React.Dispatch<React.SetStateAction<MetaData[]>>;
}

const DragComp: React.VFC<DragCompProps> = ({
    metadata,
    metaDataList,
    setMetaDataList,
}) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "card",
        item: { id: metadata.id },
        collect: (monitor: any) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

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

        <div className="flex min-h-[100px] min-w-[100px] items-center space-x-4 rounded-md border p-4 transform" ref={drag}>
            <GripVertical size={16} style={{position: 'fixed', left: '0px'}} />
                <X  className ="hover:bg-accent rounded-sm" size={16} onClick={resetPosition} style={{position: 'fixed', right: '2px', top: '2px'}}/>
            <div className="ml-1">
                {metadata.label}
            </div>
        </div>
        

    );
};

export default DragComp;