import styled from "styled-components/macro";
import { space, SpaceProps } from "styled-system";

type CardProps = SpaceProps;

const Card = styled.div<CardProps>`
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.16);
  background: #fff;
  border-radius: 4px;

  ${space};
`;

export default Card;
