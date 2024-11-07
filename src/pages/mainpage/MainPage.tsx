import * as styles from "./MainPage.styles";

import { useEffect, useState } from "react";

import Chatting from "@/components/chatting/Chatting";
import Game from "@/components/game/Game";
import Menu from "@/components/menu/Menu";
import Topbar from "@/components/topbar/Topbar";

interface GameInterface {
  title: string;
  gameInfo: "경기 진행 중" | "경기 시작 전" | "경기 종료";
  gamePrediction: string;
}

interface ChattingInterface {
  title: string;
  count: number;
}

const MainPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isList, setIsList] = useState(true);
  const [gameList, setGameList] = useState<GameInterface[]>([]);
  const [chattingList, setChattingList] = useState<ChattingInterface[]>([]);

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
    setChattingList([
      {
        title: "title",
        count: 1,
      },
      {
        title: "title",
        count: 2,
      },
      {
        title: "title",
        count: 3,
      },
      {
        title: "title",
        count: 4,
      },
      {
        title: "title",
        count: 5,
      },
    ]);
  }, []);

  const clickList = () => {
    setIsList(true);
  };

  const clickChattingRoom = () => {
    if (isLogin) {
      setIsList(false);
    } else {
      alert("로그인이 필요합니다.");
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
        {isList
          ? gameList.map((game, index) => (
              <Game
                key={index}
                title={game.title}
                gameInfo={game.gameInfo}
                gamePrediction={game.gamePrediction}
              />
            ))
          : chattingList.map((chatting, index) => (
              <Chatting
                key={index}
                title={chatting.title}
                count={chatting.count}
              />
            ))}
      </styles.InnerContainer>
    </styles.OuterContainer>
  );
};

export default MainPage;
