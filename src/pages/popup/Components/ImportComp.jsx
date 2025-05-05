import { useState,useContext, useEffect } from "react"
import { MetaDataListContext } from "../DataContenxt";
import { LogIn,AlertCircle } from 'lucide-react';
import { Button } from "./ui/button"
import { Alert,AlertTitle,AlertDescription } from "./ui/alert"
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


export default function ImportComp() {
  const [email, setEmail] = useState("")
  const { cl } = useContext(MetaDataListContext)
  const [isOpen, setIsOpen] = useState(false)
  const { metaDataList, setMetaDataList } = useContext(MetaDataListContext);



    const handleImport = async () => {
      let { data: { user }, error } = await cl.auth.getUser();
      const name = document.getElementById("name").value;
  
      const { data, insert_error } = await cl
      .from("pacsbinStudies")
      .upsert([
        {
          userID: user.id,
          metadata: metaDataList,
          name: name,
        },
      ])
      .select();
      console.log(data)
      if (insert_error) throw insert_error;
      setIsOpen(false)
    }


 

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
      <Button variant="outline" size="sm" className="flex-1">

Import Whole Study
</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[350px] max-w-[90%]">
        <DialogHeader>
          <DialogTitle>Import</DialogTitle>
          <DialogDescription>Import Study to AtTheViewBox</DialogDescription>
        </DialogHeader>
    
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="name"
                placeholder="study1"
                required
              />
            </div>
  
          </div>
          <DialogFooter>
            <Button onClick={handleImport} className="w-full">
              Import
            </Button>
          </DialogFooter>
  

      </DialogContent>
    </Dialog>
  )
}
