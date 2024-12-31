import Header from "./Header";

const RecommendBar = ({ icon, title }) => {
  return (
    <aside className="absolute right-8 top-[29px] w-[300px] h-full rounded-[16px]">
      <div className="flex items-center py-[12px] px-[23px] gap-[10px] self-stretch border-t border-l border-r rounded-t-[16px] border-[#e5e6e8] bg-gray-100">
        <section className="">
          <img src={`/${icon}.png`} alt="icon" />
        </section>

        <div className="flex flex-col">
          <section className="title text-[17px] font-[Pretendard] font-semibold not-italic leading-[28px] mb-[0px] text-[#393940]">
            {title}
          </section>
        </div>
      </div>
      <div className="px-[30px] py-[160px] h-full flex flex-col items-start flex-[1_0_0] self-stretch rounded-b-[16px] border-[1px] bg-gray-100"></div>
    </aside>
  );
};

export default RecommendBar;
