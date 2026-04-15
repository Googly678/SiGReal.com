import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../../components/PageHeader/PageHeader'
import { mockUserInfo } from '../../mocks/user'
import { useAuthStore } from '../../store/auth'
import { useUIStore } from '../../store/ui'
import styles from './MineFormPage.module.css'

export default function AccountInfoPage() {
  const navigate = useNavigate()
  const updateUserInfo = useAuthStore((s) => s.updateUserInfo)
  const addToast = useUIStore((s) => s.addToast)
  const [form, setForm] = useState({
    name: mockUserInfo.name,
    phone: mockUserInfo.phone,
    email: 'service@sf-logistics.com',
  })

  const save = () => {
    updateUserInfo({ name: form.name, phone: form.phone })
    addToast('账户信息已更新', 'success')
    navigate(-1)
  }

  return (
    <div className={styles.page}>
      <PageHeader title="账户信息" showBack />
      <div className={styles.content}>
        <Field label="姓名" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
        <Field label="手机号" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
        <Field label="邮箱" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
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
