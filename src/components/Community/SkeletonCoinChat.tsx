import styled from "styled-components";

const SkeletonCoinChat : React.FC = () => {
  return <Card>
    <CoinHeader>
      <HeaderLeft>
        <Img></Img>
        <Name></Name>
      </HeaderLeft>
      <ViewMore></ViewMore>
    </CoinHeader>
    <TalkContent>
    </TalkContent>
  </Card>;
};

export default SkeletonCoinChat;

const Card = styled.div`
  display: flex;
  width: 47.153vw;
  padding : 1.25rem;
  flex-direction: column;
  align-items: center;
  gap: 0.781rem;
  border-radius : 1.25rem;
  background-color : var(--grey-100);
`;

const CoinHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const HeaderLeft = styled.div`
  display : flex;
  align-items: center;
`;

const Img = styled.div`
  display : flex;
  width : 2.188rem;
  height : 2.188rem;
  border-radius : 50%;
@keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.2);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }

  &:before {
    content: '';
    width: 100%;
    height: 100%;
    border-radius: 50%;
    animation: skeleton-gradient 2s infinite ease-in-out;
}
`;

const Name = styled.div`
  display: flex;
  margin-left : 0.903vw;
  width : 7rem;
  height : 1.75rem;
  border-radius: 0.625rem;
  @keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.2);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }

  &:before {
    content: '';
    width: 100%;
    height: 100%;
    border-radius: 0.625rem;
    animation: skeleton-gradient 2s infinite ease-in-out;
  }
`;

const ViewMore = styled.div`
  display : flex;
  width : 7.625rem;
  height : 1.875rem;
  border-radius: 0.625rem;

  @keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.2);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }

  &:before {
    content: '';
    width: 100%;
    height: 100%;
    border-radius: 0.625rem;
    animation: skeleton-gradient 2s infinite ease-in-out;
  }
`;

const TalkContent = styled.div`
  display : flex;
  width : 47.222vw;
  height : 13.625vh;
  gap : 0.5rem;
  border-radius : 0.938rem;

  @keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.2);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }

  &:before {
    content: '';
    width: 100%;
    height: 100%;
    animation: skeleton-gradient 2s infinite ease-in-out;
    border-radius : 0.938rem;
  }
`;