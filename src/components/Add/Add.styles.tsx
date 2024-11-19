import styled, { keyframes } from "styled-components";

import Colorstyles from "@/styles/Colorstyles.styles";
import Fontstyles from "@/styles/Fontstyles.styles";

export const AddButton = styled.img`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  width: 5;
  height: 5rem;
  opacity: 0.5;
  cursor: pointer;
`;

const fadeIn = keyframes` 
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes` 
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const BackDrop = styled.div<{ $isOpen: boolean }>`
  animation: ${($isOpen) => ($isOpen ? fadeIn : fadeOut)} 0.1s ease-in;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
`;

export const AddButtonModalContainer = styled(BackDrop)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const AddButtonModal = styled.div<{ $isOpen: boolean }>`
  animation: ${($isOpen) => ($isOpen ? fadeIn : fadeOut)} 0.1s ease-in;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 30rem;
  height: max-content;
  border: 0.0625rem solid ${Colorstyles.GREEN};
  border-radius: 0.75rem;
  background-color: ${Colorstyles.WHITE};
  padding: 2rem;
`;

export const Title = styled.div`
  ${Fontstyles.Bold_L}
`;

export const SemiTitle = styled.div`
  ${Fontstyles.Bold_M}
  width: 100%;
  margin-top: 2rem;
  text-align: left;
  color: ${Colorstyles.DARK_GRAY};
`;

export const MenuContainer = styled.div`
  display: flex;
  width: 100%;
  height: 3rem;
  border: 0.0625rem solid ${Colorstyles.GREEN};
  border-radius: 0.75rem;
  margin-top: 1rem;
`;

export const MenuButton = styled.button<{
  $isSelected: boolean;
  $isLeft: boolean;
}>`
  ${Fontstyles.Medium_L}
  width: 50%;
  height: 100%;
  text-align: center;
  background-color: ${({ $isSelected }) =>
    $isSelected ? `${Colorstyles.GREEN}` : `${Colorstyles.WHITE}`};
  color: ${({ $isSelected }) => ($isSelected ? "#FFFFFF" : "#000000")};
  border-radius: ${({ $isLeft }) =>
    $isLeft ? "0.75rem 0 0 0.75rem" : "0 0.75rem 0.75rem 0"};
`;

export const Input = styled.input`
  ${Fontstyles.Medium_M}
  width: 100%;
  height: 3rem;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border: 0.0625rem solid ${Colorstyles.GREEN};
  border-radius: 0.75rem;
`;

export const AddChattingButton = styled.button`
  ${Fontstyles.Medium_M}
  width: max-content;
  margin-top: 2rem;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  background-color: ${Colorstyles.GREEN};
  color: ${Colorstyles.WHITE};
  cursor: pointer;
`;
