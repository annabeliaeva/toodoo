import { createContext, useContext } from 'react'
import { TaskItemType } from './interfaces'

export interface GlobalContent {
  tasks: TaskItemType[]
  setTasks: (t: TaskItemType[]) => void
  isFetching: boolean
  setIsFetching: (fetch: boolean) => void
  authedUser: string | null
  setAuthedUser: (value: string) => void
}

export const MyGlobalContext = createContext<GlobalContent>({
  tasks: [],
  setTasks: () => {},
  isFetching: false,
  setIsFetching: () => {},
  authedUser: null,
  setAuthedUser: () => {}
})

export const useGlobalContext = () => useContext(MyGlobalContext)
