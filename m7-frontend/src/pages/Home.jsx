import { InputWithLabel } from "@/components/InputWithLabel";

const Home = () => {
  return (
    <>
      <div>
        <h1 className="flex justify-center text-blue-700">Home Page!</h1>
        <InputWithLabel />
      </div>
    </>
  );
};

// // 줄바꿈 동일하게 적용
// 1. position - 위치(관련속성:top,right,bottom,left,z-index)
// 2. flex - 흐름(관련속성:flex-col, justify-center, items-center, ...)
// 3. margin & padding(그룹) & gap - 간격
// 4. background(그룹) - 배경
// 5. font(그룹) - 폰트(관련속성:color,letter-spacing,text-align,text-decoration,text-indent,vertical-align,white-space 등)
// 6. overflow - 넘침
// 7.animation - 동작(관련속성:animation,transform,transition,marquee 등)
// 8. width & height - 크기
// 9. borderRadius(그룹) - 테두리: rounded-,,
// 10. 기타 - 위에 언급되지 않은 나머지 속성들로 폰트의 관련 속성 이후에 선언하며, 기타 속성 내의 선언 순서는 무관함.

export default Home;
