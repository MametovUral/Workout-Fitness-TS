import Navbar from "@/components/shared/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Toaster position="bottom-right" />
    </>
  );
}

export default RootLayout;
