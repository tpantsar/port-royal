import { useState } from 'react'
import AlertOverlay from './components/AlertOverlay'

const App2 = () => {
  const [showAlert, setShowAlert] = useState(false)

  const handleShowAlert = () => {
    setShowAlert(true)
  }

  const handleCloseAlert = () => {
    setShowAlert(false)
  }

  return (
    <div>
      <button onClick={handleShowAlert}>Show Alert</button>
      {showAlert && <AlertOverlay message="This is an alert message!" onClose={handleCloseAlert} />}
    </div>
  )
}

export default App2
