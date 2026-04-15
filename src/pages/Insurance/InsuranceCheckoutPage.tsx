import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PageHeader from '../../components/PageHeader/PageHeader'
import { mockInsuranceDetails } from '../../mocks/insurance'
import { useUIStore } from '../../store/ui'
import styles from './InsuranceCheckoutPage.module.css'

export default function InsuranceCheckoutPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const addToast = useUIStore((s) => s.addToast)
  const product = useMemo(() => (id ? mockInsuranceDetails[id] : undefined), [id])

  const [form, setForm] = useState({
    insuredName: '',
    insuredIdType: '身份证',
    insuredIdNo: '',
    insuredPhone: '',
    coverage: product?.minCoverage ?? 10,
    startDate: new Date().toISOString().slice(0, 10),
    endDate: '',
  })

  if (!product) return <div>产品不存在</div>

  const handleChange = (key: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handlePay = () => {
    addToast('支付接口已预留，后续可接入微信/支付宝', 'success')
    navigate('/policy')
  }

  return (
    <div className={styles.page}>
      <PageHeader title="确认投保" showBack />
      <div className={styles.content}>
        <section className={styles.summaryCard}>
          <span className={styles.insurer}>{product.insurer}</span>
          <h2 className={styles.productName}>{product.name}</h2>
          <div className={styles.priceRow}>
            <span>预计保费</span>
            <strong>¥ {product.priceFrom}</strong>
          </div>
        </section>

        <section className={styles.formSection}>
          <h3 className={styles.sectionTitle}>被保险人信息</h3>
          <LabelInput label="姓名" value={form.insuredName} onChange={(v) => handleChange('insuredName', v)} placeholder="请输入被保险人姓名" />
          <LabelSelect label="证件类型" value={form.insuredIdType} options={['身份证', '护照', '营业执照']} onChange={(v) => handleChange('insuredIdType', v)} />
          <LabelInput label="证件号码" value={form.insuredIdNo} onChange={(v) => handleChange('insuredIdNo', v)} placeholder="请输入证件号码" />
          <LabelInput label="联系电话" value={form.insuredPhone} onChange={(v) => handleChange('insuredPhone', v)} placeholder="请输入联系电话" />
          <LabelInput label="保额（万元）" type="number" value={String(form.coverage)} onChange={(v) => handleChange('coverage', Number(v))} placeholder="请输入保额" />
          <LabelInput label="生效日期" type="date" value={form.startDate} onChange={(v) => handleChange('startDate', v)} />
        </section>

        <section className={styles.noticeSection}>
          <div className={styles.noticeRow}><span>保险种类</span><strong>{product.category}</strong></div>
          <div className={styles.noticeRow}><span>保险标的</span><strong>{product.subject}</strong></div>
          <div className={styles.noticeRow}><span>保额范围</span><strong>{product.minCoverage}-{product.maxCoverage} 万元</strong></div>
          <div className={styles.noticeRow}><span>投保说明</span><strong>支付接口已预留，后续接入支付网关</strong></div>
        </section>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.totalBox}>
          <span>应付金额</span>
          <strong>¥ {product.priceFrom}</strong>
        </div>
        <button className={styles.payBtn} onClick={handlePay}>确认支付</button>
      </div>
    </div>
  )
}

function LabelInput({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <label className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <input className={styles.fieldInput} type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </label>
  )
}

function LabelSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}) {
  return (
    <label className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <select className={styles.fieldInput} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </label>
  )
}
