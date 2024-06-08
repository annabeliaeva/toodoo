import styles from './TaskItem.module.sass'
import cn from 'classnames'

type TaskItemProps = {
	taskText: string,
	isDone: boolean
}

function TaskItem(props: TaskItemProps) {

	const {taskText, isDone} = props

  return (
   <div className={styles['task-item']}>
	<p className={cn(styles['task-item__text'], {
		[styles['task-item__inactive']]: isDone}
	)}>
		{taskText}
	</p>
	<div className={cn(styles['task-item__button'], { 
		[styles['task-item__button-undone']]: isDone,
	})}>
	</div>
   </div>
  )
}

export default TaskItem
