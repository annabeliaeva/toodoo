import { useEffect, useState } from 'react'
import DayCard from '../../components/DayCard/DayCard'
import styles from './Body.module.sass'
import { createPortal } from 'react-dom'
import ModalDay from '../../components/ModalDay/ModalDay'
import {
  getDateFromString,
  getDaysFromWeek,
  getFormattedWeek,
  getTasksForDay
} from '../../utils'
import { useParams } from 'react-router-dom'
import { Moment } from 'moment'
import { useGlobalContext } from '../../GlobalContent'
import useLocalStorage from '../../hooks/useLocalStorage'
import { TaskItemType } from '../../interfaces'

type WeekDay = {
  date: Moment
  isDayOff: boolean
}

function Body() {
  const { tasks } = useGlobalContext()

  const [tasksData, setTasksData] = useLocalStorage<TaskItemType[]>(
    'tasks',
    tasks
  )

  const [showModal, setShowModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null)
  const [days, setDays] = useState<WeekDay[]>([])

  const { week } = useParams()

  const { ...formattedDate } = getFormattedWeek(week)

  useEffect(() => {
    fetch(
      'https://isdayoff.ru/api/getdata?' +
        new URLSearchParams({
          date1: formattedDate.startDate.format('YYYYMMDD'),
          date2: formattedDate.endDate.format('YYYYMMDD')
        }).toString()
    )
      .then((res) => res.text())
      .then((res) => {
        return res.split('').map((x, i) => ({
          date: formattedDate.startDate.clone().add(i, 'days'),
          isDayOff: +x === 1
        }))
      })
      .then(setDays)
  }, [formattedDate.weekNumber])

  const handleClickDayCard = (date: Moment) => {
    setSelectedDate(date)
    setShowModal(true)
  }

  const onClickTaskDone = (id: string) => {
    const updatedTasksData = tasksData.map((task: TaskItemType) =>
      task.id === id ? { ...task, isDone: !task.isDone } : task
    )
    setTasksData(updatedTasksData)
  }

  return (
    <section className={styles['body']}>
      {days.slice(0, 5).map((el) => (
        <DayCard
          date={el.date}
          onClick={handleClickDayCard}
          isDayOff={el.isDayOff}
          tasks={getTasksForDay(tasksData, el.date)}
          onClickTaskDone={onClickTaskDone}
        />
      ))}
      <div className={styles['body__days-off']}>
        {days.slice(5, 7).map((el) => (
          <DayCard
            date={el.date}
            onClick={handleClickDayCard}
            isDayOff={el.isDayOff}
            tasks={getTasksForDay(tasksData, el.date)}
            onClickTaskDone={onClickTaskDone}
          />
        ))}
      </div>
      {showModal &&
        createPortal(
          <ModalDay date={selectedDate} onClose={() => setShowModal(false)} />,
          document.body
        )}
    </section>
  )
}

export default Body
