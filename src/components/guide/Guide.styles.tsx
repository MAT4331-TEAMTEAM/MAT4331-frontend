import styled from "styled-components";

import Colorstyles from "@/styles/Colorstyles.styles";
import Fontstyles from "@/styles/Fontstyles.styles";

export const GuideContainer = styled.button`
  ${Fontstyles.Bold_XL};
  display: flex;
  width: 100%;
  height: 15rem;
  line-height: 15rem;
  justify-content: center;
  margin-top: 1rem;
  color: ${Colorstyles.DARK_GRAY};
`;
