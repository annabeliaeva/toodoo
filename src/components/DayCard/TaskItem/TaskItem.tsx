import styles from './TaskItem.module.sass'
import cn from 'classnames'

export interface TaskItemProps {
  taskText: string
  isDone: boolean
  onClickDone: () => void
}

function TaskItem(props: TaskItemProps) {
  const { taskText, isDone, onClickDone } = props

  const clickButtonDone = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    onClickDone()
  }

  return (
    <div className={styles['task-item']}>
      <div className={styles['task-item__wrapper']}>
        <p
          className={cn(styles['task-item__wrapper-text'], {
            [styles['task-item__wrapper-inactive']]: isDone
          })}
        >
          {taskText}
        </p>
        <div
          onClick={clickButtonDone}
          className={cn(styles['task-item__wrapper-button'], {
            [styles['task-item__wrapper-button-undone']]: isDone
          })}
        ></div>
      </div>
      <div className={styles['task-item__spacer']}></div>
    </div>
  )
}

export default TaskItem
