import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../../components/SearchBar/SearchBar'
import FilterBar, { type FilterConfig } from '../../components/FilterBar/FilterBar'
import { mockInsuranceProducts, mockCategories, mockSubjects, mockInsurers } from '../../mocks/insurance'
import styles from './InsurancePage.module.css'

export default function InsurancePage() {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [filters, setFilters] = useState<Record<string, string>>({})

  const filterConfigs: FilterConfig[] = [
    { key: 'category', placeholder: '保险种类', options: mockCategories.map((c) => ({ label: c, value: c })) },
    { key: 'subject', placeholder: '保险标的', options: mockSubjects.map((s) => ({ label: s, value: s })) },
    { key: 'insurer', placeholder: '保险公司', options: mockInsurers.map((i) => ({ label: i, value: i })) },
  ]

  const list = useMemo(() => {
    return mockInsuranceProducts.filter((item) => {
      const matchKeyword = !keyword || [item.name, item.insurer, item.summary].join(' ').toLowerCase().includes(keyword.toLowerCase())
      const matchCategory = !filters.category || item.category === filters.category
      const matchSubject = !filters.subject || item.subject === filters.subject
      const matchInsurer = !filters.insurer || item.insurer === filters.insurer
      return matchKeyword && matchCategory && matchSubject && matchInsurer
    })
  }, [keyword, filters])

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.eyebrow}>物流保险 · 移动投保</span>
        <h1 className={styles.pageTitle}>投保</h1>
        <p className={styles.pageSubtitle}>为物流企业精选高匹配度保险方案，支持快速投保与咨询</p>
      </section>

      <div className={styles.searchSection}>
        <SearchBar placeholder="搜索产品名称、保险公司、保障说明" onChange={setKeyword} />
        <FilterBar filters={filterConfigs} values={filters} onChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))} />
      </div>

      <div className={styles.list}>
        {list.map((item) => (
          <button key={item.id} className={styles.card} onClick={() => navigate(`/insurance/${item.id}`)}>
            <div className={styles.cardHead}>
              <div>
                <span className={styles.insurer}>{item.insurer}</span>
                <h2 className={styles.cardTitle}>{item.name}</h2>
              </div>
              <span className={styles.price}>¥{item.priceFrom}<small>/年起</small></span>
            </div>
            <p className={styles.summary}>{item.summary}</p>
            <div className={styles.tagRow}>
              {item.tags.map((t) => <span key={t} className={styles.tag}>{t}</span>)}
            </div>
            <div className={styles.coverageRow}>
              <span>{item.category} · {item.subject}</span>
              <strong>{item.minCoverage}-{item.maxCoverage}万保额</strong>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
