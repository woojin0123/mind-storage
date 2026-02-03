import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css";
import { Korean } from "flatpickr/dist/l10n/ko.js";
import { Calendar, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import Modal from "../components/Modal.jsx";

const ListContainer = styled.div`
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const ContentWrapper = styled.div`
  flex: 1;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .edit-link {
    position: absolute;
    top: 10px;
    right: 1%;
    img {
      width: 35px;
    }
  }
  .main-logo {
    max-width: 60%;
    padding-top: 40px;
    transform: scale(0.9);
  }
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 0 20px 0;
  border-bottom: 1px solid rgba(247, 224, 109, 0.2);
  padding-bottom: 15px;
`;

const CalendarWrapper = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  color: #e0e5ff;
  filter: drop-shadow(0px 0px 3px #f7e06d);
`;

const DateTitleSection = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  font-weight: bold;
  font-size: 1rem;
  color: #fffef5;
  text-shadow: 0px 0px 8px rgba(247, 224, 109, 0.9);
  padding-bottom: 10px;
  letter-spacing: 1px;
  .arrow-btn {
    cursor: pointer;
    position: relative;
    top: 3px;
    opacity: 0.7;
  }
  span {
    position: relative;
    top: -2px;
  }
`;

const MindItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 16px;
  margin-bottom: 20px;
  border: 0.5px solid
    ${(props) =>
      props.type === "praise"
        ? "rgba(174, 255, 255, 0.3)"
        : props.type === "worry"
          ? "rgba(255, 103, 35, 0.3)"
          : "rgba(255, 251, 228, 0.2)"};
  box-shadow: 0px 0px 8px
    ${(props) =>
      props.type === "praise"
        ? "rgba(174, 255, 255, 0.2)"
        : props.type === "worry"
          ? "rgba(255, 103, 35, 0.2)"
          : "rgba(247, 224, 109, 0.3)"};
  .item-info {
    font-size: 0.7rem;
    opacity: 0.6;
    margin-bottom: 10px;
  }
  .item-text {
    font-size: 0.9rem;
    line-height: 1.6;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  .delete-section {
    text-align: right;
    margin-top: 10px;
  }
`;

const SetHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 0 20px; /* 위쪽 여백을 줘서 세트끼리 구분 */
  gap: 15px;
  width: 100%;
`;

const TimeTag = styled.span`
  font-size: 0.75rem;
  color: #f7e06d;
  font-weight: 500;
  letter-spacing: 1.5px;
  white-space: nowrap;
  opacity: 0.8;
  /* 살짝 빛나는 효과 */
  text-shadow: 0px 0px 8px rgba(247, 224, 109, 0.5);
`;

const Line = styled.div`
  flex: 1;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(247, 224, 109, 0.4) 50%,
    transparent
  );
`;

const DeleteBtn = styled.button`
  background: none;
  border: none;
  color: #ff4d4d;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    transform: scale(1.1);
    color: #ff8080;
  }
`;

const Footer = styled.footer`
  p {
    text-align: center;
    padding: 50px 0 20px;
    font-size: 0.6rem;
    color: rgba(255, 255, 255, 0.6);
  }
`;

const ListPage = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString(),
  );
  const [mindList, setMindList] = useState([]);

  // 모달 상태 관리
  const [showModal, setShowModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("mindStorage")) || [];
    setMindList(data);
  }, []);

  const navArrow = (direction) => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + direction);
    setSelectedDate(date.toLocaleDateString());
  };

  // 삭제 클릭 시 모달 열기
  const handleDeleteClick = (id) => {
    setDeleteTarget(id);
    setShowModal(true);
  };

  // 모달에서 확인 눌렀을 때 실행
  const handleConfirmDelete = () => {
    const newList = mindList.filter((item) => item.id !== deleteTarget);
    localStorage.setItem("mindStorage", JSON.stringify(newList));
    setMindList(newList);
    setShowModal(false);
  };

  const typeLabel = {
    diary: "오늘의 일기",
    praise: "오늘의 잘한 일",
    worry: "오늘의 고민",
  };
  const typeOrder = { diary: 1, praise: 2, worry: 3 };

  const filteredData = mindList
    .filter((item) => item.date === selectedDate)
    .sort((a, b) => {
      if (Math.floor(a.id) !== Math.floor(b.id)) return a.id - b.id;
      return typeOrder[a.type] - typeOrder[b.type];
    });

  return (
    <ListContainer>
      <Header>
        <Link to="/" className="edit-link">
          <img src="/img/Group 40.svg" alt="연필" />
        </Link>
        <img src="/img/logo_text.svg" alt="로고" className="main-logo" />
      </Header>

      <ContentWrapper>
        <DateContainer>
          <CalendarWrapper>
            <Calendar size={24} />
            <Flatpickr
              value={new Date(selectedDate)}
              options={{
                locale: Korean,
                dateFormat: "Y. n. j.",
                disableMobile: true,
              }}
              onChange={([date]) => setSelectedDate(date.toLocaleDateString())}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: 0,
                cursor: "pointer",
              }}
            />
          </CalendarWrapper>
          <DateTitleSection>
            <ChevronLeft
              className="arrow-btn"
              onClick={() => navArrow(-1)}
              size={21}
            />
            <span>{selectedDate}</span>
            <ChevronRight
              className="arrow-btn"
              onClick={() => navArrow(1)}
              size={21}
            />
          </DateTitleSection>
        </DateContainer>

        <div id="mind-list">
          {filteredData.length === 0 ? (
            <p
              style={{ textAlign: "center", marginTop: "100px", opacity: 0.3 }}
            >
              기억된 마음이 없습니다.
            </p>
          ) : (
            filteredData.map((item, index) => {
              // 현재 아이템과 같은 세트(같은 초에 저장된 덩어리)인 것들만 찾기
              const currentSetId = Math.floor(item.id);

              // 현재 필터링된 전체 리스트 중에서, 이 세트에 속하는 첫 번째 아이템의 index 찾기
              const firstItemInSetIndex = filteredData.findIndex(
                (data) => Math.floor(data.id) === currentSetId,
              );

              return (
                <React.Fragment key={item.id}>
                  {/* 현재 아이템의 인덱스가 이 세트의 첫 번째 아이템 인덱스와 같다면 시간 표시 */}
                  {index === firstItemInSetIndex && (
                    <SetHeader>
                      <Line />
                      <TimeTag>{item.time}</TimeTag>
                      <Line />
                    </SetHeader>
                  )}

                  <MindItem type={item.type}>
                    <div className="item-info">
                      <span>{typeLabel[item.type]}</span>
                    </div>
                    <div className="item-text">{item.text}</div>
                    <div className="delete-section">
                      <DeleteBtn onClick={() => handleDeleteClick(item.id)}>
                        <Trash2 size={16} />
                      </DeleteBtn>
                    </div>
                  </MindItem>
                </React.Fragment>
              );
            })
          )}
        </div>
      </ContentWrapper>

      {showModal && (
        <Modal
          message={`이 마음을 삭제할까요?\n삭제하면 다시 되돌릴 수 없습니다.`}
          type="delete"
          confirmText="삭제"
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowModal(false)}
        />
      )}

      <Footer>
        <p>기억하고 싶은 오늘을 담다, 마음저장소</p>
      </Footer>
    </ListContainer>
  );
};

export default ListPage;
