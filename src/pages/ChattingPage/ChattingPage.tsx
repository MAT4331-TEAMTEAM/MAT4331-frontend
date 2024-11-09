import * as React from "react";
import * as styles from "./ChattingPage.styles";

import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import Title from "@/components/Title/Title";
import Topbar from "@/components/Topbar/Topbar";

interface ChattingInterface {
  nickname: string;
  chatting: string;
}

const MatchPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [chattingList, setChattingList] = useState<ChattingInterface[]>([]);
  const [nickname, setNickname] = useState("");
  const chatting = useRef<HTMLTextAreaElement | null>(null);

  const { id } = useParams();

  useEffect(() => {
    setNickname("nickname");
    setChattingList([
      { nickname: "nickname", chatting: "chatting" },
      { nickname: "한원준", chatting: "chatting" },
      {
        nickname: "한원준",
        chatting:
          "chatㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㅁㅁㅁㅁㅁㅁㅁㅁㅁㄴㄴㄴㄴㄴting",
      },
      {
        nickname:
          "nickㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁname",
        chatting: "chatting",
      },
    ]);
  }, []);

  const clickLogin = () => {
    setIsLogin(!isLogin);
  };

  const clickSend = () => {
    if (isLogin) {
      alert("로그인 후 이용해주세요.");
    } else if (
      chatting.current === null ||
      chatting.current.value.trim() === ""
    ) {
      alert("메시지를 입력해주세요.");
    } else if (chatting.current.value.length > 100) {
      alert("메시지를 100자 이하로 입력해주세요.");
    } else {
      setChattingList([
        { nickname: nickname, chatting: chatting.current.value },
        ...chattingList,
      ]);
    }

    if (chatting.current !== null) {
      chatting.current.value = "";
    }
  };

  const clickEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.isComposing) {
      return;
    } else if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      clickSend();
    }
  };

  return (
    <styles.OuterContainer>
      <styles.InnerContainer>
        <Topbar isLogin={isLogin} clickLogin={clickLogin} />
        <Title title={`${id} 관련 채팅방`} />
        <styles.ChattingRoomOuterContainer>
          <styles.ChattingRoomInnerContainer>
            {chattingList.map((chatting, index) => {
              const isMine = nickname == chatting.nickname;

              return (
                <styles.ChattingContainer key={index} $isMine={isMine}>
                  <styles.Nickname>{chatting.nickname}</styles.Nickname>
                  <styles.Chatting $isMine={isMine}>
                    {chatting.chatting}
                  </styles.Chatting>
                </styles.ChattingContainer>
              );
            })}
          </styles.ChattingRoomInnerContainer>
        </styles.ChattingRoomOuterContainer>
        <styles.ChattingInputContainer>
          <styles.ChattingInput
            placeholder="메시지를 입력해주세요."
            ref={chatting}
            onKeyDown={clickEnter}
          />
          <styles.ChattingButton onClick={clickSend}>
            전송
          </styles.ChattingButton>
        </styles.ChattingInputContainer>
      </styles.InnerContainer>
    </styles.OuterContainer>
  );
};

export default MatchPage;
