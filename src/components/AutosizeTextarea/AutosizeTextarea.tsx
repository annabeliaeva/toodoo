import cn from 'classnames'
import styles from './AutosizeTextarea.module.sass'
import { KeyboardEvent } from 'react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

interface AutosizeTextareaProps {
  className?: string
  text: string
  updateText: (text: string) => void
}

function AutosizeTextarea({
  className,
  text,
  updateText
}: AutosizeTextareaProps) {
  const [textData, setTextData] = useState(text)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [textData])

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextData(event.target.value)
  }

  const handleBlur = () => {
    updateText(textData)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      updateText(textData)
    }
  }

  return (
    <textarea
      ref={textareaRef}
      value={textData}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      className={cn(className, styles['textarea'])}
      rows={1}
    ></textarea>
  )
}

export default AutosizeTextarea
