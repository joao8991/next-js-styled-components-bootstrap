import styled, { css, keyframes } from "styled-components";

export const Button = styled.button`
  ${({ theme: { colors } }) => {
    return css`
      background-color: white;
      border: 1px solid black;
      border-radius: 5px;
      cursor: pointer;
      &:hover {
        opacity: 0.5;
      }
    `;
  }}
`;
