import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex; justify-content: center; align-items: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  width: 280px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 251, 228, 0.2);
  box-shadow: 0px 0px 20px rgba(247, 224, 109, 0.2);
  border-radius: 20px;
  padding: 25px;
  text-align: center;
  backdrop-filter: blur(10px);
`;

const Message = styled.p`
  color: #fff;
  font-size: 0.9rem;
  margin-bottom: 25px;
  line-height: 1.6;
  text-align: center;
  white-space: pre-wrap; 
  word-break: keep-all;
`;

const BtnGroup = styled.div`
  display: flex; gap: 10px; justify-content: center;
`;

const ModalBtn = styled.button`
  padding: 12px 28px;
  border-radius: 25px;
  border: none;
  font-size: 0.85rem;
  font-family: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  /* 기본 '확인' 스타일 (금색 그라데이션) */
  background: rgba(247, 224, 109, 0.2);
  color: #FFFEF5;
  box-shadow: 0px 4px 15px rgba(247, 224, 109, 0.2);
  border: 0.5px solid #F7E06D;
  transition: 0.2s;
  &:hover { background: rgba(247, 224, 109, 0.4);
  color: #fff; }


  /* 삭제 모달일 때의 빨간색 스타일 (props로 분기) */
  ${(props) => props.$isDelete && `
    background: rgba(177, 0, 0, 0.3) !important;
    color: #FFFEF5 !important;
    border: 0.5px solid #880000 !important;
    box-shadow: 0px 4px 15px rgba(177, 0, 0, 0.2) !important;
  `}

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.1);
    color: #fff;
  }

  &.cancel {
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: none;
    &:hover { background: rgba(255, 255, 255, 0.15); color: #fff; }
  }
`;

const Modal = ({ message, onConfirm, onCancel, type = "confirm", confirmText = "확인" }) => {
  return (
    <ModalOverlay>
      <ModalBox>
        <Message>{message}</Message>
        <BtnGroup>
          {type === "delete" && (
            <ModalBtn className="cancel" onClick={onCancel}>취소</ModalBtn>
          )}
          <ModalBtn 
            className="confirm" 
            onClick={onConfirm} 
            $isDelete={type === "delete"} // $를 붙여서 DOM 속성 에러 방지
          >
            {confirmText}
          </ModalBtn>
        </BtnGroup>
      </ModalBox>
    </ModalOverlay>
  );
};

export default Modal;