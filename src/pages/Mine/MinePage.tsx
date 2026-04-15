import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/auth'
import { useUIStore } from '../../store/ui'
import { mockUserInfo } from '../../mocks/user'
import styles from './MinePage.module.css'

export default function MinePage() {
  const navigate = useNavigate()
  const clearAuth = useAuthStore((s) => s.clearAuth)
  const userInfo = useAuthStore((s) => s.userInfo) ?? mockUserInfo
  const addToast = useUIStore((s) => s.addToast)

  const handleLogout = () => {
    const confirmed = window.confirm('确认退出当前账号？')
    if (!confirmed) return
    clearAuth()
    addToast('已退出登录', 'success')
  }

  return (
    <div className={styles.page}>
      <section className={styles.profileHero}>
        <div className={styles.avatar}>{userInfo.name.slice(0, 1)}</div>
        <h1 className={styles.userName}>{userInfo.name}</h1>
        <p className={styles.companyName}>{userInfo.companyName}</p>
      </section>

      <section className={styles.group}>
        <button className={styles.item} onClick={() => navigate('/mine/company')}>
          <span>客户企业信息管理</span>
          <Arrow />
        </button>
        <button className={styles.item} onClick={() => navigate('/mine/account')}>
          <span>账户信息维护</span>
          <Arrow />
        </button>
      </section>

      <section className={styles.group}>
        <button className={styles.item} onClick={() => navigate('/mine/settings')}>
          <span>系统设置</span>
          <Arrow />
        </button>
        <button className={styles.item} onClick={() => navigate('/mine/password')}>
          <span>密码修改</span>
          <Arrow />
        </button>
      </section>

      <section className={styles.group}>
        <button className={`${styles.item} ${styles.logout}`} onClick={handleLogout}>
          <span>退出账户</span>
        </button>
      </section>
    </div>
  )
}

function Arrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M7 4l5 5-5 5" stroke="rgba(0,0,0,0.24)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
