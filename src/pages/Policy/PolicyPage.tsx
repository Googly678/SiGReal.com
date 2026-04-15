import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../../components/SearchBar/SearchBar'
import FilterBar, { type FilterConfig } from '../../components/FilterBar/FilterBar'
import { mockPolicies } from '../../mocks/policy'
import { mockCategories, mockSubjects, mockInsurers } from '../../mocks/insurance'
import styles from './PolicyPage.module.css'

export default function PolicyPage() {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [filters, setFilters] = useState<Record<string, string>>({})

  const filterConfigs: FilterConfig[] = [
    { key: 'category', placeholder: '保险种类', options: mockCategories.map((c) => ({ label: c, value: c })) },
    { key: 'subject', placeholder: '保险标的', options: mockSubjects.map((s) => ({ label: s, value: s })) },
    { key: 'insurer', placeholder: '保险公司', options: mockInsurers.map((i) => ({ label: i, value: i })) },
  ]

  const list = useMemo(() => {
    return mockPolicies.filter((p) => {
      const matchKeyword = !keyword || [p.policyNo, p.productName, p.insuredName].join(' ').toLowerCase().includes(keyword.toLowerCase())
      const matchCategory = !filters.category || p.category === filters.category
      const matchSubject = !filters.subject || p.subject === filters.subject
      const matchInsurer = !filters.insurer || p.insurer === filters.insurer
      return matchKeyword && matchCategory && matchSubject && matchInsurer
    })
  }, [keyword, filters])

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>保单</h1>
        <p className={styles.pageSubtitle}>查看企业全部已购保单，掌握保额使用与历史理赔记录</p>
      </div>

      <div className={styles.searchSection}>
        <SearchBar placeholder="搜索保单号、产品名称、被保险人" onChange={setKeyword} />
        <FilterBar filters={filterConfigs} values={filters} onChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))} />
      </div>

      <div className={styles.list}>
        {list.map((p) => (
          <button key={p.id} className={styles.card} onClick={() => navigate(`/policy/${p.id}`)}>
            <div className={styles.cardTop}>
              <div>
                <h2 className={styles.cardTitle}>{p.productName}</h2>
                <p className={styles.cardMeta}>{p.policyNo}</p>
              </div>
              <span className={`${styles.statusTag} ${styles[p.status]}`}>{getStatusLabel(p.status)}</span>
            </div>
            <div className={styles.infoRow}><span>保险公司</span><strong>{p.insurer}</strong></div>
            <div className={styles.infoRow}><span>被保险人</span><strong>{p.insuredName}</strong></div>
            <div className={styles.infoRow}><span>保额 / 剩余保额</span><strong>{p.coverage}万 / {p.remainingCoverage}万</strong></div>
            <div className={styles.cardFooter}>
              <span>{p.startDate} - {p.endDate}</span>
              <span className={styles.arrow}>查看详情</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function getStatusLabel(status: string) {
  switch (status) {
    case 'active': return '有效'
    case 'expired': return '已到期'
    case 'pending': return '待生效'
    case 'cancelled': return '已作废'
    default: return status
  }
}
