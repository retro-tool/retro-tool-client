import React, { useContext, useRef, useState } from "react";
import styled, { css } from "styled-components/macro";
import {
  display,
  DisplayProps,
  space,
  SpaceProps,
  themeGet
} from "styled-system";
import { Redirect } from "@reach/router";
import {
  About,
  Button,
  LightboxContent,
  LightboxOverlay,
  Logo,
  SlugContext,
  StatusContext,
  Text
} from "components";
import { ChevronRight } from "styled-icons/material/ChevronRight";
import { ArrowUpward } from "styled-icons/material/ArrowUpward";

interface PageHeaderProps extends SpaceProps {}
export const PageHeaderContainer = styled.div<PageHeaderProps>`
  position: relative;
  z-index: 1;
  background: white;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16);
`;

interface HeaderProps extends SpaceProps {}
const HeaderContainer = styled.div.attrs<HeaderProps>({
  pl: 4,
  pr: 4
})`
  display: flex;
  align-items: center;
  height: 48px;
  justify-content: space-between;

  ${space}
`;

interface SubheaderProps extends DisplayProps, SpaceProps {}
const SubheaderContainer = styled.div.attrs<SubheaderProps>({
  display: ["none", null, null, "flex"],
  pl: 4,
  pr: 4
})`
  position: relative;
  background: white;
  border-top: 1px solid ${({ theme }) => theme.colors.borderGrey};
  height: 36px;
  justify-content: space-between;

  ${display}
  ${space}
`;

interface BreadcrumbItemProps {
  active: boolean;
}
const BreadcrumbItem = styled.div<BreadcrumbItemProps>`
  position: relative;
  display: inline-flex;
  align-items: center;
  margin-right: ${themeGet("space.7")}px;
  font-size: ${themeGet("fontSizes.2")}px;
  color: ${({ active, theme: { colors } }) =>
    active ? colors.dark : colors.mediumGrey};

  &::before {
    content: "";
    display: ${({ active }) => (active ? "block" : "none")};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${themeGet("colors.lime")};
  }

  &:not(:last-child)::after {
    content: "→";
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(175%, 55%);
    font-size: ${themeGet("fontSizes.2")}px;
    color: ${themeGet("colors.mediumGrey")};
  }
`;

const BreadcrumbsContainer = styled.div`
  display: flex;
`;

interface BreadcrumbsProps {
  status: string;
}
const Breadcrumbs = ({ status }: BreadcrumbsProps) => {
  return (
    <BreadcrumbsContainer>
      <BreadcrumbItem active={status === "initial"}>Brainstorm</BreadcrumbItem>
      <BreadcrumbItem active={status === "review"}>Group & vote</BreadcrumbItem>
      <BreadcrumbItem active={status === "actions"}>
        Add action items
      </BreadcrumbItem>
      <BreadcrumbItem active={status === "final"}>Done</BreadcrumbItem>
    </BreadcrumbsContainer>
  );
};

const StatusHelpContainer = styled.div`
  display: flex;
  align-items: center;

  ${display}
`;

interface StatusHelpProps {
  status: string;
}
const StatusHelp = ({ status }: StatusHelpProps) => {
  return (
    <StatusHelpContainer>
      {status === "initial" && (
        <Text fontSize={1} color="borderDarkGrey">
          Add your comments below, you won't be able to see your peers' until
          next step
        </Text>
      )}
      {status === "review" && (
        <Text fontSize={1} color="borderDarkGrey">
          Drag and drop comments to group them together and vote for the ones
          you'd like to discuss about
        </Text>
      )}
      {status === "actions" && (
        <Text fontSize={1} color="borderDarkGrey">
          Add action items, you can no longer group or vote comments
        </Text>
      )}
    </StatusHelpContainer>
  );
};

const iconStyles = css`
  margin-right: -8px;
`;

const NextIcon = styled(ChevronRight)`
  width: 20px;
  ${iconStyles}
`;
const ExportIcon = styled(ArrowUpward)`
  width: 16px;
  margin-left: 6px;
  ${iconStyles};
`;

const NextStatusContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Header = () => {
  const { slug } = useContext(SlugContext);
  const { cansSwitchStatus, status, nextStatus } = useContext(StatusContext);
  const [confirm, setConfirm] = useState(false);
  const [raw, setRaw] = useState(false);
  const buttonRef = useRef(null);

  const headerActions = {
    initial: {
      label: "Group & vote comments",
      onClick: () => {
        setConfirm(true);
      },
      onConfirm: () => {
        setConfirm(false);
        nextStatus();
      }
    },
    review: {
      label: "Discuss and add action items",
      onClick: nextStatus
    },
    actions: {
      label: "Finish retro",
      onClick: nextStatus
    },
    final: {
      label: "Export",
      onClick: () => {
        setRaw(true);
      }
    }
  };

  if (raw) return <Redirect noThrow to={`/${slug}/export`} />;

  return (
    <>
      <LightboxOverlay
        isOpen={confirm}
        onDismiss={() => setConfirm(false)}
        initialFocusRef={buttonRef}
      >
        <LightboxContent>
          <Text size="title">Are you sure?</Text>
          <Text mt={3} mb={6}>
            Everyone will see all comments and this can't be undone.
          </Text>
          <Button bg="mediumGrey" onClick={() => setConfirm(false)} mr={3}>
            Cancel
          </Button>
          <Button onClick={headerActions[status].onConfirm} ref={buttonRef}>
            {headerActions[status].label}
            <NextIcon />
          </Button>
        </LightboxContent>
      </LightboxOverlay>
      <PageHeaderContainer>
        <HeaderContainer>
          <Logo />
          <NextStatusContainer>
            <About />
            {status && (
              <Button
                onClick={headerActions[status].onClick}
                disabled={!cansSwitchStatus}
                ml={3}
              >
                {headerActions[status].label}
                {status !== "final" && <NextIcon />}
                {status === "final" && <ExportIcon />}
              </Button>
            )}
          </NextStatusContainer>
        </HeaderContainer>
        <SubheaderContainer>
          <Breadcrumbs status={status} />
          <StatusHelp status={status} />
        </SubheaderContainer>
      </PageHeaderContainer>
    </>
  );
};

export { HeaderContainer };
export default Header;
