import type React from "react"

import { useState,useContext } from "react"
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


export default function LoginComp() {
  const { cl } = useContext(MetaDataListContext);
  const [isOpen, setIsOpen] = useState(false)
  const [loginError, setLoginError] = useState(false);

  const handleLogin = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { error } = await cl.auth.signInWithPassword({ email, password });
    if (error) {
      setLoginError(true);
    } else {
      setLoginError(false);
      location.reload(); 
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size= "icon" variant="outline"><LogIn className="h-4 w-4" /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[350px] max-w-[90%]">
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription>Enter your credentials to access your account.</DialogDescription>
        </DialogHeader>
    
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
              />
            </div>
            {loginError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Login failed. Please check your credentials.
              </AlertDescription>
            </Alert>
          )}
          </div>
          <DialogFooter>
            <Button onClick={handleLogin} className="w-full">
              Sign In
            </Button>
          </DialogFooter>
  

      </DialogContent>
    </Dialog>
  )
}
