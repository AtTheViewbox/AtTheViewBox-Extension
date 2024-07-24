import { MetaData } from "../utils";
import { useState, useEffect, useContext } from "react";
import * as React from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Save, Pencil, RotateCcw } from "lucide-react";
import { MetaDataListContext } from "../DataContenxt";
import { getReveredAdjustedWC,getReveredAdjustedWW,getAdjustedWC,getAdjustedWW} from "../utils";


interface InputCompProps {
    setting: "wc" | "ww" | "ci" | "z" | "px" | "py";
    label: string;
    metadata: MetaData;
    setStateFlag: React.Dispatch<React.SetStateAction<boolean>>
}

const InputComp: React.VFC<InputCompProps> = ({
    setting,
    label,
    metadata,
    setStateFlag
}) => {
    const { metaDataList, setMetaDataList, setValue } = useContext(MetaDataListContext);
    const [tempData, setTempData] = useState(
        setting == "wc" ? 
        getReveredAdjustedWC(metadata) : 
        setting == "ww"?
        getReveredAdjustedWW(metadata):
        metadata[setting]
    );

    const [edited, setEdited] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setTempData(setting == "wc" ? 
            getReveredAdjustedWC(metadata) : 
            setting == "ww"?
            getReveredAdjustedWW(metadata):
            metadata[setting])
        //setTempData(metadata[setting])
    }, [metadata]);

    const saveStates = () => {
        setStateFlag(true);
        setMetaDataList(
            [...metaDataList].map((object) => {
                if (object.id === metadata.id) {
                    if (setting === "wc") {
                        return {
                            ...object,
                            [setting]:getAdjustedWC(Number(tempData),metadata)
                        }
                    }
                    else if(setting === "ww") {
                        return {
                            ...object,
                            [setting]:getAdjustedWW(Number(tempData),metadata)
                        }
                    }
                    else if (setting === "ci") {

                        if (Number(tempData) > object.end_slice) {
                            return {
                                ...object,
                                [setting]: object.end_slice,
                            };
                        }
                        if (Number(tempData) < object.start_slice) {
                            return {
                                ...object,
                                [setting]: 0,
                            };
                        }
                    }
                    return {
                        ...object,
                        [setting]: Number(tempData),
                    };
                } else return object;
            })
        );

    };


    return (
        <div className="grid w-full max-w-sm items-center gap-2 grid-cols-10 ">
            <div className="col-span-3">
                <Label size="lg" htmlFor={setting}>{label}</Label>
            </div>
            <div className="col-span-3">
                <Input type={setting} id={setting}
                    value={tempData}
                    onChange={(e) => {
                        setError(false)
                        setTempData(e.target.value)
                        setEdited(false)
                    }}
                    className={error?"focus-visible:ring-red-600":""}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key == "Enter") {
                            if (!isNaN(Number(e.target.value))) {
                                saveStates()
                                e.target.blur()
                                setEdited(true)
                            }else setError(true)
                            
                        }
                    }}
                />
            </div>
            <div className="col-span-2">

                {edited ?
                    <Button className="w-full" onClick={() => { document.getElementById(setting)?.focus() }}><Pencil /></Button> :
                    <Button className="w-full"
                        disabled={isNaN(Number(tempData))}
                        onClick={saveStates}
                    >
                        <Save />
                    </Button>
                }

            </div>
            <div className="col-span-2">
                <Button className="w-full"
                    disabled={edited}
                    onClick={() => {
                        setTempData(setting == "wc" ? 
                            getReveredAdjustedWC(metadata) : 
                            setting == "ww"?
                            getReveredAdjustedWW(metadata):
                            metadata[setting])
                        setEdited(false)
                        setError(false)
                    }}>
                    <RotateCcw />
                </Button>

            </div>
        </div>


    );
};
export default InputComp;