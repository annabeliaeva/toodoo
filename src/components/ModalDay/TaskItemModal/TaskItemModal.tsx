import styles from './TaskItemModal.module.sass'
import cn from 'classnames'
import AutosizeTextarea from '../../AutosizeTextarea/AutosizeTextarea'
import { useEffect } from 'react'

interface TaskItemModalProps {
  text: string
  id: string
  date: string
  isDone: boolean
  onClickDone: () => void
  onClickRemove: () => void
  updateTask: (id: string, text: string) => void
}

function TaskItemModal(props: TaskItemModalProps) {
  const { text, id, isDone, onClickDone, onClickRemove, updateTask } = props

  const clickButtonDone = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    onClickDone()
  }

  const clickButtonRemove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation()
    onClickRemove()
  }

  const handleUpdateText = (text: string) => {
    updateTask(id, text)
  }

  useEffect(() => {
    if (props.text) handleUpdateText(props.text)
  }, [])

  return (
    <div
      className={cn(styles['task-item'], {
        [styles['task-item__inactive']]: isDone
      })}
    >
      <AutosizeTextarea
        text={text}
        className={styles['task-item__text']}
        updateText={handleUpdateText}
      />
      <div className={styles['task-item__buttons']}>
        <div
          onClick={clickButtonRemove}
          className={styles['task-item__buttons-remove-button']}
        ></div>
        <div
          onClick={clickButtonDone}
          className={styles['task-item__buttons-done-button']}
        ></div>
      </div>
    </div>
  )
}

export default TaskItemModal
