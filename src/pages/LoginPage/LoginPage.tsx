import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code");

    if (code) {
      fetch(
        `${import.meta.env.VITE_BACKEND_URL}/v1/auth/login/oauth2/grant-code`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code: code }),
        },
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("로그인 실패");
          }

          return res.json();
        })
        .then((data) => {
          const { accessToken, refreshToken } = data;

          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          window.dispatchEvent(new Event("storage"));

          navigate(-1);
        })
        .catch((error) => {
          console.error("Error:", error);

          alert("로그인 실패");
        });
    }
  }, [location, navigate]);

  return <div>Login...</div>;
};

export default LoginPage;
