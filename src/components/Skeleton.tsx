import React from "react";
import { Link } from "@reach/router";

import { Box, Flex } from "components/UI";
import { HeaderContainer } from "components/Header";
import Logo from "components/Logo";
import {
  ContentContainer,
  WorksIcon,
  ImproveIcon,
  OthersIcon,
  ActionItemsIcon
} from "components/Content";
import { TopicContainer } from "components/Topic";
import { Input } from "components/Input";

const ContentSkeleton = () => (
  <ContentContainer>
    <TopicContainer>
      <Flex p={[3, null, null, null, 4]} alignItems="center">
        <Input
          disabled
          placeholder="It worked well that..."
          onChange={() => {}}
          value=""
        />
        <Flex order={-1}>
          <WorksIcon />
        </Flex>
      </Flex>
    </TopicContainer>
    <TopicContainer>
      <Flex p={[3, null, null, null, 4]} alignItems="center">
        <Input
          disabled
          placeholder="We could improve..."
          onChange={() => {}}
          value=""
        />
        <Flex order={-1}>
          <ImproveIcon />
        </Flex>
      </Flex>
    </TopicContainer>
    <TopicContainer>
      <Flex p={[3, null, null, null, 4]} alignItems="center">
        <Input
          disabled
          placeholder="I want to ask about..."
          onChange={() => {}}
          value=""
        />
        <Flex order={-1}>
          <OthersIcon />
        </Flex>
      </Flex>
    </TopicContainer>
    <TopicContainer>
      <Flex p={[3, null, null, null, 4]} alignItems="center">
        <Input
          disabled
          placeholder="We need to..."
          onChange={() => {}}
          value=""
        />
        <Flex order={-1}>
          <ActionItemsIcon />
        </Flex>
      </Flex>
    </TopicContainer>
  </ContentContainer>
);

const HeaderSkeleton: React.FC = () => (
  <Box position="relative" zIndex={1} bg="white" boxShadow={0}>
    <HeaderContainer>
      <Link to="/">
        <Logo color="grey" />
      </Link>
    </HeaderContainer>
  </Box>
);

export { ContentSkeleton, HeaderSkeleton };
