import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PageHeader from '../../components/PageHeader/PageHeader'
import MandatoryReadModal from '../../components/MandatoryReadModal/MandatoryReadModal'
import { mockInsuranceDetails } from '../../mocks/insurance'
import { useIMStore } from '../../store/im'
import styles from './InsuranceDetailPage.module.css'

const TABS = [
  { key: 'introduction', label: '介绍' },
  { key: 'coverage', label: '保额' },
  { key: 'notice', label: '投保须知' },
  { key: 'specialTerms', label: '特约条款' },
  { key: 'disclosure', label: '告知' },
  { key: 'samplePolicyUrl', label: '示例保单' },
] as const

type TabKey = typeof TABS[number]['key']

export default function InsuranceDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const openIM = useIMStore((s) => s.openIM)
  const [activeTab, setActiveTab] = useState<TabKey>('introduction')
  const [showReadModal, setShowReadModal] = useState(false)

  const detail = useMemo(() => (id ? mockInsuranceDetails[id] : undefined), [id])
  if (!detail) return <div>产品不存在</div>

  return (
    <div className={styles.page}>
      <PageHeader title="保险详情" showBack />
      <div className={styles.content}>
        <section className={styles.heroCard}>
          <span className={styles.insurer}>{detail.insurer}</span>
          <h2 className={styles.productName}>{detail.name}</h2>
          <p className={styles.summary}>{detail.summary}</p>
          <div className={styles.heroMeta}>
            <span>{detail.category}</span>
            <span>{detail.subject}</span>
            <strong>{detail.minCoverage}-{detail.maxCoverage}万</strong>
          </div>
        </section>

        <div className={styles.tabBar}>
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`${styles.tabBtn} ${activeTab === tab.key ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <section className={styles.tabContent}>
          {activeTab === 'samplePolicyUrl' ? (
            <a className={styles.sampleLink} href={detail.samplePolicyUrl} target="_blank" rel="noreferrer">
              查看示例保单 PDF
            </a>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: detail[activeTab] as string }} />
          )}
        </section>
      </div>

      <div className={styles.bottomBar}>
        <button className={styles.secondaryBtn} onClick={() => openIM('insure-service')}>咨询</button>
        <button className={styles.primaryBtn} onClick={() => setShowReadModal(true)}>投保</button>
      </div>

      {showReadModal && (
        <MandatoryReadModal
          title="投保告知确认"
          content={detail.disclosure + detail.notice}
          onCancel={() => setShowReadModal(false)}
          onConfirm={() => {
            setShowReadModal(false)
            navigate(`/insurance/${detail.id}/checkout`)
          }}
        />
      )}
    </div>
  )
}
