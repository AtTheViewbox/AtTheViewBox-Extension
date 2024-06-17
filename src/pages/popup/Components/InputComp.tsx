import { MetaData } from "../utils";
import { useState, useEffect } from "react";
import * as React from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SendHorizontal } from "lucide-react";


interface InputCompProps {
    setting: "wc" | "ww" | "ci" | "z" | "px" | "py";
    label: string;
    metadata: MetaData;
    saveStates: (key: string, event: any) => void;
}

const InputComp: React.VFC<InputCompProps> = ({
    setting,
    label,
    metadata,
    saveStates
}) => {

    useEffect(() => {
        setTempData(setting == "wc" ? metadata.modality == "CT" ? metadata.wc - 1000 : metadata.wc :
            metadata[setting])
    }, [metadata]);

    const [tempData, setTempData] = useState(
        setting == "wc" ? metadata.modality == "CT" ? metadata.wc - 1000 : metadata.wc :
            metadata[setting]
    );
    const [edited, setEdited] = useState(true);

    return (
        <div className="grid w-full max-w-sm items-center gap-2 grid-cols-8 ">
            <div className="col-span-3">
                <Label size="lg" htmlFor={setting}>{label}</Label>
            </div>
            <div className="col-span-3">
                <Input type={setting} id={setting}
                    value={tempData}
                    onChange={(e) => {
                        setTempData(e.target.value)
                        setEdited(false)
                    }}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        saveStates(setting, e)
                        setEdited(true)
                    }}
                    onBlur={()=>{
                        setTempData(setting == "wc" ? metadata.modality == "CT" ? metadata.wc - 1000 : metadata.wc :
            metadata[setting])
                    }}
                />
            </div>
            <div className="col-span-2">
                <Button disabled={edited}>Edit<SendHorizontal /></Button>
            </div>
        </div>


    );
};
export default InputComp;