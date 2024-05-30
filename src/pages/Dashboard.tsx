import TaskForm from "@/components/forms/TaskForm";
import FillLoading from "@/components/shared/FillLoading";
import TaskItem from "@/components/shared/TaskItem";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { TaskService } from "@/service/task.service";
import { useUserState } from "@/stores/user.store";
import { ITask } from "@/types";
import { useQuery } from "@tanstack/react-query";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { LuBadgePlus } from "react-icons/lu";
import { toast } from "sonner";
import { z } from "zod";

function Dashboard() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState<ITask | null>(null);

  const [open, setOpen] = useState(false);
  const { user } = useUserState();

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["taskData"],
    queryFn: TaskService.getTask,
  });

  const onAdd = async ({ title }: z.infer<typeof taskSchema>) => {
    if (!user) return null;

    return addDoc(collection(db, "tasks"), {
      title,
      status: "unstarted",
      startTime: null,
      endTime: null,
      userId: user.uid,
    })
      .then(() => refetch())
      .finally(() => setOpen(false));
  };

  const onUpdate = async ({ title }: z.infer<typeof taskSchema>) => {
    if (!user) return null;
    if (!currentTask) return null;

    return updateDoc(doc(db, "tasks", currentTask.id), {
      title,
    })
      .then(() => refetch())
      .finally(() => setIsEditing(false));
  };

  const onDelete = async (id: string) => {
    setIsDeleting(true);
    const promise = deleteDoc(doc(db, "tasks", id))
      .then(() => refetch())
      .finally(() => setIsDeleting(false));

    toast.promise(promise, {
      loading: "Loading...",
      success: "Successfully deleted!",
      error: "Something went wrong!",
    });
  };

  const onStartEditing = (task: ITask) => {
    setIsEditing(true);
    setCurrentTask(task);
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
                {(isPending || isDeleting) && <FillLoading />}
                {error && (
                  <Alert className="mb-2" variant="destructive">
                    <FiAlertTriangle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error.message}</AlertDescription>
                  </Alert>
                )}

                {!isEditing &&
                  data &&
                  data.tasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onStartEditing={() => onStartEditing(task)}
                      onDelete={() => onDelete(task.id)}
                    />
                  ))}
                {isEditing && (
                  <TaskForm
                    title={currentTask?.title}
                    isEdit
                    onClose={() => setIsEditing(false)}
                    handler={
                      onUpdate as (
                        values: z.infer<typeof taskSchema>
                      ) => Promise<void | null>
                    }
                  />
                )}
                {data && !data.tasks.length && "No tasks bro"}
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
          <TaskForm
            handler={
              onAdd as (
                values: z.infer<typeof taskSchema>
              ) => Promise<void | null>
            }
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Dashboard;
