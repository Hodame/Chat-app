import { Outlet, RouterProvider } from "react-router-dom";
import SideBar from "../components/SideBar";

export default function App() {
  return (
    <div className="grid grid-cols-[350px,1fr,300px] h-screen overflow-hidden">
      <div>
        <SideBar />
      </div>
      <div>
        <Outlet />
      </div>
      <div></div>
    </div>
  );
}
