import React, { useContext } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import {
  borderColor,
  BorderColorProps,
  space,
  SpaceProps,
  themeGet
} from "styled-system";
import { StatusContext, UserContext } from ".";
import { Text } from "./";
import { ThumbUp } from "styled-icons/material/ThumbUp";

interface PlusOneContainerProps extends SpaceProps {
  disabled: boolean;
}
const PlusOneContainer = styled.div<PlusOneContainerProps>`
  display: flex;
  align-items: center;
  opacity: ${({ disabled }) => disabled && ".5"};

  ${space}
`;
PlusOneContainer.defaultProps = {
  ml: 3
};

interface PlusOneButtonProps {
  disabled: boolean;
}
const PlusOneButton = styled.button<PlusOneButtonProps>`
  cursor: pointer;
  border: none;
  padding: 0;
  background: transparent;
  margin-top: -5px;
  pointer-events: ${({ disabled }) => disabled && "visible"};
  cursor: ${({ disabled }) => disabled && "not-allowed"};
  color: ${themeGet("colors.mediumGrey")};

  &:hover {
    color: ${({ disabled, theme }) => !disabled && theme.colors.link}};
  }

  &:focus {
    outline: none;
  }
`;

type CountContainerProps = SpaceProps & BorderColorProps;
const CountContainer = styled.div<CountContainerProps>`
  padding-left: 8px;
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

const ThumbUpIcon = styled(ThumbUp)`
  width: 16px;
  color: currentColor;
`;

const PlusOne = ({ id, votes }: PlusOneProps) => {
  const { status } = useContext(StatusContext);
  const { user } = useContext(UserContext);

  const disabled = !user.votesLeft || statussWithVotes.indexOf(status) < 0;

  return (
    <Mutation mutation={ADD_VOTE}>
      {(addVote, { data, loading }) => {
        return (
          <PlusOneContainer disabled={disabled}>
            <PlusOneButton
              onClick={() => addVote({ variables: { id } })}
              disabled={disabled}
            >
              <Text fontSize={3}>
                <ThumbUpIcon />
              </Text>
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
