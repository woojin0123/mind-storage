import styled, { keyframes } from "styled-components";

// 별이 반짝이는 애니메이션
const twinkle = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #151531 0%, #000 100%);
  z-index: -2; 
  overflow: hidden;
`;

const Star = styled.div`
  position: absolute;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background: white;
  border-radius: 50%;
  top: ${(props) => props.top}%;
  left: ${(props) => props.left}%;
  animation: ${twinkle} ${(props) => props.duration}s infinite ease-in-out;
  animation-delay: ${(props) => props.delay}s;
  box-shadow: 0 0 10px white;
`;

const StarBackground = () => {
  // 별 50개를 랜덤하게 생성
  const stars = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 1, // 1~4px
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: Math.random() * 3 + 2, // 2~5초
    delay: Math.random() * 5,
  }));

  return (
    <Background>
      {stars.map((star) => (
        <Star key={star.id} {...star} />
      ))}
    </Background>
  );
};

export default StarBackground;