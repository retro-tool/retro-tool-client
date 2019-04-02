import React, { useContext } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import {
  borderColor,
  BorderColorProps,
  space,
  SpaceProps
} from "styled-system";
import { StatusContext, UserContext } from ".";
import { Text } from "./";

type PlusOneContainerProps = SpaceProps & {
  disabled: boolean;
};
const PlusOneContainer = styled.div<PlusOneContainerProps>`
  display: flex;
  align-items: center;
  opacity: ${({ disabled }) => disabled && ".5"};
  pointer-events: ${({ disabled }) => disabled && "none"};
  filter: ${({ disabled }) => disabled && "grayscale(80%)"};

  ${space}
`;
PlusOneContainer.defaultProps = {
  ml: 3
};

const PlusOneButton = styled.button`
  cursor: pointer;
  border: none;
  padding: 0;
  background: transparent;

  &:focus {
    outline: none;
  }
`;

type CountContainerProps = SpaceProps & BorderColorProps;
const CountContainer = styled.div<CountContainerProps>`
  border-left: 1px solid;
  padding-left: 10px;
  margin-left: 10px;
  min-width: 3ch;
  text-align: center;

  ${borderColor}
  ${space}
`;
CountContainer.defaultProps = {
  borderColor: "borderGrey"
};

const ADD_VOTE = gql`
  mutation AddVote($id: String!) {
    addVote(itemId: $id) {
      id
    }
  }
`;

const statussWithVotes = ["review"];

type PlusOneProps = {
  id: string;
  votes: number;
};

const PlusOne = ({ id, votes }: PlusOneProps) => {
  const { status } = useContext(StatusContext);
  const { user } = useContext(UserContext);

  const disabled = !user.votesLeft || statussWithVotes.indexOf(status) < 0;

  return (
    <Mutation mutation={ADD_VOTE}>
      {(addVote, { data, loading }) => {
        return (
          <PlusOneContainer disabled={disabled}>
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
};

export default PlusOne;
