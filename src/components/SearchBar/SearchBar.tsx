import { useEffect, useRef, useState } from 'react'
import styles from './SearchBar.module.css'

interface SearchBarProps {
  placeholder?: string
  value?: string
  onChange: (value: string) => void
  debounceMs?: number
}

export default function SearchBar({
  placeholder = '搜索',
  value = '',
  onChange,
  debounceMs = 300,
}: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    setLocalValue(v)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => onChange(v), debounceMs)
  }

  const handleClear = () => {
    setLocalValue('')
    onChange('')
  }

  return (
    <div className={styles.wrapper}>
      <span className={styles.searchIcon}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="6.5" cy="6.5" r="4.5" stroke="rgba(0,0,0,0.48)" strokeWidth="1.5" />
          <path d="M10 10l3 3" stroke="rgba(0,0,0,0.48)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </span>
      <input
        className={styles.input}
        type="search"
        placeholder={placeholder}
        value={localValue}
        onChange={handleChange}
        autoComplete="off"
      />
      {localValue && (
        <button className={styles.clearBtn} onClick={handleClear} aria-label="清除搜索">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" fill="rgba(0,0,0,0.18)" />
            <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  )
}
