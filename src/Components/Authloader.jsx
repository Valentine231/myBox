import { ClipLoader } from "react-spinners";

const Spinner = ({ size = 35, color = "#4f46e5" }) => (
  <div className="flex justify-center items-center">
    <ClipLoader size={size} color={color} />
  </div>
);

export default Spinner;
