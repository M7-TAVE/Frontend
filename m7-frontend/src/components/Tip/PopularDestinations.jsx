import DestinationItem from "./DestinationItem.jsx";
import { useRecoilValue } from "recoil";
import { locationsState } from "@/api/atom.js";

const PopularDestinations = ({ selectedId, showContent }) => {
  const locations = useRecoilValue(locationsState);

  return (
    <div className="template_list mt-[40px] mb-[50px] ">
      <div className="title text-[17px] text-gray-900 font-bold">
        인기 여행지
      </div>
      <div className="memo text-[13px] text-gray-500 mb-[15px]">
        한국인이 많이 찾는 인기 여행지 Top 5 입니다.
      </div>
      <div className="template_list_wrapper flex flex-row gap-5">
        {locations.map((location) => (
          <DestinationItem
            key={location.id}
            id={location.id}
            name={location.name}
            selectedId={selectedId === location.id}
            showContent={showContent}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularDestinations;
