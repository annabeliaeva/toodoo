import styles from './DayCard.module.sass'
import TaskItem from './TaskItem/TaskItem'
import { v4 as uuidv4 } from 'uuid'
import useLocalStorage from '../../hooks/useLocalStorage'
import ModalDay from '../ModalDay/ModalDay'
import { useState } from 'react'

interface TaskItemType {
  id: string
  date: Date
  text: string
  isDone: boolean
}

interface DayCardProps {
  onClick: () => void
}

function DayCard({ onClick }: DayCardProps) {
  const [tasksData, setTasksData] = useLocalStorage<TaskItemType[]>('tasks', [
    {
      id: uuidv4(),
      date: new Date('Jun 3, 2024'),
      text: 'Зарядка',
      isDone: false
    },
    {
      id: uuidv4(),
      date: new Date('Jun 3, 2024'),
      text: 'Прогулка с собакой',
      isDone: false
    },
    {
      id: uuidv4(),
      date: new Date('Jun 3, 2024'),
      text: 'Выпить лекарства',
      isDone: true
    },
    {
      id: uuidv4(),
      date: new Date('Jun 3, 2024'),
      text: 'Позавтракать',
      isDone: true
    },
    {
      id: uuidv4(),
      date: new Date('Jun 4, 2024'),
      text: 'Работа',
      isDone: true
    },
    {
      id: uuidv4(),
      date: new Date('Jun 5, 2024'),
      text: 'Купить продукты',
      isDone: true
    },
    {
      id: uuidv4(),
      date: new Date('Jun 5, 2024'),
      text: 'Съесть фрукты',
      isDone: true
    },
    {
      id: uuidv4(),
      date: new Date('Jun 7, 2024'),
      text: 'Ничего не делать',
      isDone: true
    },
    {
      id: uuidv4(),
      date: new Date('Jun 8, 2024'),
      text: 'Спать',
      isDone: false
    }
  ])

  const onClickTaskDone = (id: string) => {
    const updatedTasksData = tasksData.map((task) =>
      task.id === id ? { ...task, isDone: !task.isDone } : task
    )
    setTasksData(updatedTasksData)
  }

  return (
    <div className={styles['day-card']} onClick={onClick}>
      <div className={styles['day-card__date-section']}>
        <p className={styles['day-card__week-day']}>ПН</p>
        <p className={styles['day-card__date']}>03.06</p>
      </div>
      <div className={styles['day-card__spacer']} />
      <div className={styles['day-card__task-list']}>
        {tasksData.map((el) => (
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
