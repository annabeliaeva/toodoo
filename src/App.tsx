import { useState } from 'react'
import './App.sass'
import { TaskItemType } from './interfaces'
import Body from './layout/Body/Body'
import Header from './layout/Header/Header'
import { MyGlobalContext } from './GlobalContent'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [tasks, setTasks] = useState<TaskItemType[]>([
    {
      id: uuidv4(),
      date: '03.06.24',
      text: 'Зарядка',
      isDone: false
    },
    {
      id: uuidv4(),
      date: '03.06.2024',
      text: 'Прогулка с собакой',
      isDone: false
    },
    {
      id: uuidv4(),
      date: '06.06.2024',
      text: 'Выпить лекарства',
      isDone: true
    },
    {
      id: uuidv4(),
      date: '06.06.2024',
      text: 'Позавтракать',
      isDone: true
    },
    {
      id: uuidv4(),
      date: '06.06.2024',
      text: 'Работа',
      isDone: true
    },
    {
      id: uuidv4(),
      date: '07.06.2024',
      text: 'Купить продукты',
      isDone: true
    },
    {
      id: uuidv4(),
      date: '03.06.2024',
      text: 'Съесть фрукты',
      isDone: true
    },
    {
      id: uuidv4(),
      date: '04.06.2024',
      text: 'Ничего не делать',
      isDone: true
    },
    {
      id: uuidv4(),
      date: '05.06.2024',
      text: 'Спать',
      isDone: false
    }
  ])

  return (
    <MyGlobalContext.Provider value={{ tasks, setTasks, isFetching: false }}>
      <div className="app">
        <Header />
        <Body />
      </div>
    </MyGlobalContext.Provider>
  )
}

export default App
