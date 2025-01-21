import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthStatus } from "@/api/auth.js";
import HalfTemplate from "@/components/LogIn/HalfTemplate.jsx";
import { API_BASE_URL } from "@/api/api.js";

const Login = () => {
  const nav = useNavigate();
  // 카카오 로그인 함수
  const handleKakaoLogin = () => {
    // 백엔드의 카카오 인증 엔드포인트로 이동
    window.location.href = `${API_BASE_URL}/oauth2/authorization/kakao`;
  };

  useEffect(() => {
    // 새로고침 시 인증 상태 확인 및 복구
    const checkAuthStatus = async () => {
      try {
        const status = await getAuthStatus();
        if (status.isAuthenticated) {
          nav("/");
        }
      } catch (error) {
        console.error("인증 상태 확인 실패:", error);
      }
    };
    checkAuthStatus();
  }, [nav]);

  useEffect(() => {
    // 카카오 로그인 후 리다이렉트 처리
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      // 로그인 상태 확인
      localStorage.setItem("authToken", token);
      console.log(
        "Token saved in localStorage:",
        localStorage.getItem("authToken")
      );

      // URL에서 token 파라미터 제거
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState(null, "", cleanUrl);

      nav("/");
    }
  }, [nav]);

  return (
    <div>
      <HalfTemplate type="login" />
    </div>
  );
};

export default Login;
