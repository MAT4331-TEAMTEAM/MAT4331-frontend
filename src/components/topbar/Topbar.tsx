import * as styles from "./Topbar.styles";

interface TopbarProps {
  isLogin: boolean;
}

const Topbar = ({ isLogin }: TopbarProps) => {
  const loginText = isLogin ? "로그아웃" : "로그인";

  const clickLogo = () => {
    window.location.href = "/";
  };

  return (
    <styles.TopBarContainer>
      <styles.Logo src="/images/rectangle-logo.png" onClick={clickLogo} />
      <styles.LoginButton>{loginText}</styles.LoginButton>
    </styles.TopBarContainer>
  );
};

export default Topbar;
