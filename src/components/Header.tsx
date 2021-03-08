import React, { useRef, useState } from "react";
import styled, { css } from "styled-components/macro";
import { display, DisplayProps, space, SpaceProps } from "styled-system";
import themeGet from "@styled-system/theme-get";
import { Redirect, navigate, Link } from "@reach/router";
import { ChevronRight } from "styled-icons/material/ChevronRight";
import { ChevronLeft } from "styled-icons/material/ChevronLeft";
import { ArrowUpward } from "styled-icons/material/ArrowUpward";

import { client } from "services/api";
import { useSlug } from "components/Slug.context";
import { About } from "components/About";
import Button from "components/Button";
import { LightboxContent, LightboxOverlay } from "components/Lightbox";
import Logo from "components/Logo";
import { useStatus } from "components/StatusProvider";
import { Text } from "components/Text";
import { Settings } from "components/Settings";
import { Box, BoxType, Flex } from "./UI";
import { HeaderSkeleton } from "components/Skeleton";

import {
  useCreateLinkedRetroQuery,
  GetRetroIdDocument,
  useGetNextRetroQuery
} from "generated/graphql";
import { Status } from "types";

/**
 * TYPES
 */
interface HeaderContainerProps extends SpaceProps {}

interface SubheaderProps extends DisplayProps, SpaceProps {}

type BreadcrumbItemProps = BoxType & {
  active: boolean;
};

interface BreadcrumbsProps {
  status: string;
}

type LinkedRetroProps = {
  previousRetroId: number;
};

interface StatusHelpProps {
  status: string;
}

type HeaderProps = {
  isExport?: boolean;
};

/**
 * STYLES
 */
const HeaderContainer = styled.div.attrs<HeaderContainerProps>({
  py: 3,
  px: 4
})`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${space}
`;

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

const StatusHelpContainer = styled.div`
  display: flex;
  align-items: center;

  ${display}
`;

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

/**
 * MISC COMPONENTS
 */
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

const CreateNewLinkedRetro = ({ previousRetroId }: LinkedRetroProps) => {
  const { data, loading, error } = useCreateLinkedRetroQuery({
    variables: { previousRetroId }
  });

  if (loading) return null;
  if (error) return null;
  if (!data || !data.retro) return null;

  return <Redirect noThrow to={`/${data.retro.slug}`} />;
};

/**
 * MAIN COMPONENT
 */
const Header: React.FC<HeaderProps> = ({ isExport }) => {
  const slug = useSlug();
  const { cansSwitchStatus, status, nextStatus, password } = useStatus();
  const [confirm, setConfirm] = useState(false);
  const [triggerExport, setTriggerExport] = useState(false);
  const [previousRetroId, setPreviousRetroId] = useState();
  const buttonRef = useRef(null);

  const headerActions: Record<Status, any> = {
    "password-protected": {},
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
      variables: { slug, password }
    });

    setPreviousRetroId(data.retro.id);
  };

  const { data } = useGetNextRetroQuery({ variables: { slug, password } });
  const nextRetro = data && data.retro && data.retro.nextRetro;

  if (status === "password-protected") {
    return <HeaderSkeleton />;
  }
  if (triggerExport) return <Redirect noThrow to={`/${slug}/export`} />;
  if (previousRetroId) {
    return <CreateNewLinkedRetro previousRetroId={previousRetroId!} />;
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
          <Link to="/">
            <Logo color="grey" />
          </Link>
          <NextStatusContainer>
            <Settings />
            <About />
            {status !== "final" && (
              <Button
                onClick={headerActions[status].onClick}
                disabled={!cansSwitchStatus}
              >
                {headerActions[status].label}
                <NextIcon />
              </Button>
            )}
            {status === "final" && (
              <>
                {nextRetro ? (
                  <Button onClick={() => navigate(`/${nextRetro.slug}`)}>
                    See next retro
                    <NextIcon />
                  </Button>
                ) : (
                  <Button onClick={getPreviousRetroId}>
                    Start new retro
                    <NextIcon />
                  </Button>
                )}
                {isExport ? (
                  <Button
                    variant="secondary"
                    onClick={() => navigate(`/${slug}`)}
                  >
                    <BackIcon />
                    Back
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    onClick={headerActions[status].onClick}
                    disabled={!cansSwitchStatus}
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

export { Header, HeaderContainer };
