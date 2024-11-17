import * as styles from "./MatchPage.styles";

import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import Chatting from "@/components/Chatting/Chatting";
import Guide from "@/components/Guide/Guide";
import Title from "@/components/Title/Title";
import Topbar from "@/components/Topbar/Topbar";

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

const MatchPage = () => {
  const [chattingList, setChattingList] = useState<ChattingInterface[]>([]);
  const { id } = useParams();
  const location = useLocation();
  const title = location.state.title;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/v1/chatrooms/${id}`, {
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
  }, []);

  return (
    <styles.OuterContainer>
      <styles.InnerContainer>
        <Topbar />
        <Title title={`${title} 관련 채팅방 목록`} />
        {chattingList.length == 0 ? (
          <Guide text="관련 채팅방이 없습니다." />
        ) : (
          chattingList.map((chatting) => (
            <Link
              to={`/chatting/${chatting.id}`}
              state={{ title: chatting.title }}
              style={{ textDecoration: "none" }}
              key={chatting.id}
            >
              <Chatting title={chatting.title} count={chatting.count} />
            </Link>
          ))
        )}
      </styles.InnerContainer>
    </styles.OuterContainer>
  );
};

export default MatchPage;
