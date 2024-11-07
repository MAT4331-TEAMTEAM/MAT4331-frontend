import styled from "styled-components";

import Fontstyles from "@/styles/Fontstyles.styles";

export const TopBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 45rem;
  height: 3.75rem;
  margin-bottom: 3rem;
`;

export const Logo = styled.img`
  margin: 1rem;
  height: 1.75rem;
  opacity: 0.5;
  cursor: pointer;
`;

export const LoginButton = styled.button`
  ${Fontstyles.Medium_M}
  margin: 0rem 1rem;
  width: max-content;
  height: 100%;
  text-align: center;
`;
