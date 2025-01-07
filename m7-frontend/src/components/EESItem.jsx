import { getEatImage5 } from "@/util/get-eat-image";
import {getEnjoyImage5} from "@/util/get-enjoy-image";

const EESItem = ({ destinationId, content, id, title, memo }) => {
  const getImage = (destinationId, content) => {
    if (content === "eat") {
      if (destinationId === 1) return getEatImage5(id);
      if (destinationId === 2) return getEatImage5(id);
      if (destinationId === 3) return getEatImage5(id);
      if (destinationId === 4) return getEatImage5(id);
      if (destinationId === 5) return getEatImage5(id);
    }

    if (content === "enjoy") {
      if (destinationId === 1) return getEnjoyImage5(id);
      if (destinationId === 2) return getEnjoyImage5(id);
      if (destinationId === 3) return getEnjoyImage5(id);
      if (destinationId === 4) return getEnjoyImage5(id);
      if (destinationId === 5) return getEnjoyImage5(id);
    }

    if (content === "shop") {
      if (destinationId === 1) return getEatImage5(id);
      if (destinationId === 2) return getEatImage5(id);
      if (destinationId === 3) return getEatImage5(id);
      if (destinationId === 4) return getEatImage5(id);
      if (destinationId === 5) return getEatImage5(id);
    }
  };
  return (
    <div>
      <div className="flex justify-center w-auto h-[181px] flex-col items-center border [background:var(--Gray-50,#F5F5F6)] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.12)] p-2 rounded-xl border-solid border-[#EAEAEA] cursor-pointer">
        <div className="flex justify-center">
          <img
            className="flex justify-center items-start shrink-0 rounded-2xl"
            src={getImage(destinationId, content)}
          />
        </div>
        <div>
          <div className="items-center self-stretch text-black text-center [font-family:Pretendard] text-xs font-medium leading-[13px]">
            {title}
          </div>
          <div className="items-center self-stretch text-black text-center [font-family:Pretendard] text-xs font-medium leading-[13px]">
            {memo}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EESItem;