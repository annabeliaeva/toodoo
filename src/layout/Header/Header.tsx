import styles from './Header.module.sass'


function Header() {
  return (
    <header className={styles['header']}>
      <p className={styles['header__logo']}>TooDoo</p>
      <div className={styles['header__week-and-buttons']}>
        <p className={styles['header__week']}>03.06.24-09.06.24</p>
        <div className={styles['header__buttons']}>
          <img src='button_left.svg' alt='Кнопка листания влево'/>
          <img src='button_right.svg' alt='Кнопка листания вправо'/>
        </div>
      </div>
    </header>
  )
}

export default Header
