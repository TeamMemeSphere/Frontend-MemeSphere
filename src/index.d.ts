declare module "react-full-page" {
    type ControlComponentsProps = {
      getCurrentSlideIndex: () => number;
      onNext: () => void;
      onPrev: () => void;
      scrollToSlide: (n: number) => void;
      slidesCount: number;
      children: React.ReactNode;
    };
  
    type FullPageProps = {
      initialSlide?: number;
      duration?: number;
      controls?: boolean | React.FC<ControlComponentsProps>;
      controlProps?: ControlComponentsProps;
      beforeChange?: () => void;
      afterChange?: () => void;
      scrollMode?: "full-page" | "normal";
      children: React.ReactNode;
    };
  
    type SlideProps = {
      children: React.ReactNode;
      style?: { maxHeight: string };
    };
  
    export const FullPage: React.FC<FullPageProps>;
  
    export const Slide: React.FC<SlideProps>;
  }