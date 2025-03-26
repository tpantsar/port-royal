import { Alert as MuiAlert } from '@mui/material'
import AlertTitle from '@mui/material/AlertTitle'
import '../styles/AlertOverlay.css'

interface AlertProps {
  message: string
  type: 'success' | 'info' | 'warning' | 'error'
}

const Alert = ({ message, type }: AlertProps) => {
  if (message === '' || message === undefined) {
    return null
  }

  if (type === 'success') {
    return (
      <MuiAlert severity={type}>
        <AlertTitle>Success</AlertTitle>
        {message}
      </MuiAlert>
    )
  } else if (type === 'info') {
    return (
      <MuiAlert severity={type}>
        <AlertTitle>Info</AlertTitle>
        {message}
      </MuiAlert>
    )
  } else if (type === 'warning') {
    return (
      <MuiAlert severity={type}>
        <AlertTitle>Warning</AlertTitle>
        {message}
      </MuiAlert>
    )
  } else if (type === 'error') {
    return (
      <MuiAlert severity={type}>
        <AlertTitle>Error</AlertTitle>
        {message}
      </MuiAlert>
    )
  }

  return null
}

export default Alert
