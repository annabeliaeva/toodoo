import { useParams, useNavigate, Link } from 'react-router-dom'
import styles from './Header.module.sass'
import { getFormattedWeek } from '../../utils'
import { useGlobalContext } from '../../GlobalContent'
import cn from 'classnames'
import UserMenu from '../../components/UserMenu/UserMenu'

function Header() {
  const { isFetching, authedUser, setAuthedUser } = useGlobalContext()

  const { week } = useParams()
  const navigate = useNavigate()

  const { ...formattedDate } = getFormattedWeek(week)

  const handleNextWeek = () => {
    navigate(`/week/${formattedDate.weekNumber + 1}`)
  }

  const handlePreviousWeek = () => {
    navigate(`/week/${formattedDate.weekNumber - 1}`)
  }

  return (
    <header className={styles['header']}>
      <Link className={styles['header__link']} to="/">
        <p className={styles['header__logo']}>TooDoo</p>
      </Link>
      <div className={styles['header__week-and-buttons']}>
        <p className={styles['header__week']}>
          {formattedDate.startDate.format('DD.MM.YY')} -{' '}
          {formattedDate.endDate.format('DD.MM.YY')}
        </p>
        <img
          className={cn(styles['header__button-left'], {
            [styles['header__disabled']]: isFetching
          })}
          src="/button_left.svg"
          alt="Кнопка листания влево"
          onClick={handlePreviousWeek}
        />
        <img
          className={cn(styles['header__button-right'], {
            [styles['header__disabled']]: isFetching
          })}
          src="/button_right.svg"
          alt="Кнопка листания вправо"
          onClick={handleNextWeek}
        />
      </div>
      <UserMenu
        username={authedUser!}
        onLogout={() => {
          setAuthedUser('')
        }}
      />
    </header>
  )
}

export default Header
