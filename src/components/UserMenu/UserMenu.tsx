import { useEffect, useRef, useState } from 'react'
import styles from './UserMenu.module.sass'
import cn from 'classnames'

interface UserMenuProps {
  username: string
  onLogout: () => void
}

function UserMenu({ username, onLogout }: UserMenuProps) {
  const [showDropdown, setShowDropdown] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleUserClick = () => {
    setShowDropdown(!showDropdown)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowDropdown(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className={styles['user-menu']} ref={dropdownRef}>
      <div className={styles['user-menu__name']} onClick={handleUserClick}>
        {username}
      </div>
      <div
        className={cn(styles['user-menu__menu'], {
          [styles['user-menu__hidden']]: !showDropdown
        })}
      >
        <ul>
          <li className={styles['user-menu__li']}>
            <button
              className={styles['user-menu__logout-button']}
              onClick={onLogout}
            >
              Выйти
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default UserMenu
