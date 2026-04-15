import type { InsuranceProduct, InsuranceDetail } from '../api/insurance'

export const mockCategories = ['货运险', '责任险', '车辆险', '雇主险', '财产险']
export const mockSubjects = ['整车货物', '零担货物', '冷链货物', '危险品', '电子设备']
export const mockInsurers = ['中国人保', '平安保险', '太平洋保险', '中国太保', '阳光保险']

export const mockInsuranceProducts: InsuranceProduct[] = [
  {
    id: 'p001',
    name: '物流货运综合险',
    insurer: '中国人保',
    insurerLogo: '',
    category: '货运险',
    subject: '整车货物',
    minCoverage: 10,
    maxCoverage: 1000,
    priceFrom: 800,
    tags: ['物流专属', '全程保障', '快速理赔'],
    summary: '专为物流企业设计，承保道路运输中整批货物损失风险，国内全程覆盖。',
  },
  {
    id: 'p002',
    name: '冷链运输险',
    insurer: '平安保险',
    insurerLogo: '',
    category: '货运险',
    subject: '冷链货物',
    minCoverage: 5,
    maxCoverage: 500,
    priceFrom: 1200,
    tags: ['冷链专属', '温控保障', '7×24理赔'],
    summary: '针对冷链物流企业，涵盖温控失效、货物变质等核心风险，守护冷链全程。',
  },
  {
    id: 'p003',
    name: '物流雇主责任险',
    insurer: '太平洋保险',
    insurerLogo: '',
    category: '雇主险',
    subject: '零担货物',
    minCoverage: 20,
    maxCoverage: 200,
    priceFrom: 2000,
    tags: ['员工保障', '工伤覆盖', '合规必备'],
    summary: '为物流企业员工提供工伤及职业病责任保障，帮助企业合规运营。',
  },
  {
    id: 'p004',
    name: '危险品运输险',
    insurer: '中国太保',
    insurerLogo: '',
    category: '货运险',
    subject: '危险品',
    minCoverage: 50,
    maxCoverage: 2000,
    priceFrom: 3500,
    tags: ['危品专项', '污染责任', '高额保障'],
    summary: '专为危险品运输企业设计，承保运输途中爆炸、泄漏等意外损失及第三者责任。',
  },
  {
    id: 'p005',
    name: '电子设备货运险',
    insurer: '阳光保险',
    insurerLogo: '',
    category: '货运险',
    subject: '电子设备',
    minCoverage: 20,
    maxCoverage: 800,
    priceFrom: 1500,
    tags: ['电子专属', '碰损覆盖', '盗窃保障'],
    summary: '专为电子产品运输设计，承保碰损、磕碰、盗窃等风险，保护高价值货物安全到达。',
  },
  {
    id: 'p006',
    name: '物流车辆综合险',
    insurer: '中国人保',
    insurerLogo: '',
    category: '车辆险',
    subject: '整车货物',
    minCoverage: 30,
    maxCoverage: 600,
    priceFrom: 4200,
    tags: ['车队专用', '第三者责任', '不计免赔'],
    summary: '针对物流车队，提供商业车险、第三者责任险及附加险一站式保障方案。',
  },
]

export const mockInsuranceDetails: Record<string, InsuranceDetail> = {
  p001: {
    ...mockInsuranceProducts[0],
    introduction: `<p>物流货运综合险是专为物流企业设计的一款综合性货运保险产品，由中国人保承保。</p>
<p>本产品承保道路运输过程中整批货物因自然灾害、意外事故造成的直接损失，国内全程覆盖，支持按程或按年投保。</p>
<h4>主要保障内容</h4>
<ul>
  <li>道路运输中货物碰损、倾覆、失窃</li>
  <li>自然灾害（洪水、泥石流等）导致的货损</li>
  <li>装卸过程中的意外损失</li>
  <li>第三者责任（可加保）</li>
</ul>`,
    coverage: `<table>
<tr><th>保额档位</th><th>保费（元/年）</th><th>免赔额</th></tr>
<tr><td>10万</td><td>800</td><td>500元</td></tr>
<tr><td>50万</td><td>3,500</td><td>1,000元</td></tr>
<tr><td>100万</td><td>6,500</td><td>2,000元</td></tr>
<tr><td>500万</td><td>28,000</td><td>5,000元</td></tr>
<tr><td>1000万</td><td>50,000</td><td>10,000元</td></tr>
</table>`,
    notice: `<p><strong>投保须知</strong></p>
<ol>
  <li>投保人须为在中华人民共和国境内合法注册的物流企业。</li>
  <li>被保险货物须为合法运输物品，危险品需另行申报。</li>
  <li>投保前须如实告知货物种类、运输路线、历史出险情况。</li>
  <li>保险期间内货物运输路线发生变更，须提前通知保险公司。</li>
  <li>本保险不承保因战争、核污染、故意损毁造成的损失。</li>
</ol>`,
    specialTerms: `<p><strong>特约条款</strong></p>
<p>1. 附加盗抢险：在基础保险有效期内，因盗窃、抢劫导致的货物损失，每次事故赔偿限额为保额的50%。</p>
<p>2. 附加第三者责任险：承保因货物在运输途中脱落、泄漏造成第三者人身伤亡或财产损失的法律赔偿责任。</p>
<p>3. 附加运费险：在货物发生保险事故时，同时赔偿因此产生的合理运费损失。</p>`,
    disclosure: `<p><strong>重要告知</strong></p>
<p>根据《保险法》第十六条，投保人应如实告知以下事项：</p>
<ul>
  <li>近3年内是否有货运险理赔记录，如有请提供详细信息</li>
  <li>货物是否含有危险化学品或管制物品</li>
  <li>运输区域是否包含高风险路段（山区、泥泞路等）</li>
  <li>运输车辆是否均取得合法营运资质</li>
</ul>
<p><strong>未如实告知可能导致保险合同无效，保险公司有权拒绝赔付。</strong></p>`,
    samplePolicyUrl: '/mock-documents/sample-policy-p001.pdf',
  },
}

// 补充其他产品的详情（使用通用模板）
mockInsuranceProducts.forEach((p) => {
  if (!mockInsuranceDetails[p.id]) {
    mockInsuranceDetails[p.id] = {
      ...p,
      introduction: `<p>${p.name} 由 ${p.insurer} 承保，${p.summary}</p>`,
      coverage: `<p>最低保额：${p.minCoverage}万元，最高保额：${p.maxCoverage}万元，起始保费：${p.priceFrom}元/年</p>`,
      notice: '<p>请详细阅读本保险产品说明书，了解保障范围、除外责任及理赔流程。</p>',
      specialTerms: '<p>具体特约条款以保险合同为准。</p>',
      disclosure: '<p>请如实填写投保信息，隐瞒或虚假告知将影响理赔。</p>',
      samplePolicyUrl: `/mock-documents/sample-policy-${p.id}.pdf`,
    }
  }
})
