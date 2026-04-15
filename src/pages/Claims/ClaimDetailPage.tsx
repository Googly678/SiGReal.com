import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import PageHeader from '../../components/PageHeader/PageHeader'
import { mockClaimDetails } from '../../mocks/claims'
import { useIMStore } from '../../store/im'
import { useUIStore } from '../../store/ui'
import styles from './ClaimDetailPage.module.css'

export default function ClaimDetailPage() {
  const { id } = useParams<{ id: string }>()
  const openIM = useIMStore((s) => s.openIM)
  const addToast = useUIStore((s) => s.addToast)
  const detail = useMemo(() => (id ? mockClaimDetails[id] : undefined), [id])
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)

  if (!detail) return <div>理赔信息不存在</div>

  const handleSubmitDocs = () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      addToast('请先选择需要提交的单证', 'error')
      return
    }
    addToast('单证提交成功，理赔专员将尽快审核', 'success')
  }

  return (
    <div className={styles.page}>
      <PageHeader title="理赔详情" showBack />
      <div className={styles.content}>
        <section className={styles.infoCard}>
          <h2 className={styles.claimNo}>{detail.claimNo}</h2>
          <div className={styles.infoRow}><span>被保险人</span><strong>{detail.insuredName}</strong></div>
          <div className={styles.infoRow}><span>理赔类型</span><strong>{detail.claimType}</strong></div>
          <div className={styles.infoRow}><span>保单号</span><strong>{detail.policyNo}</strong></div>
          <div className={styles.infoRow}><span>报案时间</span><strong>{detail.reportDate}</strong></div>
        </section>

        <section className={styles.infoCard}>
          <h3 className={styles.sectionTitle}>损失标的</h3>
          {detail.lossItems.map((item, idx) => (
            <div key={idx} className={styles.lossItem}>
              <div>
                <strong>{item.name}</strong>
                <p>{item.description}</p>
              </div>
              <span>¥ {item.estimatedValue}</span>
            </div>
          ))}
        </section>

        <section className={styles.infoCard}>
          <h3 className={styles.sectionTitle}>损失评估</h3>
          <p className={styles.assessment}>{detail.lossAssessment}</p>
        </section>

        <section className={styles.infoCard}>
          <h3 className={styles.sectionTitle}>理赔进度</h3>
          <div className={styles.timeline}>
            {detail.progressSteps.map((step, idx) => (
              <div key={idx} className={styles.timelineItem}>
                <span className={`${styles.dot} ${styles[step.status]}`} />
                <div className={styles.timelineContent}>
                  <strong>{step.step}</strong>
                  <span>{step.date || '进行中'}</span>
                  {step.remark && <p>{step.remark}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.uploadCard}>
          <label className={styles.uploadBtn}>
            选择单证文件
            <input type="file" multiple onChange={(e) => setSelectedFiles(e.target.files)} />
          </label>
          {selectedFiles && selectedFiles.length > 0 && (
            <ul className={styles.fileList}>
              {Array.from(selectedFiles).map((f) => <li key={f.name}>{f.name}</li>)}
            </ul>
          )}
        </section>
      </div>

      <div className={styles.bottomBar}>
        <button className={styles.secondaryBtn} onClick={() => openIM('claim-service')}>联系客服</button>
        <button className={styles.primaryBtn} onClick={handleSubmitDocs}>提交单证</button>
      </div>
    </div>
  )
}
