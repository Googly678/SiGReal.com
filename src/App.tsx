import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import BottomNav from './components/BottomNav/BottomNav'
import IMModal from './components/IMModal/IMModal'
import Toast from './components/Toast/Toast'
import MessagesPage from './pages/Messages/MessagesPage'
import PolicyPage from './pages/Policy/PolicyPage'
import PolicyDetailPage from './pages/Policy/PolicyDetailPage'
import PolicyDocumentPage from './pages/Policy/PolicyDocumentPage'
import InsurancePage from './pages/Insurance/InsurancePage'
import InsuranceDetailPage from './pages/Insurance/InsuranceDetailPage'
import InsuranceCheckoutPage from './pages/Insurance/InsuranceCheckoutPage'
import ClaimsPage from './pages/Claims/ClaimsPage'
import ClaimDetailPage from './pages/Claims/ClaimDetailPage'
import ClaimCreatePage from './pages/Claims/ClaimCreatePage'
import MinePage from './pages/Mine/MinePage'
import CompanyInfoPage from './pages/Mine/CompanyInfoPage'
import AccountInfoPage from './pages/Mine/AccountInfoPage'
import SettingsPage from './pages/Mine/SettingsPage'
import PasswordPage from './pages/Mine/PasswordPage'
import { useAuthStore } from './store/auth'
import { mockUserInfo } from './mocks/user'

export default function App() {
  const { isLoggedIn, setAuth } = useAuthStore()

  // 开发阶段默认自动登录 mock 用户
  if (!isLoggedIn) {
    setAuth('mock-token', mockUserInfo)
  }

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Toast />
      <Routes>
        <Route element={<ShellLayout />}>
          <Route path="/" element={<Navigate to="/insurance" replace />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/policy" element={<PolicyPage />} />
          <Route path="/policy/:id" element={<PolicyDetailPage />} />
          <Route path="/policy/:id/document" element={<PolicyDocumentPage />} />
          <Route path="/insurance" element={<InsurancePage />} />
          <Route path="/insurance/:id" element={<InsuranceDetailPage />} />
          <Route path="/insurance/:id/checkout" element={<InsuranceCheckoutPage />} />
          <Route path="/claims" element={<ClaimsPage />} />
          <Route path="/claims/new" element={<ClaimCreatePage />} />
          <Route path="/claims/:id" element={<ClaimDetailPage />} />
          <Route path="/mine" element={<MinePage />} />
          <Route path="/mine/company" element={<CompanyInfoPage />} />
          <Route path="/mine/account" element={<AccountInfoPage />} />
          <Route path="/mine/settings" element={<SettingsPage />} />
          <Route path="/mine/password" element={<PasswordPage />} />
        </Route>
      </Routes>
      <IMModal />
    </BrowserRouter>
  )
}

function ShellLayout() {
  return (
    <div className="page-container">
      <Outlet />
      <BottomNav />
    </div>
  )
}
