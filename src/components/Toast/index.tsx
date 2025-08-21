import { createPortal } from 'react-dom'
import { ToastContainer } from 'react-toastify'
import styled from 'styled-components'

const StyledToastContainer = styled(ToastContainer)`
  &.Toastify__toast-container {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 9999999;
    width: auto;
    min-width: 300px;
    max-width: 600px;
    background: transparent;
    padding: 0;
  }

  .Toastify__toast {
    background-color: #333333;
    color: #eeeeee;
    font-family: 'Work Sans', sans-serif;
    font-size: 16px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    margin: 0;
  }

  .Toastify__toast-body {
    padding: 12px;
  }
`

const Toast = () =>
  createPortal(
    <StyledToastContainer
      containerId="contactToast"
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover
      theme="dark"
    />,
    document.body
  )

export default Toast
