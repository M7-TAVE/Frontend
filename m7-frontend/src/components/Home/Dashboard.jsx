import BagList from "./BagList.jsx";
import CommonHeader from "../common/CommonHeader.jsx";
import TemplateList from "./TemplateList.jsx";
import { useRecoilValue } from "recoil";
import { authState } from "../../api/auth.js";

const Dashboard = () => {
  const isAuthenticated = useRecoilValue(authState);
  console.log("authenticated:", isAuthenticated);

  return (
    <div className="mt-[29px]">
      <CommonHeader icon="home" title="홈" memo="어서오세요!" />
      <div className="Main flex px-[30px] mb-[20px] flex-col items-start flex-[1_0_0] self-stretch rounded-b-[16px] border-[1px] bg-[var(--White,_#FFF)]">
        <BagList />
        <TemplateList />
      </div>
    </div>
  );
};

export default Dashboard;
