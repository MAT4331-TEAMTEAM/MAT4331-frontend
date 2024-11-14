import * as styles from "./MatchPage.styles";

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Chatting from "@/components/Chatting/Chatting";
import Guide from "@/components/Guide/Guide";
import Title from "@/components/Title/Title";
import Topbar from "@/components/Topbar/Topbar";

interface ChattingInterface {
  title: string;
  count: number;
}

const MatchPage = () => {
  const [chattingList, setChattingList] = useState<ChattingInterface[]>([]);
  const { id } = useParams();

  useEffect(() => {
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

  return (
    <styles.OuterContainer>
      <styles.InnerContainer>
        <Topbar />
        <Title title={`${id} 관련 채팅방 목록`} />
        {chattingList.length == 0 ? (
          <Guide text="현재 참가하고 있는 채팅방이 없습니다." />
        ) : (
          chattingList.map((chatting, index) => (
            <Link
              to={`/chatting/${index}`}
              style={{ textDecoration: "none" }}
              key={index}
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
