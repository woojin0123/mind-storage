import styled, { keyframes } from "styled-components";

const fadeInOut = keyframes`
  0% { 
    opacity: 0.4; 
    transform: scale(0.98); /* 살짝 작아짐 */
  }
  50% { 
    opacity: 1; 
    transform: scale(1.02); /* 살짝 커짐 */
  }
  100% { 
    opacity: 0.4; 
    transform: scale(0.98); 
  }
`;

const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, #151531 0%, #000 100%);
  color: white;
  position: relative;
  z-index: 10;
`;

const Logo = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
  animation: ${fadeInOut} 3s infinite ease-in-out;
`;

const LoadingText = styled.p`
  font-size: 1rem;
  letter-spacing: 2px;
  opacity: 0.8;
`;

const LoadingPage = () => {
  return (
    <LoadingContainer>
      <Logo src="/img/Group 42.svg" alt="logo" />
      <LoadingText></LoadingText>
    </LoadingContainer>
  );
};

export default LoadingPage;
