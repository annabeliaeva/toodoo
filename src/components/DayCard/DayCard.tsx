import styles from './DayCard.module.sass'
import TaskItem from './TaskItem/TaskItem'
import { TaskItemType } from '../../interfaces'
import { Moment } from 'moment'
import { getRusDayOfWeek, getTasksForDay } from '../../utils'
import cn from 'classnames'

interface DayCardProps {
  date: Moment
  isDayOff: boolean
  onClick: (date: Moment) => void
  tasks: TaskItemType[]
  onClickTaskDone: (id: string) => void
}

function DayCard({
  date,
  isDayOff,
  onClick,
  tasks,
  onClickTaskDone
}: DayCardProps) {
  return (
    <div
      className={cn(styles['day-card'], {
        [styles['day-card-day-off']]: isDayOff
      })}
      onClick={() => onClick(date)}
    >
      <div className={styles['day-card__date-section']}>
        <p className={styles['day-card__week-day']}>{getRusDayOfWeek(date)}</p>
        <p className={styles['day-card__date']}>{date.format('DD.MM')}</p>
      </div>
      <div className={styles['day-card__spacer']} />
      <div className={styles['day-card__task-list']}>
        {getTasksForDay(tasks, date).map((el: TaskItemType) => (
          <TaskItem
            key={el.id}
            taskText={el.text}
            isDone={el.isDone}
            onClickDone={() => onClickTaskDone(el.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default DayCard
