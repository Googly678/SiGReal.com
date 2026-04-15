import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PageHeader from '../../components/PageHeader/PageHeader'
import { mockClaimTypes } from '../../mocks/claims'
import { mockPolicies } from '../../mocks/policy'
import { useUIStore } from '../../store/ui'
import styles from './ClaimCreatePage.module.css'

interface ClaimCreateLocationState {
  policyId?: string
  policyNo?: string
  productName?: string
  insuredName?: string
  category?: string
}

export default function ClaimCreatePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const addToast = useUIStore((state) => state.addToast)
  const state = (location.state as ClaimCreateLocationState | null) ?? null

  const initialPolicyId = state?.policyId ?? mockPolicies[0]?.id ?? ''
  const [policyId, setPolicyId] = useState(initialPolicyId)
  const [claimType, setClaimType] = useState(mockClaimTypes[0] ?? '')
  const [incidentDate, setIncidentDate] = useState(new Date().toISOString().slice(0, 10))
  const [lossDescription, setLossDescription] = useState('')
  const [contactName, setContactName] = useState('李经理')
  const [contactPhone, setContactPhone] = useState('13800138000')

  const selectedPolicy = useMemo(
    () => mockPolicies.find((policy) => policy.id === policyId) ?? mockPolicies[0],
    [policyId],
  )

  const submitApplication = () => {
    if (!selectedPolicy || !claimType || !incidentDate || !lossDescription.trim() || !contactName.trim() || !contactPhone.trim()) {
      addToast('请完整填写理赔申请信息', 'error')
      return
    }

    addToast(`已为保单 ${selectedPolicy.policyNo} 发起理赔申请`, 'success')
    navigate('/claims')
  }

  return (
    <div className={styles.page}>
      <PageHeader title="新建理赔申请" showBack />

      <div className={styles.content}>
        <section className={styles.summaryCard}>
          <span className={styles.summaryEyebrow}>理赔发起</span>
          <h2 className={styles.summaryTitle}>{selectedPolicy?.productName ?? state?.productName ?? '请选择保单'}</h2>
          <div className={styles.summaryGrid}>
            <div className={styles.summaryItem}><span>保单号</span><strong>{selectedPolicy?.policyNo ?? state?.policyNo ?? '-'}</strong></div>
            <div className={styles.summaryItem}><span>被保险人</span><strong>{selectedPolicy?.insuredName ?? state?.insuredName ?? '-'}</strong></div>
            <div className={styles.summaryItem}><span>险种</span><strong>{selectedPolicy?.category ?? state?.category ?? '-'}</strong></div>
            <div className={styles.summaryItem}><span>剩余保额</span><strong>{selectedPolicy?.remainingCoverage ?? '-'} 万元</strong></div>
          </div>
        </section>

        <section className={styles.formCard}>
          <h3 className={styles.sectionTitle}>申请信息</h3>

          <label className={styles.field}>
            <span className={styles.label}>关联保单</span>
            <select className={styles.select} value={policyId} onChange={(event) => setPolicyId(event.target.value)}>
              {mockPolicies.map((policy) => (
                <option key={policy.id} value={policy.id}>
                  {policy.productName} · {policy.policyNo}
                </option>
              ))}
            </select>
          </label>

          <div className={styles.row}>
            <label className={styles.field}>
              <span className={styles.label}>理赔类型</span>
              <select className={styles.select} value={claimType} onChange={(event) => setClaimType(event.target.value)}>
                {mockClaimTypes.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </label>

            <label className={styles.field}>
              <span className={styles.label}>出险日期</span>
              <input className={styles.input} type="date" value={incidentDate} onChange={(event) => setIncidentDate(event.target.value)} />
            </label>
          </div>

          <label className={styles.field}>
            <span className={styles.label}>损失描述</span>
            <textarea
              className={styles.textarea}
              value={lossDescription}
              onChange={(event) => setLossDescription(event.target.value)}
              placeholder="请描述事故经过、损失标的和当前处理情况"
              rows={5}
            />
          </label>

          <div className={styles.row}>
            <label className={styles.field}>
              <span className={styles.label}>联系人</span>
              <input className={styles.input} value={contactName} onChange={(event) => setContactName(event.target.value)} />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>联系电话</span>
              <input className={styles.input} value={contactPhone} onChange={(event) => setContactPhone(event.target.value)} />
            </label>
          </div>
        </section>
      </div>

      <div className={styles.bottomBar}>
        <button className={styles.ghostBtn} onClick={() => navigate(-1)}>取消</button>
        <button className={styles.primaryBtn} onClick={submitApplication}>提交理赔申请</button>
      </div>
    </div>
  )
}