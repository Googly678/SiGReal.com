import { get, post } from './request'

export interface InsuranceProduct {
  id: string
  name: string
  insurer: string
  insurerLogo?: string
  category: string        // 保险种类
  subject: string         // 保险标的
  minCoverage: number     // 最低保额（万元）
  maxCoverage: number     // 最高保额（万元）
  priceFrom: number       // 起始保费（元/年）
  tags: string[]
  summary: string
}

export interface InsuranceDetail extends InsuranceProduct {
  introduction: string    // 保险介绍
  coverage: string        // 保额说明（富文本/HTML）
  notice: string          // 投保须知
  specialTerms: string    // 特约条款
  disclosure: string      // 告知
  samplePolicyUrl: string // 示例保单 PDF URL
}

export interface InsuranceListParams {
  keyword?: string
  category?: string
  subject?: string
  insurer?: string
  page?: number
  pageSize?: number
}

export const getInsuranceProducts = (params?: InsuranceListParams) =>
  get<{ list: InsuranceProduct[]; total: number }>('/insurance/products', params as Record<string, unknown>)

export const getInsuranceDetail = (id: string) =>
  get<InsuranceDetail>(`/insurance/products/${id}`)

export interface QuoteParams {
  productId: string
  insuredName: string
  insuredIdType: string
  insuredIdNo: string
  insuredPhone: string
  coverage: number
  startDate: string
  endDate: string
}

export const createOrder = (data: QuoteParams) =>
  post<{ orderId: string; premium: number }>('/insurance/orders', data)

export const getInsuranceCategories = () =>
  get<string[]>('/insurance/categories')

export const getInsuranceSubjects = () =>
  get<string[]>('/insurance/subjects')

export const getInsurers = () =>
  get<string[]>('/insurance/insurers')
