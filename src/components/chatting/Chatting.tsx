import * as styles from "./Chatting.styles";

interface ChattingProps {
  title: string;
  count: number;
}

const Menu = ({ title, count }: ChattingProps) => {
  return (
    <styles.ChattingContainer>
      <styles.Title>{title}</styles.Title>
      <styles.ChattingInfo>참여 인원 : {count}</styles.ChattingInfo>
    </styles.ChattingContainer>
  );
};

export default Menu;
