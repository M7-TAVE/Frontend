import BagList from "./BagList";
import Header from "./Header";
import TemplateList from "./TemplateList";
import TravelBag from "./TravelBag";

const Dashboard = ({ icon, title, memo }) => {
  return (
    <div>
      <Header icon={icon} title={title} memo={memo} />
      <div className="Main flex px-[30px] flex-col items-start flex-[1_0_0] self-stretch rounded-b-[16px] border-[1px] bg-[var(--White,_#FFF)]">
        <BagList />
        <TemplateList />
      </div>
    </div>
  );
};

export default Dashboard;
