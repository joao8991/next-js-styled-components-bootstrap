import styled, { css, keyframes } from "styled-components";

export const Button = styled.button`
  ${({ theme: { colors } }) => {
    return css`
      background-color: ${colors.firstColor};
    `;
  }}
`;
