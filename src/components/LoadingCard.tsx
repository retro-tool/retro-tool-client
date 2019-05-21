import styled from "styled-components/macro";
import { Card } from "components";
import { minWidth, MinWidthProps, space, SpaceProps } from "styled-system";

type LoadingCardProps = MinWidthProps & SpaceProps;
const LoadingCard = styled(Card)<LoadingCardProps>`
  flex: 1;

  ${minWidth};
  ${space};
`;
LoadingCard.defaultProps = {
  m: [1, 2],
  minWidth: ["90%", "40%", null, null, 0]
};

export default LoadingCard;
