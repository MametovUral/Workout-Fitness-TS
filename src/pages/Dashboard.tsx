import TaskForm from "@/components/forms/TaskForm";
import TaskItem from "@/components/shared/TaskItem";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { db } from "@/firebase";
import { taskSchema } from "@/lib/validation";
import { useUserState } from "@/stores/user.store";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { LuBadgePlus } from "react-icons/lu";
import { z } from "zod";

function Dashboard() {
  const [open, setOpen] = useState(false);
  const { user } = useUserState();

  const onAdd = async ({ title }: z.infer<typeof taskSchema>) => {
    if (!user) return null;

    return addDoc(collection(db, "tasks"), {
      title,
      status: "unstarted",
      startTime: null,
      endTime: null,
      userId: user.uid,
    }).then(() => setOpen(false));
  };
  return (
    <>
      <div className="h-screen max-w-6xl mx-auto flex items-center">
        <div className="grid grid-cols-2 w-full gap-8">
          <div className="flex flex-col space-y-3">
            <div className="w-full p-4 rounded-md flex justify-between bg-gradient-to-t from-background to-secondary">
              <h3 className="text-2xl font-bold">Trainings</h3>
              <Button size={"icon"} onClick={() => setOpen(true)}>
                <LuBadgePlus className="size-6" />
              </Button>
            </div>
            <Separator />
            <div className="w-full p-4 rounded-md flex justify-between bg-gradient-to-b from-background to-secondary relative min-h-60">
              <div className="flex flex-col space-y-3 w-full">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <TaskItem key={idx} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-3 relative w-full">
            <div className="p-4 rounded-md bg-gradient-to-r from-secondary to-background relative h-24">
              <div className="text-2xl font-bold">Total week</div>
              <div className="text-3xl font-bold">02:08:50</div>
            </div>
            <div className="p-4 rounded-md bg-gradient-to-r from-primary to-background relative h-24">
              <div className="text-2xl font-bold">Total month</div>
              <div className="text-3xl font-bold">02:08:50</div>
            </div>
            <div className="p-4 rounded-md bg-gradient-to-r from-destructive to-background relative h-24">
              <div className="text-2xl font-bold">Total year</div>
              <div className="text-3xl font-bold">02:08:50</div>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new task</DialogTitle>
          </DialogHeader>
          <Separator />
          <TaskForm handler={onAdd} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Dashboard;
