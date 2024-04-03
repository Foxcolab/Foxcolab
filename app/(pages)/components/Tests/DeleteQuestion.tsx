import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { MdDelete } from "react-icons/md"
  
  export function DeleteQuestion({DeleteHandler, index, open, setOpen}:{DeleteHandler:Function, index:number, open:boolean, setOpen:Function}) {


    return (
      <AlertDialog onOpenChange={setOpen} open={open}>
        <AlertDialogTrigger asChild>
        <button className='' ><MdDelete/> </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure to delete the question {index}?</AlertDialogTitle>
            <AlertDialogDescription>
              
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={()=>DeleteHandler()}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  