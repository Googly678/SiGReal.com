import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PageHeader from '../../components/PageHeader/PageHeader'
import { mockPolicyDetails } from '../../mocks/policy'
import styles from './PolicyDetailPage.module.css'

export default function PolicyDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const detail = useMemo(() => (id ? mockPolicyDetails[id] : undefined), [id])
  if (!detail) return <div>保单不存在</div>

  const usedPercent = Math.round(((detail.coverage - detail.remainingCoverage) / detail.coverage) * 100)

  return (
    <div className={styles.page}>
      <PageHeader title="保单详情" showBack />
      <div className={styles.content}>
        <section className={styles.heroCard}>
          <div className={styles.heroLeft}>
            <h2 className={styles.policyName}>{detail.productName}</h2>
            <p className={styles.policyNo}>{detail.policyNo}</p>
            <div className={styles.period}>{detail.startDate} - {detail.endDate}</div>
          </div>
          <div className={styles.progressWrap}>
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" stroke="rgba(0,0,0,0.08)" strokeWidth="8" fill="none" />
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="var(--color-terracotta)"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${usedPercent * 3.14} 314`}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
              />
            </svg>
            <div className={styles.progressText}>
              <span className={styles.progressValue}>{detail.remainingCoverage}万</span>
              <span className={styles.progressLabel}>剩余保额</span>
            </div>
          </div>
        </section>

        <section className={styles.infoSection}>
          <div className={styles.infoRow}><span>保险公司</span><strong>{detail.insurer}</strong></div>
          <div className={styles.infoRow}><span>被保险人</span><strong>{detail.insuredName}</strong></div>
          <div className={styles.infoRow}><span>总保额</span><strong>{detail.coverage} 万元</strong></div>
          <div className={styles.infoRow}><span>已使用保额</span><strong>{detail.coverage - detail.remainingCoverage} 万元</strong></div>
          <div className={styles.infoRow}><span>保费</span><strong>{detail.premium} 元</strong></div>
        </section>

        <section className={styles.historySection}>
          <h3 className={styles.sectionTitle}>历史理赔记录</h3>
          {detail.claimHistory.length > 0 ? (
            <div className={styles.historyList}>
              {detail.claimHistory.map((record) => (
                <div key={record.claimId} className={styles.historyItem}>
                  <div>
                    <span className={styles.historyType}>{record.claimType}</span>
                    <span className={styles.historyNo}>{record.claimNo}</span>
                  </div>
                  <div className={styles.historyRight}>
                    <strong>{record.amount} 元</strong>
                    <span>{record.date}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.emptyText}>暂无理赔记录</p>
          )}
        </section>
      </div>

      <div className={styles.bottomBar}>
        <button
          className={styles.secondaryBtn}
          onClick={() => navigate('/claims/new', {
            state: {
              policyId: detail.id,
              policyNo: detail.policyNo,
              productName: detail.productName,
              insuredName: detail.insuredName,
              category: detail.category,
            },
          })}
        >
          申请理赔
        </button>
        <button className={styles.primaryBtn} onClick={() => navigate(`/policy/${detail.id}/document`)}>查看保单</button>
      </div>
    </div>
  )
}
