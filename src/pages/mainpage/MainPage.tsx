import * as styles from "./MainPage.styles";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Chatting from "@/components/Chatting/Chatting";
import Guide from "@/components/Guide/Guide";
import Match from "@/components/Match/Match";
import Menu from "@/components/Menu/Menu";
import Topbar from "@/components/Topbar/Topbar";

import { CheckLogin } from "@/functions/CheckLogin";

interface MatchInterface {
  title: string;
  matchInfo: "경기 진행 중" | "경기 시작 전" | "경기 종료";
  matchPrediction: string;
}

interface ChattingInterface {
  title: string;
  count: number;
}

const MainPage = () => {
  const [isList, setIsList] = useState(true);
  const [matchList, setMatchList] = useState<MatchInterface[]>([]);
  const [chattingList, setChattingList] = useState<ChattingInterface[]>([]);

  useEffect(() => {
    setMatchList([
      {
        title: "title",
        matchInfo: "경기 진행 중",
        matchPrediction: "gamePrediction",
      },
      {
        title: "title",
        matchInfo: "경기 진행 중",
        matchPrediction: "gamePrediction",
      },
      {
        title: "title",
        matchInfo: "경기 진행 중",
        matchPrediction: "gamePrediction",
      },
      {
        title: "title",
        matchInfo: "경기 진행 중",
        matchPrediction: "gamePrediction",
      },
      {
        title: "title",
        matchInfo: "경기 진행 중",
        matchPrediction: "gamePrediction",
      },
      {
        title: "title",
        matchInfo: "경기 진행 중",
        matchPrediction: "gamePrediction",
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
    if (CheckLogin()) {
      setIsList(false);
    } else {
      alert("로그인이 필요합니다.");
    }
  };

  const makeGameList = () => {
    if (matchList.length == 0) {
      return <Guide text="현재 진행중인 게임이 없습니다." />;
    } else {
      return matchList.map((match, index) => (
        <Link
          to={`/match/${index}`}
          style={{ textDecoration: "none" }}
          key={index}
        >
          <Match
            title={match.title}
            matchInfo={match.matchInfo}
            matchPrediction={match.matchPrediction}
          />
        </Link>
      ));
    }
  };

  const makeChattingList = () => {
    if (chattingList.length == 0) {
      return <Guide text="현재 참가하고 있는 채팅방이 없습니다." />;
    } else {
      return chattingList.map((chatting, index) => (
        <Link
          to={`/chatting/${index}`}
          style={{ textDecoration: "none" }}
          key={index}
        >
          <Chatting title={chatting.title} count={chatting.count} />
        </Link>
      ));
    }
  };

  return (
    <styles.OuterContainer>
      <styles.InnerContainer>
        <Topbar />
        <Menu
          isList={isList}
          clickList={clickList}
          clickChattingRoom={clickChattingRoom}
        />
        {isList ? makeGameList() : makeChattingList()}
      </styles.InnerContainer>
    </styles.OuterContainer>
  );
};

export default MainPage;
