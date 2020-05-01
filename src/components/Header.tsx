import React, { useRef, useState } from "react";
import { client } from "services/api";
import styled, { css } from "styled-components/macro";
import { display, DisplayProps, space, SpaceProps } from "styled-system";
import themeGet from "@styled-system/theme-get";
import { Redirect, navigate } from "@reach/router";
import { useSlug } from "components/Slug.context";
import {
  About,
  Button,
  LightboxContent,
  LightboxOverlay,
  Logo,
  useStatus,
  Text
} from "components";
import { ChevronRight } from "styled-icons/material/ChevronRight";
import { ChevronLeft } from "styled-icons/material/ChevronLeft";
import { ArrowUpward } from "styled-icons/material/ArrowUpward";
import { Box, BoxType, Flex } from "./UI";
import {
  useCreateLinkedRetroQuery,
  GetRetroIdDocument
} from "generated/graphql";

interface HeaderContainerProps extends SpaceProps {}

const HeaderContainer = styled.div.attrs<HeaderContainerProps>({
  py: 3,
  px: 4
})`
  display: flex;
  align-items: center;
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

type BreadcrumbItemProps = BoxType & {
  active: boolean;
};

const BreadcrumbItem = styled(Box).attrs({
  mr: 7
})<BreadcrumbItemProps>`
  position: relative;
  display: inline-flex;
  align-items: center;
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
    background: ${themeGet("colors.violet")};
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

interface BreadcrumbsProps {
  status: string;
}

const Breadcrumbs = ({ status }: BreadcrumbsProps) => {
  return (
    <Flex fontSize={1}>
      <BreadcrumbItem active={status === "initial"}>Brainstorm</BreadcrumbItem>
      <BreadcrumbItem active={status === "review"}>Group & vote</BreadcrumbItem>
      <BreadcrumbItem active={status === "actions"}>
        Add action items
      </BreadcrumbItem>
      <BreadcrumbItem active={status === "final"}>Done</BreadcrumbItem>
    </Flex>
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
        <Text fontSize={1} color="secondaryGrey">
          Add your comments below, you won't be able to see your peers' until
          next step
        </Text>
      )}
      {status === "review" && (
        <Text fontSize={1} color="secondaryGrey">
          Drag and drop comments to group them together and vote for the ones
          you'd like to discuss about
        </Text>
      )}
      {status === "actions" && (
        <Text fontSize={1} color="secondaryGrey">
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

const BackIcon = styled(ChevronLeft)`
  width: 20px;
  margin-left: -8px;
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

type LinkedRetroProps = {
  previousRetroId: number;
};

const CreateNewLinkedRetro = ({ previousRetroId }: LinkedRetroProps) => {
  const { data, loading, error } = useCreateLinkedRetroQuery({
    variables: { previousRetroId }
  });

  if (loading) return null;
  if (error) return null;
  if (!data || !data.retro) return null;

  return <Redirect noThrow to={`/${data.retro.slug}`} />;
};

type HeaderProps = {
  isExport?: boolean;
};

const Header: React.FC<HeaderProps> = ({ isExport }) => {
  const slug = useSlug();
  const { cansSwitchStatus, status, nextStatus } = useStatus();
  const [confirm, setConfirm] = useState(false);
  const [triggerExport, setTriggerExport] = useState(false);
  const [previousRetroId, setPreviousRetroId] = useState();
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
        setTriggerExport(true);
      }
    }
  };

  const getPreviousRetroId = async () => {
    const { data } = await client.query({
      query: GetRetroIdDocument,
      variables: { slug }
    });

    setPreviousRetroId(data.retro.id);
  };

  if (triggerExport) return <Redirect noThrow to={`/${slug}/export`} />;
  if (previousRetroId) {
    return <CreateNewLinkedRetro previousRetroId={previousRetroId} />;
  }

  return (
    <>
      <LightboxOverlay
        isOpen={confirm}
        onDismiss={() => setConfirm(false)}
        initialFocusRef={buttonRef}
      >
        <LightboxContent>
          <Text textStyle="title">Are you sure?</Text>
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
      <Box position="relative" zIndex={1} bg="white" boxShadow={0}>
        <HeaderContainer>
          <Logo />
          <NextStatusContainer>
            <About />
            {status !== "final" && (
              <Button
                onClick={headerActions[status].onClick}
                disabled={!cansSwitchStatus}
                ml={3}
              >
                {headerActions[status].label}
                <NextIcon />
              </Button>
            )}
            {status === "final" && (
              <>
                <Button onClick={getPreviousRetroId} ml={3}>
                  Start new retro
                  <NextIcon />
                </Button>
                {isExport ? (
                  <Button
                    variant="secondary"
                    onClick={() => navigate(`/${slug}`)}
                    ml={3}
                  >
                    <BackIcon />
                    Back
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    onClick={headerActions[status].onClick}
                    disabled={!cansSwitchStatus}
                    ml={3}
                  >
                    {headerActions[status].label}
                    <ExportIcon />
                  </Button>
                )}
              </>
            )}
          </NextStatusContainer>
        </HeaderContainer>
        <SubheaderContainer>
          <Breadcrumbs status={status} />
          <StatusHelp status={status} />
        </SubheaderContainer>
      </Box>
    </>
  );
};

export { Header as default, HeaderContainer };
