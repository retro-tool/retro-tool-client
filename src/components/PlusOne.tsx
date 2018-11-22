import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import {
  borderColor,
  BorderColorProps,
  space,
  SpaceProps
} from "styled-system";
import { Text } from "./";

const PlusOneContainer = styled.div`
  display: flex;
  align-items: center;
  opacity: ${({ hidden }) => hidden && ".4"};
  pointer-events: ${({ hidden }) => hidden && "none"};
`;

const PlusOneButton = styled.button`
  cursor: pointer;
  border: none;
  padding: 0;

  &:focus {
    outline: none;
  }
`;

type CountContainerProps = SpaceProps & BorderColorProps;
const CountContainer = styled.div<CountContainerProps>`
  border-left: 1px solid;
  padding-left: 10px;
  margin-left: 10px;

  ${borderColor}
  ${space}
`;
CountContainer.defaultProps = {
  pt: 1,
  pb: 1,
  ml: 3,
  borderColor: "borderGrey"
};

const ADD_VOTE = gql`
  mutation AddVote($id: String!) {
    addVote(itemId: $id) {
      votes
    }
  }
`;

type PlusOneProps = {
  id: string;
  votes: number;
  hidden?: boolean;
};

const PlusOne = ({ hidden, id, votes }: PlusOneProps) => (
  <Mutation mutation={ADD_VOTE}>
    {(addVote, { data, loading }) => {
      return (
        <PlusOneContainer hidden={hidden}>
          <PlusOneButton onClick={() => addVote({ variables: { id } })}>
            <Text fontSize={3}>👍</Text>
          </PlusOneButton>
          <CountContainer>
            <Text color="grey">{(data && data.votes) || votes}</Text>
          </CountContainer>
        </PlusOneContainer>
      );
    }}
  </Mutation>
);

export default PlusOne;
