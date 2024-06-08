import DayCard from '../../components/DayCard/DayCard'
import styles from './Body.module.sass'


function Body() {

  const daysArr = new Array(5).fill(0)
  const daysOffArr = new Array(2).fill(0)

  return (
   <div className={styles['body']}>
    {daysArr.map(el =>  <DayCard/>)}
    <div className={styles['body__days-off']}>
    {daysOffArr.map(el =>  <DayCard/>)}
    </div>
   </div>
  )
}

export default Body
