import { createContext, useContext } from 'react'
import { TaskItemType } from './interfaces'

export interface GlobalContent {
  tasks: TaskItemType[]
  setTasks: (t: TaskItemType[]) => void
  isFetching: boolean
  setIsFetching: (fetch: boolean) => void
}

export const MyGlobalContext = createContext<GlobalContent>({
  tasks: [],
  setTasks: () => {},
  isFetching: false,
  setIsFetching: () => {}
})

export const useGlobalContext = () => useContext(MyGlobalContext)
