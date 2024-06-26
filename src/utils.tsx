import moment, { Moment } from 'moment'
import { TaskItemType } from './interfaces'
import 'moment/dist/locale/ru'

moment.locale('ru')

export const getFormattedWeek = (week: string | undefined) => {
  const now = moment()
  const year = now.year()

  let weekNumber = now.isoWeek()

  if (week) {
    weekNumber = parseInt(week, 10)
  }

  const startDate = moment().year(year).isoWeek(weekNumber).startOf('isoWeek')
  const endDate = startDate.clone().endOf('isoWeek')

  return {
    startDate: startDate,
    endDate: endDate,
    weekNumber: weekNumber
  }
}

export const getDateFromString = (date: string) => {
  return moment(
    new Date(
      parseInt(date.slice(6, 10)),
      parseInt(date.slice(3, 5)) - 1,
      parseInt(date.slice(0, 2))
    )
  )
}

export const getDaysFromWeek = (startDate: Moment, endDate: Moment) => {
  const weekDates = []
  let current = startDate.clone()

  while (current.isBefore(endDate)) {
    weekDates.push(current.format('DD.MM.YYYY'))
    current.add(1, 'days')
  }
  const weekDays = weekDates.slice(0, 5)
  const weekEnds = weekDates.slice(5, 7)
  return [weekDays, weekEnds]
}

export const getTasksForDay = (
  tasksData: TaskItemType[],
  date: Moment | null
) => {
  if (!date) return []
  return tasksData.filter(
    (el: TaskItemType) => el.date === date.format('DD.MM.YYYY')
  )
}

export const getRusDayOfWeek = (date: Moment) => {
  return moment(date, 'DD.MM.YYYY').locale('ru').format('dd').toUpperCase()
}
