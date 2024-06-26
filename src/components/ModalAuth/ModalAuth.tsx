import { useEffect, useRef, useState } from 'react'
import styles from './ModalAuth.module.sass'
import cn from 'classnames'
interface ModalAuthProps {
  submitLogin: (username: string) => void
}

function ModalAuth({ submitLogin }: ModalAuthProps) {
  const [isShown, setIsShown] = useState(false)
  const [username, setUsername] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isShown) setIsShown(true)
  }, [])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    submitLogin(event.currentTarget.login.value)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  return (
    <div className={styles['overlay']}>
      <div
        className={cn(styles['overlay__content'], {
          [styles['overlay__content-opened']]: isShown
        })}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles['overlay__header']}>Авторизация</div>
        <div className={styles['overlay__spacer']} />
        <form className={styles['overlay__form']} onSubmit={handleSubmit}>
          <div className={styles['overlay__input-and-label']}>
            <label
              className={styles['overlay__input-and-label-label']}
              htmlFor="login"
            >
              Введите логин
            </label>
            <input
              className={styles['overlay__input-and-label-input']}
              ref={inputRef}
              type="text"
              placeholder="Ваш логин"
              value={username}
              onChange={handleChange}
              id="login"
            />
          </div>
          <button className={styles['overlay__submit-button']}>Войти</button>
        </form>
      </div>
    </div>
  )
}

export default ModalAuth
