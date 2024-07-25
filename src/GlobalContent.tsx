import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
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

interface GlobalProviderProps {
  children: ReactNode
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [authedUser, setAuthedUser] = useState<string | null>(() => {
    return localStorage.getItem('authedUser')
  })
  const [tasks, setTasks] = useState<TaskItemType[]>([])

  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    if (authedUser) {
      localStorage.setItem('authedUser', authedUser)
    } else {
      localStorage.removeItem('authedUser')
    }
  }, [authedUser])

  return (
    <MyGlobalContext.Provider
      value={{
        tasks,
        setTasks,
        isFetching,
        setIsFetching,
        authedUser,
        setAuthedUser
      }}
    >
      {children}
    </MyGlobalContext.Provider>
  )
}
