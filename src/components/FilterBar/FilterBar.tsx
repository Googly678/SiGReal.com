import { useState } from 'react'
import styles from './FilterBar.module.css'

export interface FilterOption {
  label: string
  value: string
}

export interface FilterConfig {
  key: string
  placeholder: string
  options: FilterOption[]
}

interface FilterBarProps {
  filters: FilterConfig[]
  values: Record<string, string>
  onChange: (key: string, value: string) => void
}

interface SheetState {
  key: string
  label: string
  options: FilterOption[]
  selected: string
}

export default function FilterBar({ filters, values, onChange }: FilterBarProps) {
  const [sheet, setSheet] = useState<SheetState | null>(null)

  const openSheet = (f: FilterConfig) => {
    setSheet({ key: f.key, label: f.placeholder, options: f.options, selected: values[f.key] ?? '' })
  }

  const selectOption = (value: string) => {
    if (!sheet) return
    const newVal = values[sheet.key] === value ? '' : value
    onChange(sheet.key, newVal)
    setSheet(null)
  }

  return (
    <>
      <div className={styles.bar}>
        {filters.map((f) => {
          const selected = values[f.key]
          const label = selected
            ? (f.options.find((o) => o.value === selected)?.label ?? f.placeholder)
            : f.placeholder
          return (
            <button
              key={f.key}
              className={`${styles.chip} ${selected ? styles.chipActive : ''}`}
              onClick={() => openSheet(f)}
            >
              <span>{label}</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )
        })}
      </div>

      {/* Bottom Sheet */}
      {sheet && (
        <div className={styles.overlay} onClick={() => setSheet(null)}>
          <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
            <div className={styles.sheetHandle} />
            <div className={styles.sheetHeader}>
              <span>{sheet.label}</span>
              <button className={styles.sheetClose} onClick={() => setSheet(null)}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 5l10 10M15 5L5 15" stroke="rgba(0,0,0,0.48)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className={styles.sheetOptions}>
              <button
                className={`${styles.option} ${!sheet.selected ? styles.optionActive : ''}`}
                onClick={() => selectOption('')}
              >
                <span>全部</span>
                {!sheet.selected && <CheckIcon />}
              </button>
              {sheet.options.map((opt) => (
                <button
                  key={opt.value}
                  className={`${styles.option} ${sheet.selected === opt.value ? styles.optionActive : ''}`}
                  onClick={() => selectOption(opt.value)}
                >
                  <span>{opt.label}</span>
                  {sheet.selected === opt.value && <CheckIcon />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M3.5 9l4 4 7-7" stroke="var(--color-terracotta)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
