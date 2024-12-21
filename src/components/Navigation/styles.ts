import styled from 'styled-components'

export const NavigationContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1;

  @media (max-width: 471px) {
    right: 10px;
  }
`

export const NavigationButton = styled.button`
  background-color: #58174a;
  color: wheat;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #b37da7;
    transform: scale(1.1);
    transition: transform 0.2s, background-color 0.2s;
  }

  @media (max-width: 471px) {
    width: 40px;
    height: 40px;
  }

  /* &[data-direction='up'] {
    transform: rotate(180deg);
  } */
`
