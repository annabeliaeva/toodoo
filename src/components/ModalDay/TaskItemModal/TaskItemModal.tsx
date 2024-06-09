import { TaskItemProps } from '../../DayCard/TaskItem/TaskItem'
import styles from './TaskItemModal.module.sass'
import cn from 'classnames'

function TaskItemModal(props: TaskItemProps) {
  const { taskText, isDone, onClickDone } = props

  const clickButtonDone = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    onClickDone()
  }

  return (
    <div
      className={cn(styles['task-item'], {
        [styles['task-item__inactive']]: isDone
      })}
    >
      <p contentEditable className={styles['task-item__text']}>
        {taskText}
      </p>
      <div className={styles['task-item__buttons']}>
        <div className={styles['task-item__buttons-remove-button']}></div>
        <div
          onClick={clickButtonDone}
          className={styles['task-item__buttons-done-button']}
        ></div>
      </div>
    </div>
  )
}

export default TaskItemModal
