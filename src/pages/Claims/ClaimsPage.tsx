import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../../components/SearchBar/SearchBar'
import FilterBar, { type FilterConfig } from '../../components/FilterBar/FilterBar'
import { mockClaims, mockClaimTypes } from '../../mocks/claims'
import { mockCategories } from '../../mocks/insurance'
import styles from './ClaimsPage.module.css'

export default function ClaimsPage() {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [filters, setFilters] = useState<Record<string, string>>({})

  const insuredNames = Array.from(new Set(mockClaims.map((c) => c.insuredName)))
  const filterConfigs: FilterConfig[] = [
    { key: 'category', placeholder: '保险种类', options: mockCategories.map((c) => ({ label: c, value: c })) },
    { key: 'insuredName', placeholder: '被保险人', options: insuredNames.map((n) => ({ label: n, value: n })) },
    { key: 'claimType', placeholder: '理赔类型', options: mockClaimTypes.map((t) => ({ label: t, value: t })) },
  ]

  const list = useMemo(() => {
    return mockClaims.filter((item) => {
      const matchKeyword = !keyword || [item.claimNo, item.insuredName, item.policyNo].join(' ').toLowerCase().includes(keyword.toLowerCase())
      const matchCategory = !filters.category || item.category === filters.category
      const matchInsured = !filters.insuredName || item.insuredName === filters.insuredName
      const matchType = !filters.claimType || item.claimType === filters.claimType
      return matchKeyword && matchCategory && matchInsured && matchType
    })
  }, [keyword, filters])

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.pageTitle}>理赔</h1>
        <p className={styles.pageSubtitle}>随时跟进理赔进度，在线提交资料，高效完成理赔流程</p>
        <button className={styles.primaryAction} onClick={() => navigate('/claims/new')}>
          新建理赔申请
        </button>
      </section>

      <div className={styles.searchSection}>
        <SearchBar placeholder="搜索报案号、被保险人、保单号" onChange={setKeyword} />
        <FilterBar filters={filterConfigs} values={filters} onChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))} />
      </div>

      <div className={styles.list}>
        {list.map((item) => (
          <button key={item.id} className={styles.card} onClick={() => navigate(`/claims/${item.id}`)}>
            <div className={styles.cardTop}>
              <div>
                <h2 className={styles.claimNo}>{item.claimNo}</h2>
                <p className={styles.claimMeta}>{item.insuredName} · {item.claimType}</p>
              </div>
              <span className={`${styles.statusTag} ${styles[item.status]}`}>{getStatusLabel(item.status)}</span>
            </div>
            <div className={styles.progressBar}>
              <span className={styles.progressInner} style={{ width: `${item.progress}%` }} />
            </div>
            <div className={styles.cardFooter}>
              <span>报案时间 {item.reportDate}</span>
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
    case 'pending': return '待处理'
    case 'reviewing': return '审核中'
    case 'approved': return '已核赔'
    case 'paid': return '已赔付'
    case 'rejected': return '已拒赔'
    default: return status
  }
}
