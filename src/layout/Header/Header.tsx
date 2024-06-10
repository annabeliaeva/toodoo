import { useParams, useNavigate, Link } from 'react-router-dom'
import styles from './Header.module.sass'
import { getFormattedWeek } from '../../utils'
import { useGlobalContext } from '../../GlobalContent'
import cn from 'classnames'

function Header() {
  const { isFetching } = useGlobalContext()

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
      <Link style={{ textDecoration: 'none' }} to="/">
        <p className={styles['header__logo']}>TooDoo</p>
      </Link>
      <div className={styles['header__week-and-buttons']}>
        <p className={styles['header__week']}>
          {formattedDate.startDate.format('DD.MM.YY')} -{' '}
          {formattedDate.endDate.format('DD.MM.YY')}
        </p>
        <div
          className={cn(styles['header__buttons'], {
            [styles['header__buttons-disabled']]: isFetching
          })}
        >
          <img
            src="/button_left.svg"
            alt="Кнопка листания влево"
            onClick={handlePreviousWeek}
          />
          <img
            src="/button_right.svg"
            alt="Кнопка листания вправо"
            onClick={handleNextWeek}
          />
        </div>
      </div>
    </header>
  )
}

export default Header
