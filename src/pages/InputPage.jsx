import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import Modal from "../components/Modal.jsx";

const MainContainer = styled.main`
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  padding-top: 60px;

  .disk-link {
    position: absolute;
    top: 30px;
    right: 4%;
    img { width: 35px; }
  }
  .main-logo { max-width: 60%; height: auto; }
`;

const Layout = styled.div`
  width: 100%;
  padding: 0 20px;
  margin-top: 30px;
`;

const BoxWrapper = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 40px;
  p { margin-bottom: 15px; font-size: 0.95rem; opacity: 0.9; }
`;

const TextAreaBase = styled.textarea`
display: block;
  margin: 0 auto;
  width: 100%;
  background: transparent;
  color: #FFFEF5;
  padding: 15px;
  resize: none;
  font-family: inherit;
  font-size: 1rem;
  border-radius: 16px;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const DiaryBox = styled(TextAreaBase)` 
height: 35vh;
  min-height: 200px;
  border: 0.5px solid rgba(255, 251, 228, 0.2);
  box-shadow: 0px 0px 8px rgba(247, 224, 109, 0.3);

  &:focus {
    border: 1px solid rgba(255, 251, 228, 0.5);
    box-shadow: 0px 0px 10px rgba(247, 224, 109, 0.6);
  }
`;

const PraiseBox = styled(TextAreaBase)`
  height: 80px;
  border: 0.5px solid rgba(174, 255, 255, 0.3);
  box-shadow: 0px 0px 8px rgba(174, 255, 255, 0.2);

  &:focus {
    border: 1px solid rgba(174, 255, 255, 0.6);
    box-shadow: 0px 0px 12px rgba(174, 255, 255, 0.4);
  }
`;

// 4. 오늘의 고민 (WorryBox) - 오렌지/노을색 계열
const WorryBox = styled(TextAreaBase)`
  height: 80px;
  border: 0.5px solid rgba(255, 103, 35, 0.3);
  box-shadow: 0px 0px 8px rgba(255, 103, 35, 0.2);

  &:focus {
    border: 1px solid rgba(255, 103, 35, 0.6);
    box-shadow: 0px 0px 12px rgba(255, 103, 35, 0.4);
  }
`;

const SmallBox = styled(TextAreaBase)`
 height: 80px; 
 `;

const SaveButton = styled.input`
  width: 180px;
  height: 45px;
  font-size: 0.8rem;
  cursor: pointer;
  color: #fff;
  background: rgba(247, 224, 109, 0.2);
  border: 1px solid #F7E06D;
  border-radius: 25px;
  box-shadow: 0px 0px 10px rgba(247, 224, 109, 0.4);
  display: block;
  margin: 40px auto;
  transition: 0.2s;
  &:hover { background: rgba(247, 224, 109, 0.4); }
`;

const Footer = styled.footer`
  p {
    text-align: center;
    padding: 40px 0;
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.5);
  }
`;

const InputPage = () => {
  const navigate = useNavigate();
  const [diary, setDiary] = useState('');
  const [praise, setPraise] = useState('');
  const [worry, setWorry] = useState('');
  
  // 모달 상태 추가

const handleSave = () => {
  // 1. 빈칸 체크 (커스텀 모달 활용)
  if (!diary.trim() && !praise.trim() && !worry.trim()) {
    setModalConfig({
      show: true,
      message: "오늘의 마음을 기록해 주세요.",
      onConfirm: () => setModalConfig(prev => ({ ...prev, show: false })),
    });
    return;
  }

  // 2. 데이터 준비 (중복 선언 해결)
  let savedList = JSON.parse(localStorage.getItem('mindStorage')) || [];
  const now = new Date();
  const dateStr = now.toLocaleDateString();
  
  // 24시간 형식 (HH:mm)으로 강제 지정
  const timeStr = now.getHours().toString().padStart(2, '0') + ':' + 
                  now.getMinutes().toString().padStart(2, '0');
  
  const setTimestamp = Date.now();

  const addData = (type, text, offset) => {
    if (text?.trim()) {
      savedList.push({ 
        id: setTimestamp + offset, 
        type, 
        text, 
        date: dateStr, 
        time: timeStr // 여기서 24시간 형식이 들어감
      });
    }
  };

  addData('diary', diary, 0.1); 
  addData('praise', praise, 0.2); 
  addData('worry', worry, 0.3);

  // 4. 로컬스토리지 저장
  localStorage.setItem('mindStorage', JSON.stringify(savedList));
  
  // 5. 저장 완료 모달 띄우기
  setModalConfig({
    show: true,
    message: "오늘의 마음이\n소중하게 저장되었습니다.",
    onConfirm: () => navigate('/list'),
  });
};


const [modalConfig, setModalConfig] = useState({
  show: false,
  message: "",
  onConfirm: () => {},
});
  return (
    <MainContainer>
      <Header>
        <Link to="/list" className="disk-link"><img src="/img/Group 35.svg" alt="디스크" /></Link>
        <img src="/img/Frame 9.svg" alt="로고" className="main-logo" />
      </Header>
      <Layout>
        <BoxWrapper>
          <p>오늘 어떤 하루를 보냈나요?</p>
          <DiaryBox placeholder="오늘 하루를 담아보세요." value={diary} onChange={(e) => setDiary(e.target.value)} />
        </BoxWrapper>
        <BoxWrapper>
          <p>오늘 나에게 주고 싶은 칭찬은?</p>
          <PraiseBox placeholder="잘한 일을 담아보세요." value={praise} onChange={(e) => setPraise(e.target.value)} />
        </BoxWrapper>
        <BoxWrapper>
          <p>여기에 두고 갈 고민이 있나요?</p>
          <WorryBox placeholder="고민을 담아보세요." value={worry} onChange={(e) => setWorry(e.target.value)} />
        </BoxWrapper>
        <SaveButton type="button" value="마음을 소중히 기억하기" onClick={handleSave} />
      </Layout>
      <Footer><p>기억하고 싶은 오늘을 담다, 마음저장소</p></Footer>

      {/* 저장 완료 커스텀 모달 */}
{modalConfig.show && (
      <Modal 
        message={modalConfig.message} 
        onConfirm={modalConfig.onConfirm}
        confirmText={modalConfig.message.includes("보관") ? "마음 보러가기" : "확인"}
      />
    )}
  </MainContainer>
  );
};

export default InputPage;