import * as styles from "./Game.styles";

interface GameProps {
  title: string;
  gameInfo: "경기 진행 중" | "경기 시작 전" | "경기 종료";
  gamePrediction: string;
}

const Menu = ({ title, gameInfo, gamePrediction }: GameProps) => {
  return (
    <styles.GameContainer>
      <styles.Title>{title}</styles.Title>
      <styles.GameInfo>{gameInfo}</styles.GameInfo>
      <styles.GamePrediction>{gamePrediction}</styles.GamePrediction>
    </styles.GameContainer>
  );
};

export default Menu;
