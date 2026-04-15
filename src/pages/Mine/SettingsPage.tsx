import { useState } from 'react'
import PageHeader from '../../components/PageHeader/PageHeader'
import { useUIStore } from '../../store/ui'
import styles from './MineFormPage.module.css'

export default function SettingsPage() {
  const addToast = useUIStore((s) => s.addToast)
  const [settings, setSettings] = useState({
    notification: true,
    biometric: false,
    autoLogin: true,
  })

  const toggle = (key: keyof typeof settings) => {
    const next = { ...settings, [key]: !settings[key] }
    setSettings(next)
    addToast('设置已更新', 'success')
  }

  return (
    <div className={styles.page}>
      <PageHeader title="系统设置" showBack />
      <div className={styles.content}>
        <SettingItem label="消息通知" checked={settings.notification} onToggle={() => toggle('notification')} />
        <SettingItem label="生物识别登录" checked={settings.biometric} onToggle={() => toggle('biometric')} />
        <SettingItem label="自动登录" checked={settings.autoLogin} onToggle={() => toggle('autoLogin')} />
      </div>
    </div>
  )
}

function SettingItem({ label, checked, onToggle }: { label: string; checked: boolean; onToggle: () => void }) {
  return (
    <div className={styles.settingItem}>
      <span>{label}</span>
      <button className={`${styles.switch} ${checked ? styles.switchOn : ''}`} onClick={onToggle} aria-pressed={checked}>
        <span className={styles.switchThumb} />
      </button>
    </div>
  )
}
