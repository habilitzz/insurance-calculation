import styled from 'styled-components';

export const Card = styled.div`
  position: relative;
  margin-top: 2rem;
  border: 1px solid #ccc;
  flex-basis: 45%;
  max-width: 45%;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  @media(max-width: 767px) {
    flex-basis: 80%;
    max-width: 80%;
    margin: auto;
    margin-top: 2rem;
  }
`;

export const CardContentWrapper = styled.div`
  position: relative;
  display: block;
`;

export const CardContainer = styled.div`
    @media(min-width: 768px) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
`;

export const CardImage = styled.img`
  height: 100%;
  width: 100%;
`;

export const CardImageWrapper = styled.div`
  max-height: 224px;
  height: 224px;
  overflow: hidden;
`;

export const DonateOption = styled.div`
  margin: auto;
  display: block;
  align-content: center;
  margin-top: 20%;
`;

export const CloseButton = styled.button`
  border: none;
  font-size: 2rem;
  color: #111;
  float: right;
`;

export const DonateName = styled.div`
    line-height: 75px;
    text-align: center;
    display: flex;
    .name {
      display: block;
      max-width: 98%;
      white-space: nowrap;
      overflow: hidden !important;
      text-overflow: ellipsis;
      flex: 1;
      font-size: 1.2rem;
      flex-basis: 82%;
      text-align: left;
      color: #666;
      margin: 0 0 0 20px;
      @media(min-width: 768px) {
        font-size: 1rem;
      }
    }
    .donate-btn {
      flex: 1;
      margin: 0 20px;
      flex-basis: 10%;
    }
`;

export const Hover = styled.div`
  transition: .5s ease;
  opacity: 0.9;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
  height: 101%;
  background-color: #fff;
`;