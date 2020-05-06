import React from "react";
import { RouteComponentProps } from "@reach/router";
import { Flex, Box, Text, Logo, Button } from "components";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import underline from "assets/underline.svg";
import retrotoolScreenshot from "assets/retrotool-screenshot.png";
import { Heart } from "styled-icons/fa-solid/Heart";
import { Mobile } from "styled-icons/icomoon/Mobile";
import { LocationOff } from "styled-icons/material/LocationOff";
import { Cached } from "styled-icons/material/Cached";
import { LogInCircle } from "styled-icons/boxicons-regular/LogInCircle";
import { useGetRetrosStatsQuery } from "generated/graphql";

const HeartIcon = styled(Heart)`
  width: 10px;
  height: 10px;
  margin: 0 6px;
`;

interface Props extends RouteComponentProps {}

const LandingGlobalStyle = createGlobalStyle`
  body {
    background: ${themeGet("colors.white")} !important;
  }
`;

const Section = styled(Box).attrs({ as: "section" })``;

const underlineAnimation = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const Underline = styled(Box)`
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 0;
  height: 8px;
  background: url(${underline});
  background-repeat: repeat-x;
  background-position: center bottom;
  background-size: 200px 8px;
  animation: ${underlineAnimation} 0.3s 3s ease-in-out forwards;
`;

const Screenshot = styled(Box)`
  position: absolute;
  left: 80ch;
  bottom: -20px;
  width: 1275px
  height: 670px;
  background: url(${retrotoolScreenshot}) no-repeat;
  filter: drop-shadow(0 0 1px rgba(0,0,0,.5));
`;

const RetroSteps = styled(Text).attrs({
  as: "h3",
  textStyle: "landingHowtoStep"
})`
  ::before {
    content: "";
    position: absolute;
    margin-top: 12px;
    margin-left: -40px;
    width: 30px;
    height: 1px;
    background: ${themeGet("colors.violet")};
  }
`;

const Landing: React.FC<Props> = () => {
  const { data } = useGetRetrosStatsQuery();

  return (
    <>
      <LandingGlobalStyle />
      <Box bg="white" margin="auto">
        <Flex
          as="header"
          justifyContent="space-between"
          alignItems="center"
          p={6}
        >
          <Logo />
          <Flex>
            <Text mr={3}>
              <a href="mailto:hi@retrotool.app" tabIndex={3}>
                Contact us
              </a>
            </Text>
            ·
            <Text ml={3}>
              <a href="https://github.com/retro-tool/" tabIndex={4}>
                Github
              </a>
            </Text>
          </Flex>
        </Flex>
        <Flex as="main" flexDirection="column">
          <Section
            textAlign={["left", null, "center"]}
            maxWidth="100ch"
            margin="auto"
            py={[24, null, null, 120, 150]}
            px={6}
          >
            <Text as="h1" fontSize={[7, 8, 9, 10]} lineHeight={7}>
              Retro tool,{" "}
              <Box position="relative" as="span">
                simple and effective{" "}
                <Underline display={["none", null, null, "block"]} />
              </Box>{" "}
              retrospectives for your team
            </Text>
            <Box mt={6} mb={[8, null, 10]} mx="auto" maxWidth="60ch">
              <Text fontSize={[5, null, 6]} color="grey">
                Collaborate with your remote team to improve what you do, guided
                by a simple workflow. And for free!
              </Text>
            </Box>
            <Flex mb={2} justifyContent="center" textAlign="center">
              {/*
              // @ts-ignore */}
              <Button
                as="a"
                href="/new"
                variant="landingPrimary"
                fontSize={[3, null, 4]}
                tabIndex={1}
                px={[4, null, 7]}
              >
                Start a new retro
              </Button>
              {/*
              // @ts-ignore */}
              <Button
                as="a"
                href="#how-it-works"
                variant="landingSecondary"
                ml={5}
                tabIndex={2}
                fontSize={[3, null, 4]}
                px={[4, null, 7]}
              >
                See how it works
              </Button>
            </Flex>
            {data && data.stats && data.stats.retros && (
              <Text
                fontSize={[3, null, 4]}
                color="grey"
                mt={7}
                mb={[4, null, null, 0]}
              >
                Already{" "}
                <Text
                  fontSize="inherit"
                  color="dark"
                  as="span"
                  fontWeight="bold"
                >
                  {data.stats.retros.count} retros
                </Text>{" "}
                and counting.
              </Text>
            )}
          </Section>
          <Section
            bg="violet"
            color="white"
            py={[8, null, null, 80, 100]}
            px={7}
          >
            <Box maxWidth="100ch" margin="auto">
              <Text as="h2" hidden>
                Main features
              </Text>
              <Flex justifyContent="space-between" flexWrap="wrap">
                <Box
                  maxWidth={["100%", null, "45%", "20%"]}
                  mb={[9, 0]}
                  height={["auto", 250, "auto"]}
                >
                  <Mobile height={32} />
                  <Text
                    as="h3"
                    mt={5}
                    mb={4}
                    textStyle="landingHighlightsTitle"
                  >
                    Easy peasy
                  </Text>
                  <Text textStyle="landingHighlightsText">
                    A mobile friendly UI with a clean and fast workflow that
                    doesn't even need a tutorial.
                  </Text>
                  <Text textStyle="landingHighlightsText" mt={4}>
                    Did we already say that it's free?
                  </Text>
                </Box>
                <Box
                  maxWidth={["100%", null, "45%", "20%"]}
                  mb={[9, 0]}
                  height={["auto", "auto", 260]}
                >
                  <LocationOff height={32} />
                  <Text
                    as="h3"
                    mt={5}
                    mb={4}
                    textStyle="landingHighlightsTitle"
                  >
                    Anonymous
                  </Text>
                  <Text textStyle="landingHighlightsText">
                    We don't track or store any personal information.
                  </Text>
                  <Text textStyle="landingHighlightsText" mt={4}>
                    The code is open source so you can always check what we are
                    doing.
                  </Text>
                </Box>
                <Box maxWidth={["100%", null, "45%", "20%"]} mb={[9, 0]}>
                  <Cached height={32} />
                  <Text
                    as="h3"
                    mt={5}
                    mb={4}
                    textStyle="landingHighlightsTitle"
                  >
                    Real time
                  </Text>
                  <Text textStyle="landingHighlightsText">
                    Every change from your colleagues is shown instantly.
                  </Text>
                  <Text textStyle="landingHighlightsText" mt={4}>
                    You can see how others add topics, but you can only read
                    your own until the voting phase.
                  </Text>
                </Box>
                <Box maxWidth={["100%", null, "45%", "20%"]}>
                  <LogInCircle height={32} />
                  <Text
                    as="h3"
                    mt={5}
                    mb={4}
                    textStyle="landingHighlightsTitle"
                  >
                    No login required
                  </Text>
                  <Text textStyle="landingHighlightsText">
                    A retro is just a url, nothing else is needed. We don't even
                    ask for your name or email!
                  </Text>
                  <Text textStyle="landingHighlightsText" mt={4}>
                    Password protected retros are coming soon.
                  </Text>
                </Box>
              </Flex>
            </Box>
          </Section>
          <Box
            id="how-it-works"
            py={[9, null, null, 120, 150]}
            px={6}
            fontSize={3}
            lineHeight={8}
            overflow="hidden"
          >
            <Box
              width="100ch"
              maxWidth="100%"
              margin="auto"
              position="relative"
            >
              <Screenshot display={["none", null, null, null, null, "block"]} />
              <Box
                width="60ch"
                maxWidth="100%"
                margin={["auto", null, null, null, null, 0]}
              >
                <Text as="h2" fontSize={[6, null, 7, 8]}>
                  How to use Retro tool
                </Text>
                <Text fontSize={[4, null, 5]} color="grey" my={4}>
                  The main and only screen is a 4 columns layout where you can
                  add different topics and action items (unless you are on
                  tablet or mobile, in that case the UI will adapt).
                </Text>
                <Text fontSize={[4, null, 5]} color="grey" mb={[8, null, 10]}>
                  A retro consists of 4 simple guided steps, you can always see
                  the phase you're in the breadcrumb and you can advance to the
                  next step with the button placed in the header.
                </Text>

                <RetroSteps>Brainstorm</RetroSteps>
                <Text textStyle="landingBase" mt={1} mb={8}>
                  The first screen is where{" "}
                  <strong>you and your team can add topics</strong> like{" "}
                  <em>what went well</em>, <em>what can be improved</em> and{" "}
                  <em>questions</em>, usually this step is done asynchronously.
                  A good idea is to share the retro url some days before the
                  retro meeting.
                </Text>

                <RetroSteps>Group &amp; vote</RetroSteps>
                <Text textStyle="landingBase" mt={1} mb={8}>
                  This step is to <strong>group and vote</strong> so you know
                  what the most important topics are for your team. Usually this
                  step and the following are done synchronously with your team.
                </Text>

                <RetroSteps>Add action items</RetroSteps>
                <Text textStyle="landingBase" mt={1} mb={8}>
                  This step is where your team{" "}
                  <strong>discusses the prioritized topics</strong> and where
                  you can add action items to address those topics after the
                  retro.
                </Text>

                <RetroSteps>Done</RetroSteps>
                <Text textStyle="landingBase" mt={1}>
                  The last step is ending the retro, and at this point you can{" "}
                  <strong>export all the topics</strong> in plain text or{" "}
                  <strong>create a linked retro</strong>.
                </Text>
                <Text textStyle="landingBase" mt={4}>
                  <strong>Tip:</strong> You can create a retro with a{" "}
                  <strong>custom name</strong> by writing it in the url. If you
                  choose this pattern <em>https://retrotool.app/any-name-1</em>,
                  when you create a linked retro in the last step it will create
                  the retro <em>https://retrotool.app/any-name-2</em> and it
                  will show all the previous action items.
                </Text>
              </Box>
            </Box>
          </Box>
        </Flex>
        <Flex
          justifyContent="center"
          as="footer"
          maxWidth="100ch"
          margin="auto"
          paddingY={5}
          textAlign="center"
        >
          <span hidden>
            <Text mr={3}>
              <a
                href="https://www.privacypolicygenerator.info/live.php?token=CO11gYVp53qsMddz2QM7tnoDkY61Iid0"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
            </Text>
            ·
          </span>
          <Text mb={4}>
            <Flex alignItems="center">
              <span>Made with</span> <HeartIcon />{" "}
              <Box as="span" display={["none", "none", "block"]}>
                by <a href="https://twitter.com/uesteibar">Unai Esteibar</a>,{" "}
                <a href="https://twitter.com/marciobarrios">Marcio Barrios</a>,{" "}
                <a href="https://twitter.com/andrzej_trzaska">
                  Andrzej Trzaska
                </a>
                , <a href="https://twitter.com/iamsilesc">Christian Siles</a>{" "}
                and <a href="https://twitter.com/Rude">Rude Ayelo</a>
              </Box>
            </Flex>
          </Text>
        </Flex>
      </Box>
    </>
  );
};

export default Landing;
