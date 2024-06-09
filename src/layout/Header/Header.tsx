import { useParams, useNavigate } from 'react-router-dom'
import styles from './Header.module.sass'
import { getFormattedWeek } from '../../utils'

function Header() {
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
      <p className={styles['header__logo']}>TooDoo</p>
      <div className={styles['header__week-and-buttons']}>
        <p className={styles['header__week']}>
          {formattedDate.startDate.format('DD.MM.YY')} -{' '}
          {formattedDate.endDate.format('DD.MM.YY')}
        </p>
        <div className={styles['header__buttons']}>
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
