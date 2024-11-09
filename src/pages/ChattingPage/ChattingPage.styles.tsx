import styled from "styled-components";

import Colorstyles from "@/styles/Colorstyles.styles";
import Fontstyles from "@/styles/Fontstyles.styles";

export const OuterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  min-height: 100vh;
`;

export const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const ChattingRoomOuterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45rem;
  height: 25rem;
  margin-top: 1rem;
  border-radius: 1rem;
  box-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.25);
  background-color: ${Colorstyles.YELLOW};
`;

export const ChattingRoomInnerContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 43rem;
  height: 23rem;
  border-radius: 1rem;
  overflow-y: auto;
  scrollbar-width: none;

  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ChattingContainer = styled.div<{ $isMine: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ $isMine }) => ($isMine ? "flex-end" : "flex-start")};
  width: 100%;
  height: max-content;
  margin-top: 0.75rem;
`;

export const Nickname = styled.div`
  ${Fontstyles.Medium_S}
  margin-bottom: 0.25rem;
  color: ${Colorstyles.DARK_GRAY};
`;

export const Chatting = styled.div<{ $isMine: boolean }>`
  ${Fontstyles.Medium_M}
  width: max-content;
  max-width: 80%;
  word-break: break-all;
  padding: 0.5rem 0.75rem;
  border-radius: ${({ $isMine }) =>
    $isMine ? "0.75rem 0.75rem 0 0.75rem" : "0.75rem 0.75rem 0.75rem 0"};
  color: ${Colorstyles.BLACK};
  background-color: ${Colorstyles.WHITE};
`;

export const ChattingInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 45rem;
  height: 5rem;
  margin-top: 1rem;
`;

export const ChattingInput = styled.textarea`
  ${Fontstyles.Medium_S}
  width: 84%;
  height: 100%;
  padding: 1rem;
  border: 0.0625rem solid ${Colorstyles.GREEN};
  border-radius: 0.75rem;
  box-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.25);
  resize: none;
  overflow: hidden;
`;

export const ChattingButton = styled.button`
  ${Fontstyles.Bold_M}
  width: 14%;
  height: 100%;
  border-radius: 0.75rem;
  color: ${Colorstyles.WHITE};
  background-color: ${Colorstyles.GREEN};
  box-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.25);
`;
