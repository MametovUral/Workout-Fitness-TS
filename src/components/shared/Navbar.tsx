import { navLinks } from "@/constants";
import { Button } from "../ui/button";
import { ModeToggle } from "./mode-toggle";
import { Link } from "react-router-dom";
import { useUserState } from "@/stores/user.store";
import UserBox from "./userBox";

function Navbar() {
  const { user } = useUserState();
  console.log(user);

  return (
    <div className="w-full h-[10vh] border-b fixed inset-0 z-50 bg-background">
      <div className="container mx-auto h-full flex justify-between items-center">
        <Link to={"/"}>
          <h2 className="text-2xl font-bold uppercase">Workout</h2>
        </Link>

        <div className="flex items-center gap-3">
          {navLinks.map((item) => (
            <a
              href={item.path}
              key={item.path}
              className="font-medium hover:underline"
            >
              {item.label}
            </a>
          ))}
          <ModeToggle />
          {user ? (
            <UserBox />
          ) : (
            <Link to={"/auth"}>
              <Button variant={"secondary"}>Join Free</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
