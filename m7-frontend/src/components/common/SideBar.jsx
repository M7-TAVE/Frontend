import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "@/assets/LoginLogo.svg";
import { useContext } from "react";
import bag from "../../assets/sidebar/bag.svg";
import onbag from "../../assets/sidebar/onbag.svg";
import home from "../../assets/sidebar/home.svg";
import onhome from "../../assets/sidebar/onhome.svg";
import travel from "../../assets/sidebar/travel.svg";
import ontravel from "../../assets/sidebar/ontravel.svg";
import logout from "../../assets/sidebar/logout.svg";
import { EditStateContext } from "@/pages/Bag";
import { useParams } from "react-router-dom";
import { bagItemState, bagState } from "@/api/Bag/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  bagReducerSelector,
  getBagDetailsById,
  getThisTemplateItemById,
} from "@/api/Bag/selector";
import { BagIdRefContext } from "@/App";

function sidebarImage(id, isActive = false) {
  if (isActive) {
    switch (id) {
      case 0:
        return onhome;
      case 1:
        return onbag;
      case 2:
        return ontravel;
      case 3:
        return logout;
      default:
        return home;
    }
  } else
    switch (id) {
      case 0:
        return home;
      case 1:
        return bag;
      case 2:
        return travel;
      case 3:
        return logout;
      default:
        return home;
    }
}

const items = [
  {
    id: 0,
    title: "홈",
    icon: sidebarImage(0),
  },
  {
    id: 1,
    title: "챙길 것들",
    icon: sidebarImage(1),
  },
  {
    id: 2,
    title: "여행 팁",
    icon: sidebarImage(2),
  },
  {
    id: 3,
    title: "로그아웃",
    icon: sidebarImage(3),
  },
];

export function SideBar() {
  const params = useParams();
  const isEditing = useContext(EditStateContext);

  const bags = useRecoilValue(bagState);
  const thisBag = useRecoilValue(getBagDetailsById(params.id));

  const realBags = bags.filter((bag) => !bag.temporary);
  const curId =
    realBags.length > 0 ? Math.max(...realBags.map((bag) => bag.id)) : 0;

  const nav = useNavigate();
  const location = useLocation();
  const isTemplate = location.pathname.includes("bag");
  const templateItemOfFREESTYLE = useRecoilValue(getThisTemplateItemById(1));
  const onLogoutClick = () => {
    if (window.confirm("정말 로그아웃하시겠습니까?")) {
      nav("/login");
    }
  };

  const bagIdRef = useContext(BagIdRefContext);

  const bagsDispatch = useSetRecoilState(bagReducerSelector);
  const bagItemsDispatch = useSetRecoilState(bagItemState);
  const handleBagCreate = (templateName) => {
    // 새 가방 생성
    bagsDispatch({
      type: "CREATE",
      data: {
        id: bagIdRef.current,
        name: "내 마음대로 시작하기",
        template: templateName,
        temporary: true,
      },
    });

    // 새 가방 아이템 생성
    const newBagItems = {
      bagId: bagIdRef.current,
      items: templateItemOfFREESTYLE[0].items, // 템플릿의 아이템을 복사하여 추가
    };

    bagItemsDispatch((prev) => [...prev, newBagItems]); // bagItemState 업데이트
    nav(`/bag/${bagIdRef.current}`);
    bagIdRef.current++;
  };

  const getLink = (id) => {
    switch (id) {
      case 0:
        return "/";
      case 1:
        return realBags.length > 0
          ? `/bag/${curId}`
          : `/bag/${bagIdRef.current - 1}`;
      case 2:
        return "/tip";
      case 3:
        return null;
      default:
        return "/";
    }
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <img
          src={Logo}
          alt="Logo"
          className="w-[130px] h-auto mt-5 cursor-pointer"
          onClick={() => {
            isEditing && !thisBag.temporary
              ? alert("물품 수정을 완료해주세요!")
              : nav("/");
          }}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroupContent>
          <SidebarMenu className="sidebarMenu gap-[15px]">
            {items.map((item) => {
              const isActive =
                item.id != 1
                  ? location.pathname === getLink(item.id)
                  : isTemplate;
              return (
                <SidebarMenuItem key={item.title}>
                  {item.id === 3 ? (
                    <div
                      onClick={onLogoutClick}
                      className="logout flex mt-[10px] ml-[10px] items-center gap-[10px] cursor-pointer"
                    >
                      <img
                        src={sidebarImage(item.id)}
                        alt="icon"
                        className="h-4 w-4 mr-2"
                      />
                      <span className="w-full text-left">{item.title}</span>
                    </div>
                  ) : (
                    <SidebarMenuButton
                      asChild
                      icon={item.icon}
                      className={
                        isActive
                          ? "button bg-white w-[200px] h-[45px] rounded-[10px] border-[1px] border-[#E5E7EB] hover:bg-white"
                          : "button w-[200px] h-[45px] rounded-[10px]"
                      }
                    >
                      <Link
                        to={getLink(item.id)}
                        onClick={(e) => {
                          if (item.id === 1 && realBags.length === 0) {
                            e.preventDefault(); // 기본 동작 방지
                            handleBagCreate("FREESTYLE"); // 새 가방 생성 후 이동
                            return;
                          }
                          if ((isEditing || isActive) && !thisBag.temporary) {
                            e.preventDefault(); // 이동 차단
                            if (isEditing && !thisBag.temporary) {
                              alert("물품 수정을 완료해주세요!");
                            }
                          }
                        }}
                      >
                        {item.icon && (
                          <img
                            src={sidebarImage(item.id, isActive)}
                            alt="icon"
                            className="h-4 w-4 mr-2"
                          />
                        )}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}