import '../styles/AlertOverlay.css'

interface AlertOverlayProps {
  message: string
  onClose: () => void
}

const AlertOverlay = ({ message, onClose }: AlertOverlayProps) => {
  return (
    <div className="alert-overlay">
      <div className="alert-box">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

export default AlertOverlay
