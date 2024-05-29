import { MdOutlineTask } from "react-icons/md";
import { HiStatusOnline } from "react-icons/hi";
import { TbPlayerPlay } from "react-icons/tb";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { FiEdit2 } from "react-icons/fi";
import { CgTrash } from "react-icons/cg";

function TaskItem() {
  return (
    <Card className="w-full p-4 shadow-md grid grid-cols-4 items-center relative">
      <div className="flex gap-1 items-center col-span-2">
        <MdOutlineTask className="text-blue-500" />
        <span className="capitalize">Press</span>
      </div>
      <div className="flex gap-1 items-center">
        <HiStatusOnline />
        <span className="capitalize text-sm">Unstarted</span>
      </div>
      <div className="flex gap-1 items-center justify-self-end">
        <Button variant={"ghost"} size={"icon"} className="size-8">
          <TbPlayerPlay />
        </Button>
        <Button variant={"secondary"} size={"icon"} className="size-8">
          <FiEdit2 />
        </Button>
        <Button variant={"destructive"} size={"icon"} className="size-8">

          <CgTrash />
        </Button>
      </div>
    </Card>
  );
}

export default TaskItem;
