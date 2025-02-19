import { useEffect, useRef, useState } from "react";
import { FullPage, Slide } from "react-full-page";
import { NavLink } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { TitleTypo, BodyTypo } from "../styles/Typography";

import gsap from "gsap";

const LandingPage = () => {
  const [animationKey, setAnimationKey] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const tabletRef = useRef<HTMLImageElement | null>(null);
  const mobileRef = useRef<HTMLImageElement | null>(null);
  const timelineRef = useRef<GSAPTimeline | null>(null);
  useEffect(() => {
    const tabletImage = tabletRef.current;
    const mobileImage = mobileRef.current;

    if (tabletImage && mobileImage) {
      gsap.set([tabletImage, mobileImage], {
        opacity: 1,
        y: 0,
      });

      timelineRef.current = gsap.timeline({ paused: true })
        .to(tabletImage, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power2.out",
        })
        .to(mobileImage, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power2.out",
        }, "-=0.5");
    }
  }, []);

  useEffect(() => {
    if (timelineRef.current) {
      if (currentSlide === 1) {
        timelineRef.current.play();
      } else {
        timelineRef.current.reverse();
      }
    }
  }, [currentSlide, animationKey]);

  useEffect(() => {
    if (timelineRef.current) {
      if (currentSlide === 1) {
        timelineRef.current.play();
      } else {
        timelineRef.current.reverse();
      }
    }
  }, [currentSlide, animationKey]);

  const beforeChange = () => {
    setAnimationKey((prevKey) => prevKey + 1);
    setCurrentSlide((prevSlide) => (prevSlide === 1 ? 0 : prevSlide+1));
  };

  return (
    <FullPage controls={false} beforeChange={beforeChange}>
      <LandingPageNavbar>
        <Logo to="/">
          <LogoImg src="/assets/common/navbar/memesphere-main-logo.svg" />
          <LogoTypo>MemeSphere</LogoTypo>
        </Logo>
        <Button>MemeSphere 시작하기</Button>
      </LandingPageNavbar>

      <Slide>
        <SlideContent1 key={`slide-1-${animationKey}`}>
          <Circle key={`circle-${animationKey}`} />
          <LogoFirst src="/assets/LandingPage/LandingFirstLogo.svg " />
          <Line key={`line-${animationKey}`} />
          <LineCircle key={`linecircle-${animationKey}`} />
        </SlideContent1>
      </Slide>

      <Slide>
        <SlideContent>
          <LogoBackground src="/assets/LandingPage/LandingSecond.svg" />
          <TabletImage ref={tabletRef} src="/assets/LandingPage/Second-First-First.svg" />
          <MobileImage ref={mobileRef} src="/assets/LandingPage/Second-First-Second.svg" />
        </SlideContent>
      </Slide>

      <Slide>
        <SlideContent>
          <LogoBackground src="/assets/LandingPage/LandingThird.svg" />
          <Image3 src="/assets/LandingPage/Image3.svg" />
        </SlideContent>
      </Slide>

      <Slide>
        <SlideContent>
          <LogoBackground src="/assets/LandingPage/LandingFourth.svg" />
          <Image4 src="/assets/LandingPage/Image4.svg" />
        </SlideContent>
      </Slide>

      <Slide>
        <SlideContent>
          <LogoBackground src="/assets/LandingPage/LandingFifth.svg" />
          <Image5 src="/assets/LandingPage/Image5.svg" />
        </SlideContent>
      </Slide>
    </FullPage>
  );
};

export default LandingPage;

const LandingPageNavbar = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 128px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 1000;
  padding: 0 4.306vw;
`;

const Logo = styled(NavLink)`
  display: flex;
  text-decoration: none;
`;

const LogoImg = styled.img`
  width: 1.813rem;
  margin-right: 0.188rem;
`;

const LogoTypo = styled(TitleTypo)`
  color: var(--white-100);
`;

const Button = styled(BodyTypo)`
  width: 222px;
  height: 43px;
  border-radius: 15px;
  background-color: var(--blue);
  text-align: center;
  line-height: 43px;
`;

const SlideContent1 = styled.div`
  margin-top: 128px;
  width: 98vw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const circleAnimation = keyframes`
  0% {
    width: 0;
    height: 0;
    opacity: 0;
  }
  100% {
    width: 500px;
    height: 500px;
    opacity: 30%;
  }
`;

const lineAnimation = keyframes`
  0% {
    height: 0;
    opacity: 0;
  }
  100% {
    height: 32vh;
    opacity: 1;
  }
`;

const lineCircleAnimation = keyframes`
  0% {
    height: 0;
    width: 0;
    opacity: 0;
  }
  100% {
    height: 12px;
    width: 12px;
    opacity: 1;
  }
`;

const Circle = styled.div`
  margin-right: 3vw;
  margin-top: 25vh;
  position: relative:
  z-index: 1;
  width: 500px;
  height: 500px;
  opacity: 30%;
  transition: opacity 1s 1s;
  background-image: radial-gradient(circle, var(--blue), rgba(255, 255, 255, 0) 70%);
  border-radius: 50%;
  filter: blur(10px);
  animation: ${circleAnimation} 2s ease-out forwards;
`;

const LogoFirst = styled.img`
  height: 12rem;
  position: absolute;
  margin-right: 2vw;
  margin-top: 13vh;
  z-index: 2;
`;

const Line = styled.div`
  height: 32vh;
  width: 0.2vw;
  background-image: linear-gradient(rgba(255, 255, 255, 0) 10%, var(--blue));
  filter: blur(1px);
  position: absolute;
  margin-top: 68vh;
  margin-right: 3vw;
  animation: ${lineAnimation} 3s 0.5s forwards;
`;

const LineCircle = styled.div`
  height: 12px;
  width: 12px;
  border-radius: 100%;
  border: 1px solid var(--blue);
  filter: blur(1px);
  position: absolute;
  margin-top: 101vh;
  margin-right: 3vw;
  animation: ${lineCircleAnimation} 3s 1s forwards;
`;

const SlideContent = styled.div`
  width: 98vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const LogoBackground = styled.img`
  width: 100vw;
  max-width: 1300px;
  position: relative;
  bottom: 10%;
`;

const TabletImage = styled.img`
  position: absolute;
  width: 50vw;
  max-width: 650px;
  @media (min-width: 1600px) {
    left: 42%;
  }
  @media (max-width: 1600px) {
    left: 42%;
  }
  @media (max-width: 1000px) {
    bottom: 35%;
    left: 38%;
  }
  @media (max-width: 760px) {
    bottom: 42%;
    left: 38%;
  }
  @media (max-width: 420px) {
    bottom: 48%;
    left: 38%;
  }
`;

const MobileImage = styled.img`
  position: absolute;
  right: 48%;
  bottom: 30%;
  width: 40vw;
  max-width: 500px;
  @media (max-width: 1000px) {
    bottom: 36%;
  }
  @media (max-width: 760px) {
    bottom: 45%;
  }
  @media (max-width: 420px) {
    bottom: 48%;
  }
`;

const Image3 = styled.img`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 53vw;
  max-width: 700px;
`;

const Image4 = styled.img`
  position: absolute;
  top: 37%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60vw;
  max-width: 700px;
`;

const Image5 = styled.img`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 48vw;
  max-width: 630px;
`;
