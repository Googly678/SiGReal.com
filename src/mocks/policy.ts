import type { Policy, PolicyDetail, ClaimRecord } from '../api/policy'

const claimHistory: ClaimRecord[] = [
  { claimId: 'c001', claimNo: 'CLM-2025-001', claimType: '货物损失', amount: 35000, date: '2025-08-15', status: '已赔付' },
  { claimId: 'c002', claimNo: 'CLM-2025-008', claimType: '盗窃损失', amount: 12000, date: '2025-11-03', status: '已赔付' },
]

export const mockPolicies: Policy[] = [
  {
    id: 'pol001',
    policyNo: 'PICC-2025-GH-001234',
    productName: '物流货运综合险',
    insurer: '中国人保',
    category: '货运险',
    subject: '整车货物',
    insuredName: '顺丰物流科技有限公司',
    coverage: 500,
    remainingCoverage: 453,
    premium: 28000,
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    status: 'active',
  },
  {
    id: 'pol002',
    policyNo: 'PA-2025-LL-005678',
    productName: '冷链运输险',
    insurer: '平安保险',
    category: '货运险',
    subject: '冷链货物',
    insuredName: '顺丰物流科技有限公司',
    coverage: 200,
    remainingCoverage: 200,
    premium: 15000,
    startDate: '2025-03-01',
    endDate: '2026-02-28',
    status: 'active',
  },
  {
    id: 'pol003',
    policyNo: 'CPIC-2024-ER-009012',
    productName: '物流雇主责任险',
    insurer: '太平洋保险',
    category: '雇主险',
    subject: '员工',
    insuredName: '顺丰物流科技有限公司',
    coverage: 100,
    remainingCoverage: 0,
    premium: 9800,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'expired',
  },
  {
    id: 'pol004',
    policyNo: 'CPIC-2025-ER-003456',
    productName: '物流雇主责任险',
    insurer: '太平洋保险',
    category: '雇主险',
    subject: '员工',
    insuredName: '顺丰物流科技有限公司',
    coverage: 100,
    remainingCoverage: 100,
    premium: 10500,
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    status: 'active',
  },
]

export const mockPolicyDetails: Record<string, PolicyDetail> = {
  pol001: {
    ...mockPolicies[0],
    claimHistory,
    documentUrl: '/mock-documents/policy-pol001.pdf',
  },
  pol002: {
    ...mockPolicies[1],
    claimHistory: [],
    documentUrl: '/mock-documents/policy-pol002.pdf',
  },
  pol003: {
    ...mockPolicies[2],
    claimHistory: [
      { claimId: 'c003', claimNo: 'CLM-2024-015', claimType: '工伤', amount: 25000, date: '2024-06-20', status: '已赔付' },
    ],
    documentUrl: '/mock-documents/policy-pol003.pdf',
  },
  pol004: {
    ...mockPolicies[3],
    claimHistory: [],
    documentUrl: '/mock-documents/policy-pol004.pdf',
  },
}
