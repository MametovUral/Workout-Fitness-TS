import { MdOutlineTask } from "react-icons/md";
import { HiStatusOnline } from "react-icons/hi";
import { TbPlayerPlay } from "react-icons/tb";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { FiEdit2 } from "react-icons/fi";
import { CgTrash } from "react-icons/cg";
import { ITask } from "@/types";

interface Props {
  task: ITask;
  onStartEditing: () => void;
  onDelete: () => void;
}

function TaskItem({ task, onStartEditing, onDelete }: Props) {
  return (
    <Card className="w-full p-4 shadow-md grid grid-cols-4 items-center relative">
      <div className="flex gap-1 items-center col-span-2">
        <MdOutlineTask className="text-blue-500" />
        <span className="capitalize">{task.title}</span>
      </div>
      <div className="flex gap-1 items-center">
        <HiStatusOnline />
        <span className="capitalize text-sm">{task.status}</span>
      </div>
      <div className="flex gap-1 items-center justify-self-end">
        <Button variant={"ghost"} size={"icon"} className="size-8">
          <TbPlayerPlay />
        </Button>
        <Button
          variant={"secondary"}
          size={"icon"}
          className="size-8"
          onClick={onStartEditing}
        >
          <FiEdit2 />
        </Button>
        <Button variant={"destructive"} size={"icon"} className="size-8" onClick={onDelete}>
          <CgTrash />
        </Button>
      </div>
    </Card>
  );
}

export default TaskItem;
