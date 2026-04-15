import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../../components/PageHeader/PageHeader'
import { mockCompanyInfo } from '../../mocks/user'
import { useUIStore } from '../../store/ui'
import styles from './MineFormPage.module.css'

export default function CompanyInfoPage() {
  const navigate = useNavigate()
  const addToast = useUIStore((s) => s.addToast)
  const [form, setForm] = useState(mockCompanyInfo)

  const save = () => {
    addToast('企业信息已更新', 'success')
    navigate(-1)
  }

  return (
    <div className={styles.page}>
      <PageHeader title="企业信息" showBack />
      <div className={styles.content}>
        <Field label="企业名称" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
        <Field label="统一社会信用代码" value={form.licenseNo} onChange={(v) => setForm({ ...form, licenseNo: v })} />
        <Field label="企业地址" value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
        <Field label="联系人" value={form.contactName} onChange={(v) => setForm({ ...form, contactName: v })} />
        <Field label="联系电话" value={form.contactPhone} onChange={(v) => setForm({ ...form, contactPhone: v })} />
        <Field label="行业类型" value={form.industry} onChange={(v) => setForm({ ...form, industry: v })} />
      </div>
      <BottomSave onClick={save} />
    </div>
  )
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <input className={styles.input} value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  )
}

function BottomSave({ onClick }: { onClick: () => void }) {
  return (
    <div className={styles.bottomBar}>
      <button className={styles.saveBtn} onClick={onClick}>保存</button>
    </div>
  )
}
