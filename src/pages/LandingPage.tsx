import { useEffect, useRef, useState } from "react";
import { FullPage, Slide } from "react-full-page";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { BodyTypo } from "../styles/Typography";
import gsap from "gsap";

const LandingPage = () => {
  const navigate = useNavigate();
  const LandingButton = () => {
    navigate("/dashboard", {state: {showUserModal: true}});
  };

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
    setCurrentSlide((prevSlide) => (prevSlide === 1 ? 0 : prevSlide + 1));
  };


  const [visibilityState, setVisibilityState] = useState({
    image3: false,
    image4: false,
    image5: false,
    image6: false,
  });
  const image3Ref = useRef<HTMLImageElement | null>(null);
  const image4Ref = useRef<HTMLImageElement | null>(null);
  const image5Ref = useRef<HTMLImageElement | null>(null);
  const image6Ref = useRef<HTMLImageElement | null>(null);
  const LogoBackgroundThirdRef = useRef<HTMLImageElement | null>(null);
  const LogoBackgroundFourthRef = useRef<HTMLImageElement | null>(null);
  const LogoBackgroundFifthRef = useRef<HTMLImageElement | null>(null);
  const LogoBackgroundSixthRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const currentLogoBackgroundThird = LogoBackgroundThirdRef.current;
    const currentLogoBackgroundFourth = LogoBackgroundFourthRef.current;
    const currentLogoBackgroundFifth = LogoBackgroundFifthRef.current;
    const currentLogoBackgroundSixth = LogoBackgroundSixthRef.current;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === currentLogoBackgroundThird) {
            setVisibilityState((prevState) => ({
              ...prevState,
              image3: entry.isIntersecting,
            }));
          }

          if (entry.target === currentLogoBackgroundFourth) {
            setVisibilityState((prevState) => ({
              ...prevState,
              image4: entry.isIntersecting, 
            }));
          }

          if (entry.target === currentLogoBackgroundFifth) {
            setVisibilityState((prevState) => ({
              ...prevState,
              image5: entry.isIntersecting,
            }));
          }

          if (entry.target === currentLogoBackgroundSixth) {
            setVisibilityState((prevState) => ({
              ...prevState,
              image6: entry.isIntersecting,
            }));
          }
        });
      },
      { threshold: 0.8 }
    );

    if (currentLogoBackgroundThird) observer.observe(currentLogoBackgroundThird);
    if (currentLogoBackgroundFourth) observer.observe(currentLogoBackgroundFourth);
    if (currentLogoBackgroundFifth) observer.observe(currentLogoBackgroundFifth);
    if (currentLogoBackgroundSixth) observer.observe(currentLogoBackgroundSixth);

    return () => {
      if (currentLogoBackgroundThird) observer.unobserve(currentLogoBackgroundThird);
      if (currentLogoBackgroundFourth) observer.unobserve(currentLogoBackgroundFourth);
      if (currentLogoBackgroundFifth) observer.unobserve(currentLogoBackgroundFifth);
      if (currentLogoBackgroundSixth) observer.unobserve(currentLogoBackgroundSixth);
    };
  }, []);

  return (
    <FullPage controls={false} beforeChange={beforeChange}>
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
          <CircleSecond key={`circle-${animationKey}`} />
          <LogoBackground src="/assets/LandingPage/LandingSecond.svg" />
          <TabletImage ref={tabletRef} src="/assets/LandingPage/Second-First-First.svg" />
          <MobileImage ref={mobileRef} src="/assets/LandingPage/Second-First-Second.svg" />
        </SlideContent>
      </Slide>

      <Slide>
        <SlideContent>
          <CircleThird key={`circle-${animationKey}`} />
          <LogoBackgroundThird ref={LogoBackgroundThirdRef} src="/assets/LandingPage/LandingThird.svg" />
          <Image3 isVisible={visibilityState.image3} ref={image3Ref} src="/assets/LandingPage/Image3.svg" />
        </SlideContent>
      </Slide>

      <Slide>
        <SlideContent>
          <CircleFifth key={`circle-${animationKey}`} />
          <LogoBackgroundFourth ref={LogoBackgroundFourthRef} src="/assets/LandingPage/LandingFourth.svg" />
          <Image4 isVisible={visibilityState.image4} ref={image4Ref} src="/assets/LandingPage/Image4.svg" />
        </SlideContent>
      </Slide>

      <Slide>
        <SlideContent>
          <CircleSixth key={`circle-${animationKey}`} />
          <LogoBackgroundFifth ref={LogoBackgroundFifthRef} src="/assets/LandingPage/LandingFifth.svg" />
          <Image5 isVisible={visibilityState.image5} ref={image5Ref} src="/assets/LandingPage/Image5.svg" />
        </SlideContent>
      </Slide>

      <Slide>
        <SlideContent ref={LogoBackgroundSixthRef}>
            <Image6 isVisible={visibilityState.image6} ref={image6Ref} src="/assets/LandingPage/Image6.svg" />
            <ButtonWrapper>
              <NonLoginButton onClick={()=>navigate("/dashboard")}>로그인 없이 이용하기</NonLoginButton>
              <LoginButton onClick={LandingButton}>로그인하고 더 많은 기능 이용하기</LoginButton>
            </ButtonWrapper>
        </SlideContent>
      </Slide>
    </FullPage>
  );
};

export default LandingPage;

const SlideContent1 = styled.div`
  margin-top: 128px;
  width: 98vw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
`;

const circleAnimation = keyframes`
  0% {
    width: 0;
    height: 0;
    opacity: 0;
  }
  100% {
    width: 31.25rem;
    height: 31.25rem;
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
  position: relative;
  z-index: 1;
  width: 31.25rem;
  height: 31.25rem;
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
const circleSecondAnimation = keyframes`
  0% {
    width: 0;
    height: 0;
    opacity: 0;
  }
  100% {
    width: 15rem;
    height: 15rem;
    opacity: 30%;
  }
`;
const CircleSecond = styled.div`  
  position: absolute;
  margin-right: 60vw;
  margin-top: 20vh;
  z-index: 1;

  width: 15rem;
  height: 15rem;
  transition: opacity 1s 1s;
  background-image: radial-gradient(circle, var(--pink), rgba(255, 255, 255, 0) 70%);
  border-radius: 50%;
  filter: blur(40px);
  animation: ${circleSecondAnimation} 2s ease-out forwards;
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

const LogoBackgroundThird = styled(LogoBackground)``;
const LogoBackgroundFourth = styled(LogoBackground)``;
const LogoBackgroundFifth = styled(LogoBackground)``;
const slideUpAnimation = keyframes`
  0% {
    transform: translate(-50%, -30%);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
`;

const circleThirdAnimation = keyframes`
  0% {
    width: 0;
    height: 0;
    opacity: 0;
  }
  100% {
    width: 10rem;
    height: 10rem;
    opacity: 20%;
  }
`;
const CircleThird = styled.div`  
  position: absolute;
  margin-right: -60vw;
  margin-top: -70vh;
  z-index: 1;

  width: 10rem;
  height: 10rem;
  transition: opacity 1s 1s;
  background-image: radial-gradient(circle, var(--green), rgba(255, 255, 255, 0) 70%);
  border-radius: 50%;
  filter: blur(40px);
  animation: ${circleThirdAnimation} 2s ease-out forwards;
`;
const Image3 = styled.img<{isVisible: boolean}>`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 53vw;
  max-width: 700px;

  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: transform 5s ease-out, opacity 2s ease-out;
  &.slide-up {
    transform: translate(-50%, -50%);
    opacity: 1;
    animation: ${slideUpAnimation} 3s forwards;
  }
`;

const circleFifthAnimation = keyframes`
  0% {
    width: 0;
    height: 0;
    opacity: 0;
  }
  100% {
    width: 30rem;
    height: 30rem;
    opacity: 20%;
  }
`;
const CircleFifth = styled.div`  
  position: absolute;
  margin-right: -70vw;
  margin-top: 40vh;
  z-index: 1;

  width: 30rem;
  height: 30rem;
  transition: opacity 1s 1s;
  background-image: radial-gradient(circle, var(--purple), rgba(255, 255, 255, 0) 70%);
  border-radius: 50%;
  filter: blur(40px);
  animation: ${circleFifthAnimation} 2s ease-out forwards;
`;
const Image4 = styled.img<{isVisible: boolean}>`
  position: absolute;
  top: 37%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60vw;
  max-width: 700px;

  opacity: ${(props) => (props.isVisible? 1 : 0)};
  transition: transform 5s ease-out, opacity 2s ease-out;
  &.slide-up {
    transform: translate(-50%, -50%);
    opacity: 1;
    animation: ${slideUpAnimation} 3s forwards;
  }
`;

const circleSixthAnimation = keyframes`
  0% {
    width: 0;
    height: 0;
    opacity: 0;
  }
  100% {
    width: 8rem;
    height: 8rem;
    opacity: 20%;
  }
`;
const CircleSixth = styled.div`  
  position: absolute;
  margin-right: 70vw;
  margin-top: 20vh;
  z-index: 1;

  width: 8rem;
  height: 8rem;
  transition: opacity 1s 1s;
  background-image: radial-gradient(circle, var(--red), rgba(255, 255, 255, 0) 70%);
  border-radius: 50%;
  filter: blur(40px);
  animation: ${circleSixthAnimation} 2s ease-out forwards;
`;
const Image5 = styled.img<{isVisible: boolean}>`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 48vw;
  max-width: 630px;

  opacity: ${(props) => (props.isVisible? 1 : 0)};
  transition: transform 5s ease-out, opacity 2s ease-out;
  &.slide-up {
    transform: translate(-50%, -50%);
    opacity: 1;
    animation: ${slideUpAnimation} 3s forwards;
  }
`;

const Image6 = styled.img<{isVisible: boolean}>`
  position: absolute;   
  width: 100vw;
  max-width: 1300px;

  opacity: ${(props) => (props.isVisible? 1 : 0)};
  transition: transform 7s ease-out, opacity 3s ease-out;
  &.slide-up {
    opacity: 1;
    animation: ${slideUpAnimation} 4s forwards;
  }
`;
const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 35%;
  display: flex;
`;
const NonLoginButton = styled(BodyTypo)`
  width: 12.5rem;
  height: 3.438rem;
  border: 1px solid var(--white-30);
  color: white;
  border-radius: 15px;
  text-align: center;
  line-height: 3.438rem;
  margin-right: 5rem;
  cursor: pointer;
`;
const LoginButton = styled(BodyTypo)`
  width: 17.313rem;
  height: 3.438rem;
  background-color: var(--purple);
  color: white;
  border-radius: 15px;
  text-align: center;
  line-height: 3.438rem;
  cursor: pointer;
`;
