import { useState ,useContext} from "react"
import { Plus, Lock, Unlock } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { MetaDataListContext } from "../DataContenxt";
import { Switch } from "./ui/switch"

const Visibility = {
    AUTHENTICATED: "AUTHENTICATED",
    PUBLIC: "PUBLIC",
    PRIVATE: "PRIVATE",
    Organization: "ORGANIZATION",
  };

export default function AddCaseComp({url}) {

    const { cl } = useContext(MetaDataListContext)
    // State for dialog open/close
    const [open, setOpen] = useState(false)
    // State for dialog open/close
    const [visibility, setVisibility] = useState(Visibility.PUBLIC);
    

    function changeVisibility() {
        if (visibility === Visibility.PUBLIC) {
            setVisibility(Visibility.PRIVATE);
        } else {
            setVisibility(Visibility.PUBLIC);
        }
    }

    async function addCase() {
        try { // Create new case object
            let { data: { user }, error } = await cl.auth.getUser();
            const caseItem = {
                owner: user.id,
                name: document.getElementById("name").value,
                description: document.getElementById("description").value,
                url_params: url,
                visibility: visibility,
            }
            console.log(caseItem)
            const { data, upsert_error } = await cl
                .from("studies")
                .upsert(caseItem)
                .select();
            if (upsert_error) throw upsert_error;
            setOpen(false)
        } catch (error) {
            console.log(error);
        } 
    }
    return (

        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="flex-1">
                    Add Case
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[350px] max-w-[90%]">
    
                    <DialogHeader>
                        <DialogTitle>Add New Case</DialogTitle>
                        <DialogDescription>Fill in the details to create a new case.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Case name"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Describe the case"
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="public-switch">Visibility</Label>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">{visibility=="PUBLIC" ? "Public" : "Private"}</span>
                                    <Switch id="public-switch" checked={visibility=="PUBLIC"} onCheckedChange={changeVisibility} />
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {visibility=="PUBLIC"
                                    ? "Public cases are visible to everyone."
                                    : "Private cases are only visible to you."}
                            </p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick = {addCase}>Add Case</Button>
                    </DialogFooter>
         
            </DialogContent>
        </Dialog>

    )
}