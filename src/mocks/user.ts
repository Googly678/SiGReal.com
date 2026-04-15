import type { UserInfo } from '../store/auth'

export const mockUserInfo: UserInfo = {
  id: 'u001',
  name: '张明远',
  phone: '13812345678',
  companyName: '顺丰物流科技有限公司',
  companyId: 'comp001',
  role: 'admin',
  avatar: '',
}

export const mockCompanyInfo = {
  id: 'comp001',
  name: '顺丰物流科技有限公司',
  licenseNo: '91440300MA5DXXXX00',
  address: '广东省深圳市宝安区顺丰科技园101号',
  contactName: '张明远',
  contactPhone: '13812345678',
  industry: '物流运输',
}
