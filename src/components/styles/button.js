import styled from 'styled-components';

export const Button = styled.button`
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
  cursor: pointer;
  border: 1 px
  solid transparent; padding: 0.375 rem 0.75 rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;

  &:hover {
    background-color: #0069d9;
    border-color: #0062cc;
  }

  &:focus {
    box-shadow: 0 0 0 0.2rem rgb(0 123 255 / 50%);
  }

  /* Color the border and text with theme.main */
  color: ${props => props.theme.main};
  border: 2px solid ${props => props.theme.main};
`;