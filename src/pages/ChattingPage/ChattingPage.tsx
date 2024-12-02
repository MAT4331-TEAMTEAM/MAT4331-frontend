import * as React from "react";
import * as styles from "./ChattingPage.styles";

import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import Exit from "@/components/Exit/Exit";
import Title from "@/components/Title/Title";
import Topbar from "@/components/Topbar/Topbar";

import { CheckLogin } from "@/functions/CheckLogin";
import { DecodeJWT } from "@/functions/DecodeJWT";
import { io, Socket } from "socket.io-client";

interface ChattingInterface {
  nickname: string;
  chatting: string;
}

interface WriterInterface {
  id: number;
  nickname: string;
  preferTeam: string;
  profile: string;
}

interface ChattingElementInterface {
  id: number;
  content: string;
  type: string;
  createdAt: string;
  writer: WriterInterface;
}

const ChattingPage = () => {
  const [chattingList, setChattingList] = useState<ChattingInterface[]>([]);
  const [nickname, setNickname] = useState("");
  const { id } = useParams();
  const location = useLocation();
  const title = location.state.title;
  const chatting = useRef<HTMLTextAreaElement | null>(null);
  const socket = useRef<Socket | null>(null);

  if (!CheckLogin()) {
    alert("로그인 후 이용해주세요.");
    window.location.href = "/";
  }

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      const payload = DecodeJWT(accessToken);

      if (payload) {
        setNickname(payload.nickname);
      }

      fetch(`${import.meta.env.VITE_BACKEND_URL}/v1/chatrooms/${id}/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          credentials: "include",
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("채팅방 입장 실패");
          }

          socket.current?.emit("joinRoom", id);
          socket.current?.on("chat", (message) => {
            setChattingList((chattingList) => [
              { nickname: message.writer.nickname, chatting: message.content },
              ...chattingList,
            ]);
          });
          socket.current?.on("profane", (message) => {
            setChattingList((chattingList) => [
              {
                nickname: message.writer.nickname,
                chatting: "부적절한 내용이 포함된 채팅입니다.",
              },
              ...chattingList,
            ]);
          });
        })
        .catch((error) => {
          console.error("Error:", error);

          alert("채팅방 입장 실패");
          window.location.href = "/";
        });

      fetch(
        `${import.meta.env.VITE_BACKEND_URL}/v1/chats?chatroomId=${id}&loadCount=100000`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            credentials: "include",
          },
        },
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("채팅 기록 불러오기 실패");
          }

          return res.json();
        })
        .then((data) => {
          setChattingList(
            data.map((element: ChattingElementInterface) => {
              return {
                nickname: element.writer.nickname,
                chatting: element.content,
              };
            }),
          );
        })
        .catch((error) => {
          console.error("Error:", error);

          alert("채팅 기록 불러오기 실패");
        });

      socket.current = io(`${import.meta.env.VITE_BACKEND_URL}/chat`, {
        withCredentials: true,
        auth: {
          token: accessToken,
        },
        transports: ["websocket"],
      });

      return () => {
        socket.current?.emit("leaveRoom", id);
        socket.current?.disconnect();
      };
    }
  }, []);

  const clickChatting = () => {
    if (!CheckLogin()) {
      if (chatting.current !== null) {
        chatting.current.blur();
      }

      alert("로그인 후 이용해주세요.");

      if (chatting.current !== null) {
        chatting.current.value = "";
      }
    }
  };

  const clickSend = () => {
    if (chatting.current !== null) {
      chatting.current.blur();
    }

    if (!CheckLogin()) {
      alert("로그인 후 이용해주세요.");
    } else if (
      chatting.current === null ||
      chatting.current.value.trim() === ""
    ) {
      alert("메시지를 입력해주세요.");
    } else if (chatting.current.value.length > 100) {
      alert("메시지를 100자 이하로 입력해주세요.");
    } else {
      socket.current?.emit("chat", {
        chatroomId: id,
        content: chatting.current.value,
      });
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

  const exitChatting = () => {
    if (CheckLogin()) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/v1/chatrooms/${id}/leave`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          credentials: "include",
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("채팅방 나가기 실패");
          } else {
            window.location.href = "/";
          }
        })
        .catch((error) => {
          console.error("Error:", error);

          alert("채팅방 나가기 실패");
        });
    }
  };

  return (
    <styles.OuterContainer>
      <styles.InnerContainer>
        <Topbar />
        <Title title={`${title}`} />
        <styles.ChattingRoomOuterContainer>
          <styles.ChattingRoomInnerContainer>
            {chattingList.map((chatting, index) => (
              <styles.ChattingContainer
                key={index}
                $isMine={nickname == chatting.nickname}
              >
                <styles.Nickname>{chatting.nickname}</styles.Nickname>
                <styles.Chatting $isMine={nickname == chatting.nickname}>
                  {chatting.chatting}
                </styles.Chatting>
              </styles.ChattingContainer>
            ))}
          </styles.ChattingRoomInnerContainer>
        </styles.ChattingRoomOuterContainer>
        <styles.ChattingInputContainer>
          <styles.ChattingInput
            placeholder="메시지를 입력해주세요."
            onClick={clickChatting}
            onKeyDown={clickEnter}
            ref={chatting}
          />
          <styles.ChattingButton onClick={clickSend}>
            전송
          </styles.ChattingButton>
        </styles.ChattingInputContainer>
        <Exit exitChatting={exitChatting} />
      </styles.InnerContainer>
    </styles.OuterContainer>
  );
};

export default ChattingPage;
