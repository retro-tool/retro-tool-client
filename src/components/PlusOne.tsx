import React, { useState } from "react";
import { useAddVoteMutation } from "generated/graphql";
import { useDebouncedCallback } from "use-debounce";
import Lottie from "react-lottie";
import animationData from "lotties/thumb-up.json";
import styled from "styled-components";
import {
  borderColor,
  BorderColorProps,
  space,
  SpaceProps,
  themeGet
} from "styled-system";
import { useStatus, Text } from "components";

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

type PlusOneProps = {
  id: string;
  votes: number;
};

const PlusOne = ({ id, votes }: PlusOneProps) => {
  const { status } = useStatus();
  const [addVote, { data }] = useAddVoteMutation();
  const [isStoped, setIsStoped] = useState(false);
  const votingIsDisabled = status !== "review";
  const [debouncedClick] = useDebouncedCallback(() => {
    if (votingIsDisabled) return;

    addVote({ variables: { id } });
    setIsStoped(true);
  }, 250);

  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <PlusOneContainer disabled={votingIsDisabled}>
      <PlusOneButton onClick={debouncedClick} disabled={votingIsDisabled}>
        <Lottie
          options={defaultOptions}
          height={24}
          width={24}
          isClickToPauseDisabled
          isPaused={!isStoped}
          style={{ opacity: 0.5 }}
        />
      </PlusOneButton>
      <CountContainer>
        <Text color="grey">
          {/*
          //@ts-ignore: wtf why votes doesn't exist on this type? */}
          {(data && data.votes) || votes}
        </Text>
      </CountContainer>
    </PlusOneContainer>
  );
};

export default PlusOne;
