import CheckData_plus from "../assets/CheckData_plus.svg";
import { addItemToData } from "@/util/addItemToData";

const RecommendPlusItem = ({ title, setListData }) => {
  const handleAdd = () => {
    addItemToData(title, setListData);
  };

  return (
    <div className="flex justify-between items-center border bg-white w-[300px] px-3 py-1.5 rounded-lg">
      <div className="flex items-center gap-3">
        <p className="text-gray-800 text-sm">{title}</p>
      </div>
      <button
        onClick={handleAdd}
        className="flex justify-center items-center rounded-md bg-white"
      >
        <img src={CheckData_plus} alt="plus" />
      </button>
    </div>
  );
};
export default RecommendPlusItem;
