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
  id: number;
  title: string;
  secondTitle: string;
  matchInfo: "경기 시작 전" | "경기 종료" | "경기 취소";
  matchPrediction: string;
}

interface MatchElementInterface {
  id: number;
  gameCid: number;
  awayTeam: string;
  homeTeam: string;
  awayScore: number;
  homeScore: number;
  predictedAwayScore: number;
  predictedHomeScore: number;
  gameStatus: "scheduled" | "finished" | "canceled";
  gameDate: string;
}

interface ChattingInterface {
  id: number;
  title: string;
  count: number;
}

interface ChattingElementInterface {
  id: number;
  title: string;
  preferTeam: string;
  participantCount: number;
  createdAt: string;
}

const MainPage = () => {
  const [isList, setIsList] = useState(true);
  const [matchList, setMatchList] = useState<MatchInterface[]>([]);
  const [chattingList, setChattingList] = useState<ChattingInterface[]>([]);

  useEffect(() => {
    const now = new Date();

    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/v1/games?year=${now.getFullYear()}&month=${now.getMonth() + 1}&day=${now.getDate()}`,
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("게임 불러오기 실패");
        }

        return res.json();
      })
      .then((data) => {
        setMatchList(
          data.map((element: MatchElementInterface) => {
            return {
              id: element.id,
              title: `${element.homeTeam} ${element.homeScore} vs ${element.awayScore} ${element.awayTeam}`,
              secondTitle: `${element.homeTeam} vs ${element.awayTeam}`,
              matchInfo:
                element.gameStatus == "finished"
                  ? "경기 종료"
                  : element.gameStatus == "canceled"
                    ? "경기 취소"
                    : "경기 시작 전",
              matchPrediction: `AI 예측 결과 : ${element.homeTeam} ${element.predictedHomeScore} vs ${element.predictedAwayScore} ${element.awayTeam}`,
            };
          }),
        );
      })
      .catch((error) => {
        console.error("Error:", error);

        alert("게임 불러오기 실패");
      });
  }, []);

  const clickList = () => {
    setIsList(true);
  };

  const clickChattingRoom = () => {
    if (CheckLogin()) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/v1/chatrooms/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => {
          if (res.status == 404) {
            return [];
          } else if (!res.ok) {
            throw new Error("채팅방 불러오기 실패");
          }

          return res.json();
        })
        .then((data) => {
          setChattingList(
            data.map((element: ChattingElementInterface) => {
              return {
                id: element.id,
                title: element.title,
                count: element.participantCount,
              };
            }),
          );
        })
        .catch((error) => {
          console.error("Error:", error);

          alert("채팅방 불러오기 실패");
        });

      setIsList(false);
    } else {
      alert("로그인이 필요합니다.");
    }
  };

  const makeGameList = () => {
    if (matchList.length == 0) {
      return <Guide text="현재 진행중인 게임이 없습니다." />;
    } else {
      return matchList.map((match) => (
        <Link
          to={`/match/${match.id}`}
          state={{ title: match.secondTitle }}
          style={{ textDecoration: "none" }}
          key={match.id}
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
      return chattingList.map((chatting) => (
        <Link
          to={`/chatting/${chatting.id}`}
          state={{ title: chatting.title }}
          style={{ textDecoration: "none" }}
          key={chatting.id}
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
