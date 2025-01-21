import { useContext, useState, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select.jsx";
import trashIcon from "../../assets/icon/trash.svg";
import { SelectedDisplatchData } from "@/pages/Bag.jsx";
import HeaderButton from "./HeaderButton.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { AddedItemStateContext } from "./BagDashboard.jsx";
import { EditStateContext } from "@/pages/Bag.jsx";
import { EditDispatchContext } from "@/pages/Bag.jsx";
import { getIconImage } from "@/util/get-icon-image.js";
import { bagsState, realBagsState, sortedRealBagsState } from "@/api/atom.js";
import {
  deleteBagAPI,
  getBagDetailsAPI,
  getBagsAPI,
  toggleBagTemporaryAPI,
  updateBagNameAPI,
} from "@/api/api.js";
import { authState } from "@/api/auth.js";

const BagHeader = ({ icon }) => {
  const added = useContext(AddedItemStateContext);
  const params = useParams();
  const auth = useRecoilValue(authState); // Recoil 상태 읽기만 사용
  const memberId = auth.kakaoId;
  const bagId = params.id;
  const [bags, setBags] = useRecoilState(bagsState);
  const [thisBag, setThisBag] = useState([]);
  const [realBags, setRealBags] = useRecoilState(realBagsState);
  const [sortedRealBags, setSortedRealBags] =
    useRecoilState(sortedRealBagsState);

  console.log("thisBag", thisBag);

  // 가방 데이터 가져오기
  useEffect(() => {
    const fetchBags = async () => {
      try {
        const response = await getBagsAPI(memberId); // API 호출
        if (Array.isArray(response)) {
          setBags(response); // bags 상태 업데이트
        } else {
          console.error("Invalid bags response format:", response);
        }
      } catch (error) {
        console.error("Error fetching bags:", error);
      }
    };

    fetchBags();
  }, [memberId, setBags]); // memberId가 변경될 때만 실행

  // 현재 가방 데이터 가져오기
  useEffect(() => {
    const fetchThisBag = async () => {
      try {
        const response = await getBagDetailsAPI(memberId, bagId); // API 호출
        if (response) {
          setThisBag(response); // thisBag 상태 업데이트
        } else {
          console.error("Invalid bagDetails response format:", response);
        }
      } catch (error) {
        console.error("Error fetching bag details:", error);
      }
    };

    if (bagId) {
      fetchThisBag(); // bagId가 존재할 때만 호출
    }
  }, [memberId, bagId]); // memberId와 bagId 변경 시 호출

  // realBags 업데이트
  useEffect(() => {
    const filteredBags = bags.filter((bag) => !bag.temporary); // temporary가 false인 가방만 필터링
    const sortedBags = [...filteredBags].sort((a, b) => b.id - a.id);
    setRealBags(filteredBags); // realBags 상태 업데이트
    setSortedRealBags(sortedBags);
  }, [bags, setRealBags]);

  const nav = useNavigate();
  const { onChangeBagName } = useContext(SelectedDisplatchData);
  const onChange = onChangeBagName; // 올바른 함수 참조
  const [selectedBagName, setSelectedBagName] = useState("");
  const [editedBagName, setEditedBagName] = useState("");

  useEffect(() => {
    if (thisBag && thisBag.name) {
      setSelectedBagName(thisBag.name); // thisBag의 name으로 초기화
      setEditedBagName(thisBag.name); // thisBag의 name으로 초기화
    }
  }, [thisBag]); // thisBag 변경 시 실행

  const isEditing = useContext(EditStateContext);
  const { onSetEditing } = useContext(EditDispatchContext);
  const [edit, setEdit] = useState(false);

  const onSetEdit = (value) => {
    setEdit(value);
  };

  const onSelected = (value) => {
    const selectedBag = realBags.find((bag) => bag.name === value); // 이름으로 가방 찾기
    if (selectedBag) {
      setSelectedBagName(value); // 선택된 이름 설정
      setEditedBagName(value); // 편집 이름 설정
      nav(`/bag/${selectedBag.id}`); // URL 업데이트
    }
  };

  const handleBagUpdateName = async (bagName) => {
    try {
      const response = await updateBagNameAPI(memberId, bagId, bagName);

      setThisBag((prev) => {
        const updatedBag = { ...prev, name: bagName };
        return updatedBag;
      });
    } catch (error) {
      console.error("Error updating bag name:", error);
    }
  };
  const handleBagUpdateTemporary = async () => {
    try {
      const response = await toggleBagTemporaryAPI(memberId, bagId);

      if (response) {
        // thisBag 업데이트
        setThisBag((prev) => {
          const updatedBag = { ...prev, temporary: !prev.temporary };
          console.log("Updated thisBag:", updatedBag); // 상태 디버깅
          return updatedBag;
        });

        // bags 업데이트
        setBags((prevItems) =>
          prevItems.map((bag) =>
            bag.id === bagId ? { ...bag, temporary: !bag.temporary } : bag
          )
        );
      } else {
        console.error("No response data from toggleBagTemporaryAPI");
      }
    } catch (error) {
      console.error("Error toggling bag temporary:", error); // 에러 디버깅
    }
  };

  const handleBagDelete = async () => {
    try {
      await deleteBagAPI(memberId, bagId);
      setBags((prevItems) => prevItems.filter((bag) => bag.id !== bagId));
      nav("/", { replace: true }); // 삭제 후 메인 페이지로 이동
    } catch (error) {
      console.error("Error deleting bag:", error);
    }
  };

  useEffect(() => {
    if (thisBag?.temporary !== undefined) {
      onSetEditing(thisBag.temporary);
    }
  }, [thisBag]); // thisBag 변경 시 실행

  const onUpdateButton = async () => {
    const existingTemplate = realBags.find(
      (item) => String(item.name) === String(editedBagName)
    );

    if (isEditing) {
      if (added !== 0) {
        alert("물품 추가를 완료해주세요!");
        return;
      }
      if (existingTemplate && edit) {
        alert("이미 존재하는 템플릿입니다!");
        return;
      } else if (!thisBag.temporary) {
        await handleBagUpdateName(editedBagName);
        setBags((prevBags) =>
          prevBags.map((bag) =>
            bag.id === thisBag.id ? { ...bag, name: editedBagName } : bag
          )
        );
        setSelectedBagName(editedBagName);
        setSortedRealBags((prevBags) => {
          const updatedBags = prevBags.map((bag) =>
            bag.id === thisBag.id ? { ...bag, name: editedBagName } : bag
          );
          return updatedBags.sort((a, b) => b.id - a.id); // 정렬 유지
        });
        onSetEditing(false);
        onSetEdit(false);
      }
    } else {
      onSetEditing(true);
    }

    if (thisBag.temporary) {
      if (added !== 0) {
        alert("물품 추가를 완료해주세요!");
        return;
      }
      if (existingTemplate) {
        alert("이미 존재하는 가방입니다!");
        onSetEditing(true);
        return;
      } else {
        await handleBagUpdateTemporary();
        await handleBagUpdateName(editedBagName);
        setBags((prevBags) =>
          prevBags.map((bag) =>
            bag.id === thisBag.id ? { ...bag, name: editedBagName } : bag
          )
        );
        setSortedRealBags((prevBags) => {
          const updatedBags = prevBags.map((bag) =>
            bag.id === thisBag.id ? { ...bag, name: editedBagName } : bag
          );
          return updatedBags.sort((a, b) => b.id - a.id); // 정렬 유지
        });
        nav("/");
      }
    }
  };

  const onDeleteButton = async () => {
    await handleBagDelete();
  };

  const updateStyle =
    "w-[55px] h-10 bg-[#24a3b6] rounded-[12px] flex justify-center items-center text-white text-sm font-semibold font-[Pretendard]";

  const deleteStyle =
    "w-10 h-10 bg-[#24a3b6] rounded-[12px] flex justify-center items-center";

  return (
    <div className="flex items-center py-[12px] px-[23px] gap-[10px] self-stretch border-t border-l border-r rounded-t-[16px] border-[#e5e6e8] bg-[var(--White,_#FFF)] relative">
      <section className="icon w-[40px] h-[40px] flex-shrink-0">
        <img src={getIconImage(icon)} alt="icon" />
      </section>

      <div className="flex flex-col">
        {isEditing ? (
          <input
            type="text"
            value={editedBagName}
            onChange={(e) => {
              setEditedBagName(e.target.value);
              onSetEdit(true);
            }}
            className="w-[200px] text-[16px] font-[Pretendard] leading-[28px] text-[#393940] border border-gray-300 rounded px-2 py-1"
          />
        ) : (
          <Select onValueChange={(value) => onSelected(value)}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder={selectedBagName} />
            </SelectTrigger>
            <SelectContent>
              {sortedRealBags.map((bag) => (
                <SelectItem key={bag.id} value={bag.name}>
                  {bag.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="absolute right-[25px] flex gap-2">
        <HeaderButton
          bagTemporary={thisBag.temporary}
          style={updateStyle}
          onClick={onUpdateButton}
          isEditing={isEditing}
        />
        <HeaderButton
          style={deleteStyle}
          imageSrc={trashIcon}
          onClick={onDeleteButton}
        />
      </div>
    </div>
  );
};

export default BagHeader;
