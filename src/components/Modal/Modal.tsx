import { FC, memo, ReactNode } from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => `${theme.colors.black}50`};
`;

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ color, theme }) => color || theme.colors.black};
  text-align: center;
  border-radius: 0.5rem;
  border: 0.063rem solid ${({ theme }) => theme.colors.gray};
  width: 100%;
  max-width: 37.5rem;
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 80%;
  }
`;

const CloseToolTip = styled.span`
  position: absolute;
  z-index: 4;
  right: 1.5rem;
  top: 1.5rem;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  line-height: 1.5rem;
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    right: 1rem;
    top: 1rem;
  }
`;

interface ModalProps {
  children: ReactNode;
  onClose?: () => void;
  visible: boolean;
}

const Modal: FC<ModalProps> = ({ visible, onClose, children }) => (
  <ModalContainer visible={visible}>
    <ModalContent>
      {onClose && <CloseToolTip onClick={onClose}>&times;</CloseToolTip>}
      {children}
    </ModalContent>
  </ModalContainer>
);

export default memo(Modal);
