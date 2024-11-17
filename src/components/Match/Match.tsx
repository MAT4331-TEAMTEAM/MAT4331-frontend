import * as styles from "./Match.styles";

interface MatchProps {
  title: string;
  matchInfo: "경기 시작 전" | "경기 종료" | "경기 취소";
  matchPrediction: string;
}

const Menu = ({ title, matchInfo, matchPrediction }: MatchProps) => {
  return (
    <styles.MatchContainer>
      <styles.Title>{title}</styles.Title>
      <styles.MatchInfo>{matchInfo}</styles.MatchInfo>
      <styles.MatchPrediction>{matchPrediction}</styles.MatchPrediction>
    </styles.MatchContainer>
  );
};

export default Menu;
