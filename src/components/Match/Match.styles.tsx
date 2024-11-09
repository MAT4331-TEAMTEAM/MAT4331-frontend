import styled from "styled-components";

import Colorstyles from "@/styles/Colorstyles.styles";
import Fontstyles from "@/styles/Fontstyles.styles";

export const MatchContainer = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 45rem;
  height: 10rem;
  box-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.25);
  border: 0.0625rem solid ${Colorstyles.GREEN};
  border-radius: 0.75rem;
  padding: 1rem;
  margin-top: 1rem;
`;

export const Title = styled.div`
  ${Fontstyles.Bold_L}
  width: max-content;
  height: max-content;
`;

export const MatchInfo = styled.div`
  ${Fontstyles.Medium_M}
  width: max-content;
  height: max-content;
  color: ${Colorstyles.LIGHT_GRAY};
`;

export const MatchPrediction = styled.div`
  ${Fontstyles.Medium_M}
  width: max-content;
  height: max-content;
  color: ${Colorstyles.DARK_GRAY};
`;
