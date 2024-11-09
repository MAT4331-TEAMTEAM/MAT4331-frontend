import styled from "styled-components";

import Colorstyles from "@/styles/Colorstyles.styles";
import Fontstyles from "@/styles/Fontstyles.styles";

export const MenuContainer = styled.div`
  display: flex;
  width: 45rem;
  height: 3.75rem;
  box-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.25);
  border-radius: 0.75rem;
  margin-bottom: 1rem;
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
