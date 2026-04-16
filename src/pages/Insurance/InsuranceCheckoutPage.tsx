import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PageHeader from '../../components/PageHeader/PageHeader'
import { mockInsuranceDetails } from '../../mocks/insurance'
import { useUIStore } from '../../store/ui'
import styles from './InsuranceCheckoutPage.module.css'

const TODAY = new Date().toISOString().slice(0, 10)

type FormState = {
  // Step 1 — 基本信息
  companyName: string
  employeeCount: string
  ownedVehicles: string
  lastYearRevenue: string
  estimatedRevenue: string
  maxClaimPerIncident: string
  startDate: string
  extColdChain: boolean
  extXinjiang: boolean
  extQinghai: boolean
  extTibet: boolean
  extOverload: boolean
  otherNeeds: string
  // Step 2 — 经营情况
  consignorOwner: boolean
  consignorLogistics: boolean
  consignorPlatform: boolean
  consigneeLogistics: boolean
  consigneeSubcontract: boolean
  consigneePlatformDriver: boolean
  consigneeSelfVehicle: boolean
  containerBizRatio: string
  goodsFragile: boolean
  goodsAutoParts: boolean
  goodsMachinery: boolean
  goodsSteel: boolean
  goodsFood: boolean
  goodsElectronics: boolean
  goodsSemiconductor: boolean
  routeYunnanGuizhou: boolean
  routeGansuNingxia: boolean
  routeInnerMongolia: boolean
  routeJilinHeilongjiang: boolean
  routeHainan: boolean
  routeSichuanChongqing: boolean
  // Step 3 — 出险情况
  policyNo2023: string
  insurer2023: string
  claimCount2023: string
  claimAmount2023: string
  policyNo2024: string
  insurer2024: string
  claimCount2024: string
  claimAmount2024: string
  policyNo2025: string
  insurer2025: string
  claimCount2025: string
  claimAmount2025: string
  useTMS: boolean
  useADAS: boolean
  declarationConfirmed: boolean
}

const initialForm: FormState = {
  companyName: '', employeeCount: '0', ownedVehicles: '0',
  lastYearRevenue: '0', estimatedRevenue: '0', maxClaimPerIncident: '0',
  startDate: TODAY,
  extColdChain: false, extXinjiang: false, extQinghai: false, extTibet: false, extOverload: false,
  otherNeeds: '',
  consignorOwner: false, consignorLogistics: false, consignorPlatform: false,
  consigneeLogistics: false, consigneeSubcontract: false, consigneePlatformDriver: false, consigneeSelfVehicle: false,
  containerBizRatio: '0',
  goodsFragile: false, goodsAutoParts: false, goodsMachinery: false, goodsSteel: false,
  goodsFood: false, goodsElectronics: false, goodsSemiconductor: false,
  routeYunnanGuizhou: false, routeGansuNingxia: false, routeInnerMongolia: false,
  routeJilinHeilongjiang: false, routeHainan: false, routeSichuanChongqing: false,
  policyNo2023: '', insurer2023: '', claimCount2023: '0', claimAmount2023: '0',
  policyNo2024: '', insurer2024: '', claimCount2024: '0', claimAmount2024: '0',
  policyNo2025: '', insurer2025: '', claimCount2025: '0', claimAmount2025: '0',
  useTMS: false, useADAS: false, declarationConfirmed: false,
}

export default function InsuranceCheckoutPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const addToast = useUIStore((s) => s.addToast)
  const product = useMemo(() => (id ? mockInsuranceDetails[id] : undefined), [id])

  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormState>(initialForm)

  if (!product) return <div>产品不存在</div>

  const set = (key: keyof FormState, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const toggle = (key: keyof FormState) =>
    setForm((prev) => ({ ...prev, [key]: !prev[key] }))

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
      window.scrollTo({ top: 0 })
    } else {
      if (!form.declarationConfirmed) {
        addToast('请勾选投保人声明确认', 'error')
        return
      }
      addToast('投保信息已提交，支付接口后续接入', 'success')
      navigate('/policy')
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo({ top: 0 })
    } else {
      navigate(-1)
    }
  }

  return (
    <div className={styles.page}>
      <PageHeader title={`${product.name}询价单 (${step}/3)`} showBack onBack={handleBack} />
      <div className={styles.content}>
        {step === 1 && <Step1 form={form} set={set} toggle={toggle} />}
        {step === 2 && <Step2 form={form} set={set} toggle={toggle} />}
        {step === 3 && <Step3 form={form} set={set} toggle={toggle} />}
      </div>
      <div className={styles.bottomBar}>
        {step > 1 && (
          <button className={styles.backBtn} onClick={handleBack}>上一步</button>
        )}
        <button className={styles.payBtn} onClick={handleNext}>
          {step < 3 ? '下一步' : '确认提交'}
        </button>
      </div>
    </div>
  )
}

/* ──────── Step 1 ──────── */
function Step1({ form, set, toggle }: StepProps) {
  return (
    <>
      <SectionTitle index={1} title="投保人/被保险人基本信息" />
      <section className={styles.formSection}>
        <LabelInput
          label="投保人/被保险人及其子公司名称 *"
          value={form.companyName}
          onChange={(v) => set('companyName', v)}
          placeholder="请输入公司名称"
        />
        <div className={styles.row2}>
          <LabelInput label="在职员工人数 *" type="number" value={form.employeeCount} onChange={(v) => set('employeeCount', v)} />
          <LabelInput label="自有车辆数 *" type="number" value={form.ownedVehicles} onChange={(v) => set('ownedVehicles', v)} />
        </div>
        <LabelInput
          label="上年度营业收入（单位：万元）*"
          type="number"
          value={form.lastYearRevenue}
          onChange={(v) => set('lastYearRevenue', v)}
        />
        <LabelInput
          label="预计保险区间内营业收入（单位：万元）*"
          type="number"
          value={form.estimatedRevenue}
          onChange={(v) => set('estimatedRevenue', v)}
        />
      </section>

      <SectionTitle index={2} title="核心保险需求" />
      <section className={styles.formSection}>
        <LabelInput
          label="每次事故赔偿限额（单位：万元）*"
          type="number"
          value={form.maxClaimPerIncident}
          onChange={(v) => set('maxClaimPerIncident', v)}
        />
        <LabelInput label="预计/期望起保日期 *" type="date" value={form.startDate} onChange={(v) => set('startDate', v)} />
        <div className={styles.checkGroupLabel}>扩展责任勾选</div>
        <CheckItem checked={form.extColdChain} onChange={() => toggle('extColdChain')} label="是否扩展冷藏运输" />
        <CheckItem checked={form.extXinjiang} onChange={() => toggle('extXinjiang')} label="是否扩展新疆地区承保" />
        <CheckItem checked={form.extQinghai} onChange={() => toggle('extQinghai')} label="是否扩展青海地区承保" />
        <CheckItem checked={form.extTibet} onChange={() => toggle('extTibet')} label="是否扩展西藏地区承保" />
        <CheckItem checked={form.extOverload} onChange={() => toggle('extOverload')} label="是否扩展临牌/超牌/仅承运不可拆卸货物车型" />
        <div className={styles.checkGroupLabel} style={{ marginTop: 14 }}>其他保险需求</div>
        <textarea
          className={styles.textarea}
          value={form.otherNeeds}
          onChange={(e) => set('otherNeeds', e.target.value)}
          placeholder="填写个性化需求"
          rows={4}
        />
      </section>
    </>
  )
}

/* ──────── Step 2 ──────── */
function Step2({ form, set, toggle }: StepProps) {
  return (
    <>
      <SectionTitle index={3} title="被保险人经营情况" />
      <section className={styles.formSection}>
        <div className={styles.checkGroupLabel}>托运人信息录入</div>
        <CheckItem checked={form.consignorOwner} onChange={() => toggle('consignorOwner')} label="货主（工厂/贸易公司等物权单位）" />
        <CheckItem checked={form.consignorLogistics} onChange={() => toggle('consignorLogistics')} label="物流公司" />
        <CheckItem checked={form.consignorPlatform} onChange={() => toggle('consignorPlatform')} label="网络货运平台" />

        <div className={styles.checkGroupLabel} style={{ marginTop: 16 }}>承托人（下家）信息录入</div>
        <CheckItem checked={form.consigneeLogistics} onChange={() => toggle('consigneeLogistics')} label="物流公司" />
        <CheckItem checked={form.consigneeSubcontract} onChange={() => toggle('consigneeSubcontract')} label="外包合作司机" />
        <CheckItem checked={form.consigneePlatformDriver} onChange={() => toggle('consigneePlatformDriver')} label="网络货运平台找的司机" />
        <CheckItem checked={form.consigneeSelfVehicle} onChange={() => toggle('consigneeSelfVehicle')} label="自有车辆（无承托人）" />

        <div className={styles.checkGroupLabel} style={{ marginTop: 16 }}>集装箱/箱式货车运输业务占比（按次数，%）*</div>
        <div className={styles.percentRow}>
          <input
            className={styles.fieldInput}
            style={{ flex: 1 }}
            type="number"
            value={form.containerBizRatio}
            onChange={(e) => set('containerBizRatio', e.target.value)}
          />
          <span className={styles.percentSign}>%</span>
        </div>

        <div className={styles.checkGroupLabel} style={{ marginTop: 16 }}>运输货物品类</div>
        <CheckItem checked={form.goodsFragile} onChange={() => toggle('goodsFragile')} label="是否运输易碎品（石材/玻璃制品/光伏组件/瓶装酒等）" />
        <CheckItem checked={form.goodsAutoParts} onChange={() => toggle('goodsAutoParts')} label="是否运输汽车配件类货物" />
        <CheckItem checked={form.goodsMachinery} onChange={() => toggle('goodsMachinery')} label="是否运输机械设备（非精密、非超大件）" />
        <CheckItem checked={form.goodsSteel} onChange={() => toggle('goodsSteel')} label="是否运输各类钢材（钢卷、钢结构等）" />
        <CheckItem checked={form.goodsFood} onChange={() => toggle('goodsFood')} label="是否运输常温食品/饮料（袋/盒/罐/箱装）" />
        <CheckItem checked={form.goodsElectronics} onChange={() => toggle('goodsElectronics')} label="是否运输电子设备（液晶电视/数码产品等）" />
        <CheckItem checked={form.goodsSemiconductor} onChange={() => toggle('goodsSemiconductor')} label="是否运输半导体零配件" />

        <div className={styles.checkGroupLabel} style={{ marginTop: 16 }}>运输路线</div>
        <CheckItem checked={form.routeYunnanGuizhou} onChange={() => toggle('routeYunnanGuizhou')} label="是否运输至云南/贵州" />
        <CheckItem checked={form.routeGansuNingxia} onChange={() => toggle('routeGansuNingxia')} label="是否运输至甘肃/宁夏" />
        <CheckItem checked={form.routeInnerMongolia} onChange={() => toggle('routeInnerMongolia')} label="是否运输至内蒙古" />
        <CheckItem checked={form.routeJilinHeilongjiang} onChange={() => toggle('routeJilinHeilongjiang')} label="是否运输至吉林/黑龙江" />
        <CheckItem checked={form.routeHainan} onChange={() => toggle('routeHainan')} label="是否运输至海南" />
        <CheckItem checked={form.routeSichuanChongqing} onChange={() => toggle('routeSichuanChongqing')} label="是否运输至四川/重庆" />
      </section>
    </>
  )
}

/* ──────── Step 3 ──────── */
function Step3({ form, set, toggle }: StepProps) {
  const years = ['2023', '2024', '2025'] as const
  return (
    <>
      <SectionTitle index={4} title="出险及保险情况（2023-2025）" />
      {years.map((year) => (
        <section key={year} className={styles.formSection}>
          <div className={styles.yearTitle}>{year} 年</div>
          <LabelInput
            label={`${year}年保单号`}
            value={form[`policyNo${year}` as keyof FormState] as string}
            onChange={(v) => set(`policyNo${year}` as keyof FormState, v)}
            placeholder="未投保可不填"
          />
          <LabelInput
            label={`${year}年承保保险公司`}
            value={form[`insurer${year}` as keyof FormState] as string}
            onChange={(v) => set(`insurer${year}` as keyof FormState, v)}
            placeholder="未投保可不填"
          />
          <div className={styles.row2}>
            <LabelInput
              label={`${year}年出险次数 *`}
              type="number"
              value={form[`claimCount${year}` as keyof FormState] as string}
              onChange={(v) => set(`claimCount${year}` as keyof FormState, v)}
            />
            <LabelInput
              label={`${year}年总索赔金额（万元）*`}
              type="number"
              value={form[`claimAmount${year}` as keyof FormState] as string}
              onChange={(v) => set(`claimAmount${year}` as keyof FormState, v)}
            />
          </div>
        </section>
      ))}

      <SectionTitle index={5} title="其他补充信息" />
      <section className={styles.formSection}>
        <CheckItem checked={form.useTMS} onChange={() => toggle('useTMS')} label="是否使用 TMS 软件" />
        <CheckItem checked={form.useADAS} onChange={() => toggle('useADAS')} label="是否使用 ADAS 等安全管理系统" />
      </section>

      <SectionTitle index={6} title="投保人声明确认" />
      <section className={styles.formSection}>
        <CheckItem
          checked={form.declarationConfirmed}
          onChange={() => toggle('declarationConfirmed')}
          label="我已阅读并确认投保人声明内容，填写信息真实准确"
        />
      </section>
    </>
  )
}

/* ──────── Shared helpers ──────── */
type StepProps = {
  form: FormState
  set: (key: keyof FormState, value: string | boolean) => void
  toggle: (key: keyof FormState) => void
}

function SectionTitle({ index, title }: { index: number; title: string }) {
  return (
    <div className={styles.sectionHeader}>
      <span className={styles.sectionIndex}>{index}</span>
      <span className={styles.sectionTitleText}>{title}</span>
    </div>
  )
}

function CheckItem({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className={styles.checkItem} onClick={onChange}>
      <span className={`${styles.checkbox} ${checked ? styles.checkboxChecked : ''}`} />
      <span className={styles.checkLabel}>{label}</span>
    </label>
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
      <input
        className={styles.fieldInput}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  )
}
