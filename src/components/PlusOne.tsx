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
import { StageContext } from ".";
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
      votes
    }
  }
`;

const stagesWithVotes = ["review", "actions"];

type PlusOneProps = {
  id: string;
  votes: number;
};

const PlusOne = ({ id, votes }: PlusOneProps) => {
  const { stage } = useContext(StageContext);

  return (
    <Mutation mutation={ADD_VOTE}>
      {(addVote, { data, loading }) => {
        return (
          <PlusOneContainer disabled={stagesWithVotes.indexOf(stage) < 0}>
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
