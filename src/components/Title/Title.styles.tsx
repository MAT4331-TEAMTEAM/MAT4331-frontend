import styled from "styled-components";

import Colorstyles from "@/styles/Colorstyles.styles";
import Fontstyles from "@/styles/Fontstyles.styles";

export const TitleContainer = styled.div`
  ${Fontstyles.Medium_L}
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45rem;
  height: 4rem;
  box-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.25);
  border: 0.0625rem solid ${Colorstyles.GREEN};
  border-radius: 0.75rem;
  margin-bottom: 1rem;
`;
