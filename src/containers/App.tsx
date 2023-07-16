import { Outlet, useLocation } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";

export default function App() {
  const location = useLocation();
  return (
    <div className="grid grid-cols-[450px,1fr] h-screen overflow-hidden">
      <div>
        <SideBar />
      </div>
      <div>
        {location.pathname === "/" ? (
          <div className="h-full w-full flex items-center justify-center">
            <p className="font-semibold text-xl">Select the chat</p>
          </div>
        ) : null}
        <Outlet />
      </div>
    </div>
  );
}
