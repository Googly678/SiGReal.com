import type { Claim, ClaimDetail } from '../api/claims'

export const mockClaimTypes = ['货物损失', '盗窃损失', '第三者责任', '工伤', '车辆损失']

export const mockClaims: Claim[] = [
  {
    id: 'clm001',
    claimNo: 'CLM-2025-001',
    insuredName: '顺丰物流科技有限公司',
    claimType: '货物损失',
    policyNo: 'PICC-2025-GH-001234',
    category: '货运险',
    reportDate: '2025-08-12',
    status: 'paid',
    progress: 100,
  },
  {
    id: 'clm002',
    claimNo: 'CLM-2025-008',
    insuredName: '顺丰物流科技有限公司',
    claimType: '盗窃损失',
    policyNo: 'PICC-2025-GH-001234',
    category: '货运险',
    reportDate: '2025-11-01',
    status: 'paid',
    progress: 100,
  },
  {
    id: 'clm003',
    claimNo: 'CLM-2025-015',
    insuredName: '顺丰物流科技有限公司',
    claimType: '货物损失',
    policyNo: 'PA-2025-LL-005678',
    category: '货运险',
    reportDate: '2026-02-20',
    status: 'reviewing',
    progress: 50,
  },
  {
    id: 'clm004',
    claimNo: 'CLM-2026-003',
    insuredName: '顺丰物流科技有限公司',
    claimType: '第三者责任',
    policyNo: 'PICC-2025-GH-001234',
    category: '货运险',
    reportDate: '2026-04-01',
    status: 'pending',
    progress: 10,
  },
]

export const mockClaimDetails: Record<string, ClaimDetail> = {
  clm001: {
    ...mockClaims[0],
    lossItems: [
      { name: '电子元件货物', description: '运输途中车辆侧翻导致货物全损', estimatedValue: 35000 },
    ],
    lossAssessment: '经查勘评估，货物因车辆侧翻完全损毁，核定损失金额 35,000 元，扣除绝对免赔额 1,000 元，最终赔付 34,000 元。',
    assessedAmount: 34000,
    progressSteps: [
      { step: '报案受理', date: '2025-08-12', status: 'done' },
      { step: '现场勘查', date: '2025-08-14', status: 'done' },
      { step: '损失核定', date: '2025-08-16', status: 'done' },
      { step: '赔付审核', date: '2025-08-18', status: 'done' },
      { step: '赔款到账', date: '2025-08-20', status: 'done' },
    ],
    attachments: [{ name: '理赔决定书.pdf', url: '/mock-documents/claim-clm001.pdf' }],
  },
  clm003: {
    ...mockClaims[2],
    lossItems: [
      { name: '冷冻食品', description: '制冷设备故障导致冷链中断，货物变质', estimatedValue: 28000 },
    ],
    lossAssessment: '正在进行损失核定，预计核定金额 25,000-28,000 元。',
    progressSteps: [
      { step: '报案受理', date: '2026-02-20', status: 'done' },
      { step: '现场勘查', date: '2026-02-22', status: 'done' },
      { step: '损失核定', date: '', status: 'active' },
      { step: '赔付审核', date: '', status: 'pending' },
      { step: '赔款到账', date: '', status: 'pending' },
    ],
    attachments: [],
  },
  clm004: {
    ...mockClaims[3],
    lossItems: [
      { name: '第三者车辆', description: '运输车辆追尾第三者轿车，造成第三者财产损失', estimatedValue: 45000 },
    ],
    lossAssessment: '案件处于初始受理阶段，等待现场勘查安排。',
    progressSteps: [
      { step: '报案受理', date: '2026-04-01', status: 'done' },
      { step: '现场勘查', date: '', status: 'active' },
      { step: '损失核定', date: '', status: 'pending' },
      { step: '赔付审核', date: '', status: 'pending' },
      { step: '赔款到账', date: '', status: 'pending' },
    ],
    attachments: [],
  },
}
