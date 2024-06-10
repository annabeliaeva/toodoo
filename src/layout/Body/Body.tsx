import { useEffect, useState } from 'react'
import DayCard from '../../components/DayCard/DayCard'
import styles from './Body.module.sass'
import { createPortal } from 'react-dom'
import ModalDay from '../../components/ModalDay/ModalDay'
import { getFormattedWeek, getTasksForDay } from '../../utils'
import { useParams } from 'react-router-dom'
import { Moment } from 'moment'
import { useGlobalContext } from '../../GlobalContent'
import useLocalStorage from '../../hooks/useLocalStorage'
import { TaskItemType } from '../../interfaces'
import DayCardSkeleton from '../../components/DayCardSkeleton/DayCardSkeleton'
import { v4 as uuidv4 } from 'uuid'

type WeekDay = {
  date: Moment
  isDayOff: boolean
}

function Body() {
  const { tasks, isFetching, setIsFetching } = useGlobalContext()

  const [tasksData, setTasksData] = useLocalStorage<TaskItemType[]>(
    'tasks',
    tasks
  )

  const [showModal, setShowModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null)
  const [days, setDays] = useState<WeekDay[]>([])

  const { week } = useParams()
  const formattedDate = getFormattedWeek(week)

  useEffect(() => {
    if (isFetching) return
    setIsFetching(true)
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
      .finally(() => setIsFetching(false))
  }, [week])

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

  const onClickTaskRemove = (id: string) => {
    const updatedTasksData = tasksData.filter(
      (task: TaskItemType) => task.id !== id
    )
    setTasksData(updatedTasksData)
  }

  const onClickTaskItemAdd = (date: string) => {
    const updatedTasksData = [
      ...tasksData,
      {
        id: uuidv4(),
        date: date,
        text: '',
        isDone: false
      }
    ]
    setTasksData(updatedTasksData)
  }

  const handleUpdateTask = (id: string, text: string) => {
    let updatedTasksData = []
    if (text === '') {
      updatedTasksData = tasksData.filter(
        (task: TaskItemType) => task.id !== id
      )
    } else {
      updatedTasksData = tasksData.map((task: TaskItemType) =>
        task.id === id ? { ...task, text: text } : task
      )
    }
    setTasksData(updatedTasksData)
  }

  return (
    <section className={styles['body']}>
      {!isFetching
        ? days
            .slice(0, 5)
            .map((el, i) => (
              <DayCard
                key={i}
                date={el.date}
                onClick={handleClickDayCard}
                isDayOff={el.isDayOff}
                tasks={getTasksForDay(tasksData, el.date)}
                onClickTaskDone={onClickTaskDone}
              />
            ))
        : new Array(5).fill(1).map((_, i) => <DayCardSkeleton key={i} />)}
      <div className={styles['body__days-off']}>
        {!isFetching
          ? days
              .slice(5, 7)
              .map((el, i) => (
                <DayCard
                  key={i}
                  date={el.date}
                  onClick={handleClickDayCard}
                  isDayOff={el.isDayOff}
                  tasks={getTasksForDay(tasksData, el.date)}
                  onClickTaskDone={onClickTaskDone}
                />
              ))
          : new Array(2).fill(1).map((_, i) => <DayCardSkeleton key={i + 5} />)}
      </div>
      {showModal &&
        createPortal(
          <ModalDay
            date={selectedDate}
            tasks={getTasksForDay(tasksData, selectedDate)}
            onTaskItemDone={onClickTaskDone}
            onTaskItemRemove={onClickTaskRemove}
            onTaskItemAdd={onClickTaskItemAdd}
            updateTask={handleUpdateTask}
            onClose={() => setShowModal(false)}
          />,
          document.body
        )}
    </section>
  )
}

export default Body
