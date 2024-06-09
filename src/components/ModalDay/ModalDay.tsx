import { useEffect, useState } from 'react'
import styles from './ModalDay.module.sass' // Импорт стилей для модального окна
import cn from 'classnames'
import TaskItemModal from './TaskItemModal/TaskItemModal'
import { Moment } from 'moment'
import { useGlobalContext } from '../../GlobalContent'
import useLocalStorage from '../../hooks/useLocalStorage'
import { TaskItemType } from '../../interfaces'
import { getTasksForDay } from '../../utils'

interface ModalDayProps {
  date: Moment
  onClose: () => void
}

function ModalDay({ date, onClose }: ModalDayProps) {
  const { tasks } = useGlobalContext()

  const [tasksData, setTasksData] = useLocalStorage<TaskItemType[]>(
    'tasks',
    tasks
  )

  const tasksForDay = getTasksForDay(tasksData, date)

  const [isShown, setIsShown] = useState(false)

  useEffect(() => {
    if (!isShown) setIsShown(true)
  }, [])

  const initClosing = () => {
    setIsShown(false)
    setTimeout(onClose, 200)
  }

  return (
    <div className={styles['overlay']} onClick={initClosing}>
      (
      <div
        className={cn(styles['overlay__content'], {
          [styles['overlay__content-opened']]: isShown
        })}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles['overlay__header']}>
          <p className={styles['overlay__date']}>Понедельник</p>
          <p className={styles['overlay__date']}>3 июня</p>
        </div>
        <div className={styles['overlay__spacer']} />
        <div className={styles['overlay__task-list']}>
          {tasksForDay.map((el) => (
            <TaskItemModal
              taskText={el.text}
              isDone={el.isDone}
              onClickDone={() => {}}
              key={el.id}
            />
          ))}
        </div>
        <div className={styles['overlay__add-task']}>
          <p className={styles['overlay__add-task-text']}>Добавить задачу</p>
          <div className={styles['overlay__add-task-button']} />
        </div>
      </div>
      )
    </div>
  )
}

export default ModalDay
