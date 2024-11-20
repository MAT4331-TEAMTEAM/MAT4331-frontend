import * as styles from "./Topbar.styles";

import { useEffect, useState } from "react";

import { CheckLogin } from "@/functions/CheckLogin";

const Topbar = () => {
  const [isLogin, setIsLogin] = useState(CheckLogin());

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLogin(CheckLogin());
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const clickLogo = () => {
    window.location.href = "/";
  };

  return (
    <styles.TopBarContainer>
      <styles.Logo src="/images/rectangle-logo.png" onClick={clickLogo} />
      <styles.LoginButton
        onClick={() => {
          if (isLogin) {
            fetch(`${import.meta.env.VITE_BACKEND_URL}/v1/auth/logout`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }).then(() => {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");

              window.location.reload();
            });
          } else {
            window.location.href = `${import.meta.env.VITE_BACKEND_URL}/v1/auth/login/oauth2/google`;
          }
        }}
      >
        {isLogin ? "로그아웃" : "로그인"}
      </styles.LoginButton>
    </styles.TopBarContainer>
  );
};

export default Topbar;
