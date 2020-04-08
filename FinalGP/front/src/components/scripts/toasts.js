import { ToastContainer, toast } from 'react-toastify';

export const warn = (timeOut, msg) => {
  return toast(msg, {
  autoClose:timeOut,
  type: toast.TYPE.ERROR,
  position:toast.POSITION.TOP_CENTER,
  })
}

export const valid = (timeOut, msg) => {
  return toast(msg, {
    autoClose:timeOut,
    type: toast.TYPE.SUCCESS,
    position:toast.POSITION.TOP_CENTER,
  })
}

export const info = (timeOut, msg) => {
  return toast(msg, {
    autoClose:timeOut,
    type: toast.TYPE.INFO,
    position:toast.POSITION.TOP_CENTER,
    })
}