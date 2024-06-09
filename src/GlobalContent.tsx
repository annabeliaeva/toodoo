import { createContext, useContext } from 'react'
import { TaskItemType } from './interfaces'

export interface GlobalContent {
  tasks: TaskItemType[]
  setTasks: (t: TaskItemType[]) => void
  isFetching: boolean
}

export const MyGlobalContext = createContext<GlobalContent>({
  tasks: [],
  setTasks: () => {},
  isFetching: false
})

export const useGlobalContext = () => useContext(MyGlobalContext)
