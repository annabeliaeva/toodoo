import { useState } from 'react'
import DayCard from '../../components/DayCard/DayCard'
import styles from './Body.module.sass'
import { createPortal } from 'react-dom'
import ModalDay from '../../components/ModalDay/ModalDay'

function Body() {
  const daysArr = new Array(5).fill(0)
  const daysOffArr = new Array(2).fill(0)

  const [showModal, setShowModal] = useState(false)

  return (
    <section className={styles['body']}>
      {daysArr.map((el) => (
        <DayCard onClick={() => setShowModal(true)} />
      ))}
      <div className={styles['body__days-off']}>
        {daysOffArr.map((el) => (
          <DayCard onClick={() => setShowModal(true)} />
        ))}
      </div>
      {showModal &&
        createPortal(
          <ModalDay onClose={() => setShowModal(false)} />,
          document.body
        )}
    </section>
  )
}

export default Body
