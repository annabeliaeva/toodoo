import './App.sass'
import Body from './layout/Body/Body'
import Header from './layout/Header/Header'
import { useGlobalContext } from './GlobalContent'
import { createPortal } from 'react-dom'
import ModalAuth from './components/ModalAuth/ModalAuth'

function App() {
  const { authedUser, setAuthedUser } = useGlobalContext()

  const handleSubmitLogin = (username: string) => {
    setAuthedUser(username)
  }

  return (
    <div>
      {!authedUser ? (
        createPortal(
          <ModalAuth submitLogin={handleSubmitLogin} />,
          document.body
        )
      ) : (
        <div className="app">
          <Header />
          <Body />
        </div>
      )}
    </div>
  )
}

export default App
