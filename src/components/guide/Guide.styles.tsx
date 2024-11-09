import styled from "styled-components";

import Colorstyles from "@/styles/Colorstyles.styles";
import Fontstyles from "@/styles/Fontstyles.styles";

export const GuideContainer = styled.div`
  ${Fontstyles.Bold_XL};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45rem;
  height: 15rem;
  margin-top: 1rem;
  color: ${Colorstyles.DARK_GRAY};
`;
