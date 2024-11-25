import * as styles from "./Add.styles";

import React, { useRef, useState } from "react";

interface AddProps {
  id: number;
  homeTeam: string;
  awayTeam: string;
}

const Add = ({ id, homeTeam, awayTeam }: AddProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isHomeTeam, setIsHomeTeam] = useState<boolean>(true);
  const title = useRef<HTMLInputElement | null>(null);

  const clickAddButton = () => {
    setIsOpen(true);
  };

  const clickBackDrop = () => {
    setIsOpen(false);
  };

  const clickAddButtonModal = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const clickMenuButton = (isLeft: boolean) => {
    setIsHomeTeam(isLeft);
  };

  const clickAddChattingButton = () => {
    if (title.current === null || title.current.value.trim() === "") {
      alert("채팅방 제목을 입력해주세요.");
    } else if (title.current.value.length > 20) {
      alert("채팅방 제목을 20자 이하로 입력해주세요.");
    } else {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/v1/chatrooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          credentials: "include",
        },
        body: JSON.stringify({
          gameId: id,
          title: title.current.value,
          preferTeam: isHomeTeam ? homeTeam : awayTeam,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("채팅방 생성 실패");
          } else {
            setIsOpen(false);
            window.location.reload();
          }

          return res.json();
        })
        .catch((error) => {
          console.error("Error:", error);

          alert("채팅방 생성 실패");
        });
    }

    if (title.current !== null) {
      title.current.value = "";
    }
  };

  return (
    <>
      <styles.AddButton src="/images/plus.png" onClick={clickAddButton} />
      {isOpen ? (
        <styles.BackDrop onClick={clickBackDrop} $isOpen={isOpen}>
          <styles.AddButtonModalContainer $isOpen={isOpen}>
            <styles.AddButtonModal
              onClick={clickAddButtonModal}
              $isOpen={isOpen}
            >
              <styles.Title>채팅방 생성</styles.Title>
              <styles.SemiTitle>선호 팀</styles.SemiTitle>
              <styles.MenuContainer>
                <styles.MenuButton
                  onClick={() => {
                    clickMenuButton(true);
                  }}
                  $isSelected={isHomeTeam}
                  $isLeft={true}
                >
                  {homeTeam}
                </styles.MenuButton>
                <styles.MenuButton
                  onClick={() => {
                    clickMenuButton(false);
                  }}
                  $isSelected={!isHomeTeam}
                  $isLeft={false}
                >
                  {awayTeam}
                </styles.MenuButton>
              </styles.MenuContainer>
              <styles.SemiTitle>채팅방 제목</styles.SemiTitle>
              <styles.Input ref={title} />
              <styles.AddChattingButton onClick={clickAddChattingButton}>
                채팅방 생성
              </styles.AddChattingButton>
            </styles.AddButtonModal>
          </styles.AddButtonModalContainer>
        </styles.BackDrop>
      ) : null}
    </>
  );
};

export default Add;
