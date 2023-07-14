import { Link } from "react-router-dom";
import CustomButton from "../components/CustomButton";

export default function App() {

  return (
    <div className=" bg-slate-600">
      <Link to={'/home'}>
      <CustomButton  btnText="Hello world" />
      </Link>
    </div>
  )
}