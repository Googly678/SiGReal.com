import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../../components/PageHeader/PageHeader'
import { useUIStore } from '../../store/ui'
import styles from './MineFormPage.module.css'

export default function PasswordPage() {
  const navigate = useNavigate()
  const addToast = useUIStore((s) => s.addToast)
  const [form, setForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' })

  const save = () => {
    if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
      addToast('请完整填写密码信息', 'error')
      return
    }
    if (form.newPassword !== form.confirmPassword) {
      addToast('两次输入的新密码不一致', 'error')
      return
    }
    addToast('密码修改成功，请重新登录', 'success')
    navigate(-1)
  }

  return (
    <div className={styles.page}>
      <PageHeader title="修改密码" showBack />
      <div className={styles.content}>
        <Field label="旧密码" type="password" value={form.oldPassword} onChange={(v) => setForm({ ...form, oldPassword: v })} />
        <Field label="新密码" type="password" value={form.newPassword} onChange={(v) => setForm({ ...form, newPassword: v })} />
        <Field label="确认新密码" type="password" value={form.confirmPassword} onChange={(v) => setForm({ ...form, confirmPassword: v })} />
      </div>
      <BottomSave onClick={save} />
    </div>
  )
}

function Field({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <input className={styles.input} type={type} value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  )
}

function BottomSave({ onClick }: { onClick: () => void }) {
  return (
    <div className={styles.bottomBar}>
      <button className={styles.saveBtn} onClick={onClick}>提交</button>
    </div>
  )
}
