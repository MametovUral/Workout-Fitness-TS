import { FaGithub, FaGoogle } from "react-icons/fa6";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/firebase";
import FillLoading from "../shared/FillLoading";

function Social() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function onGoogle() {
    setIsLoading(true);
    const googleProvider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  async function onGitHub() {
    setIsLoading(true);
    const githubProvider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, githubProvider);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      {isLoading && <FillLoading />}
      <Separator className="my-3" />
      <div className="grid grid-cols-2 gap-2">
        <Button
          className="h-12"
          variant={"secondary"}
          onClick={onGitHub}
          disabled={isLoading}
        >
          <FaGithub size={19} className="mr-2" />
          <span>Sign in with Github</span>
        </Button>
        <Button
          className="h-12"
          variant={"destructive"}
          onClick={onGoogle}
          disabled={isLoading}
        >
          <FaGoogle size={19} className="mr-2" />
          <span>Sign in with Google</span>
        </Button>
      </div>
    </>
  );
}

export default Social;
