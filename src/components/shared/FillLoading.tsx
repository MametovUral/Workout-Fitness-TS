import { Skeleton } from "../ui/skeleton";
import { LuLoader2 } from "react-icons/lu";
function FillLoading() {
  return (
    <Skeleton  className="w-full h-full absolute inset-0 flex justify-center items-center opacity-2 z-50 ">
      <LuLoader2  className="animate-spin size-9" />
    </Skeleton>
  );
}

export default FillLoading;
