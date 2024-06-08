import styles from './DayCard.module.sass'
import TaskItem from './TaskItem/TaskItem'

function DayCard() {
	
  return (
   <div className={styles['day-card']}>
	<div className={styles['day-card__date-section']}>
		<p className={styles['day-card__week-day']}>
			ПН
		</p>
		<p className={styles['day-card__date']}>
			03.06
		</p>
	</div>
	<div className={styles['day-card__spacer']}/>
	<div className={styles['day-card__task-list']}>
		<TaskItem taskText={'Сделать зарядку'} isDone={true}/>
		<TaskItem taskText={'Анжумания'} isDone={false}/>
		<TaskItem taskText={'Пресс качат'} isDone={true}/>
		</div>
   </div>
  )
}

export default DayCard
