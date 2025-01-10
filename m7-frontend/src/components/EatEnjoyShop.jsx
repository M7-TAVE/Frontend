import EESItem from "./EESItem";
import { useRecoilState } from "recoil";
import {
  restaurantsState,
  attractionsState,
  souvenirsState,
} from "../api/atom";
import {
  fetchRestaurantsAPI,
  fetchAttractionsAPI,
  fetchSouvenirsAPI,
} from "../api/api";
import { useEffect } from "react";

const EatEnjoyShop = ({ location_id }) => {
  const [restaurants, setRestaurants] = useRecoilState(restaurantsState);
  const [attractions, setAttractions] = useRecoilState(attractionsState);
  const [souvenirs, setSouvenirs] = useRecoilState(souvenirsState);

  const filteredRestaurants = restaurants.filter(
    (item) => item.location_id === location_id
  );
  const filteredAttractions = attractions.filter(
    (item) => item.location_id === location_id
  );
  const filteredSouvenirs = souvenirs.filter(
    (item) => item.location_id === location_id
  );

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetchRestaurantsAPI(location_id);
        setRestaurants(response);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    const fetchAttractions = async () => {
      try {
        const response = await fetchAttractionsAPI(location_id);
        setAttractions(response);
      } catch (error) {
        console.error("Error fetching attractions:", error);
      }
    };

    const fetchSouvenirs = async () => {
      try {
        const response = await fetchSouvenirsAPI(location_id);
        setSouvenirs(response);
      } catch (error) {
        console.error("Error fetching souvenirs:", error);
      }
    };

    fetchRestaurants();
    fetchAttractions();
    fetchSouvenirs();
  }, [location_id]);

  return (
    <div className="mt-[20px] mb-[50px] ">
      <div className="text-[17px] text-gray-900 font-bold">
        맛보고, 즐기고, 담아가기
      </div>
      <div className="text-[13px] text-gray-500 mb-[10px]">
        식당 사진을 클릭하면 구글맵으로 연결됩니다.
      </div>
      <div className="flex flex-col items-start">
        <li className="text-[17px] font-bold py-5">맛집</li>
        <div className="flex flex-row gap-5 mb-[20px]">
          {filteredRestaurants.map((item) => (
            <EESItem content="eat" key={item.id} {...item} />
          ))}
        </div>
        <li className="text-[17px] font-bold py-5">관광지</li>
        <div className="flex flex-row gap-5 mb-[20px]">
          {filteredAttractions.map((item) => (
            <EESItem content="enjoy" key={item.id} {...item} />
          ))}
        </div>
        <li className="text-[17px] font-bold py-5">기념품</li>
        <div className="flex flex-row gap-5 mb-[20px]">
          {filteredSouvenirs.map((item) => (
            <EESItem content="shop" key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EatEnjoyShop;
