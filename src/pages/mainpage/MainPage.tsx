import * as styles from "./MainPage.styles";

import { useEffect, useState } from "react";

import Game from "@/components/game/Game";
import Menu from "@/components/menu/Menu";
import Topbar from "@/components/topbar/Topbar";

interface GameInterface {
  title: string;
  gameInfo: "경기 진행 중" | "경기 시작 전" | "경기 종료";
  gamePrediction: string;
}

const MainPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isList, setIsList] = useState(true);
  const [gameList, setGameList] = useState<GameInterface[]>([]);

  useEffect(() => {
    setIsLogin(false);
    setGameList([
      {
        title: "title",
        gameInfo: "경기 진행 중",
        gamePrediction: "gamePrediction",
      },
      {
        title: "title",
        gameInfo: "경기 진행 중",
        gamePrediction: "gamePrediction",
      },
      {
        title: "title",
        gameInfo: "경기 진행 중",
        gamePrediction: "gamePrediction",
      },
      {
        title: "title",
        gameInfo: "경기 진행 중",
        gamePrediction: "gamePrediction",
      },
      {
        title: "title",
        gameInfo: "경기 진행 중",
        gamePrediction: "gamePrediction",
      },
      {
        title: "title",
        gameInfo: "경기 진행 중",
        gamePrediction: "gamePrediction",
      },
    ]);
  }, []);

  const clickList = () => {
    setIsList(true);
  };

  const clickChattingRoom = () => {
    if (!isLogin) {
      alert("먼저 로그인을 해주세요.");
    } else {
      setIsList(false);
    }
  };

  return (
    <styles.OuterContainer>
      <styles.InnerContainer>
        <Topbar isLogin={isLogin} />
        <Menu
          isList={isList}
          clickList={clickList}
          clickChattingRoom={clickChattingRoom}
        />
        {gameList.map((game, index) => (
          <Game
            key={index}
            title={game.title}
            gameInfo={game.gameInfo}
            gamePrediction={game.gamePrediction}
          />
        ))}
      </styles.InnerContainer>
    </styles.OuterContainer>
  );
};

export default MainPage;
