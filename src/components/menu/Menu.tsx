import * as styles from "./Menu.styles";

interface MenuProps {
  isList: boolean;
  clickList: () => void;
  clickChattingRoom: () => void;
}

const Menu = ({ isList, clickList, clickChattingRoom }: MenuProps) => {
  const loginText = isList;

  return (
    <styles.MenuContainer>
      <styles.MenuButton
        onClick={clickList}
        $isSelected={loginText}
        $isLeft={true}
      >
        리스트
      </styles.MenuButton>
      <styles.MenuButton
        onClick={clickChattingRoom}
        $isSelected={!loginText}
        $isLeft={false}
      >
        채팅방
      </styles.MenuButton>
    </styles.MenuContainer>
  );
};

export default Menu;
