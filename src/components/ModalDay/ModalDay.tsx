import { useEffect, useState } from 'react'
import styles from './ModalDay.module.sass' // Импорт стилей для модального окна
import cn from 'classnames'
import TaskItemModal from './TaskItemModal/TaskItemModal'
import { Moment } from 'moment'
import { TaskItemType } from '../../interfaces'

interface ModalDayProps {
  date: Moment | null
  tasks: TaskItemType[]
  onTaskItemDone: (id: string) => void
  onTaskItemRemove: (id: string) => void
  onTaskItemAdd: (data: string) => void
  updateTask: (id: string, text: string) => void
  onClose: () => void
}

function ModalDay({
  date,
  tasks,
  onTaskItemDone,
  onTaskItemRemove,
  onTaskItemAdd,
  updateTask,
  onClose
}: ModalDayProps) {
  const [isShown, setIsShown] = useState(false)

  useEffect(() => {
    if (!isShown) setIsShown(true)
  }, [])

  const initClosing = () => {
    setIsShown(false)
    setTimeout(onClose, 200)
  }

  const handleClickAdd = () => {
    if (date) onTaskItemAdd(date.format('DD.MM.YYYY'))
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
          <p className={styles['overlay__date']}>
            {date
              ?.format('dddd')
              .split('')
              .map((e, i) => (i === 0 ? e.toUpperCase() : e))
              .join('')}
          </p>
          <p className={styles['overlay__date']}>
            {date?.format('LL').slice(0, -7)}
          </p>
        </div>
        <div className={styles['overlay__spacer']} />
        <div className={styles['overlay__task-list']}>
          {tasks.map((el) => (
            <TaskItemModal
              id={el.id}
              text={el.text}
              date={el.date}
              isDone={el.isDone}
              onClickDone={() => onTaskItemDone(el.id)}
              onClickRemove={() => onTaskItemRemove(el.id)}
              updateTask={updateTask}
              key={el.id}
            />
          ))}
        </div>
        <div
          className={styles['overlay__add-task']}
          onClick={() => handleClickAdd()}
        >
          <p className={styles['overlay__add-task-text']}>Добавить задачу</p>
          <div className={styles['overlay__add-task-button']} />
        </div>
      </div>
      )
    </div>
  )
}

export default ModalDay
