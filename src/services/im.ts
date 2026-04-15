/**
 * IM 服务抽象层
 * 初始接口按腾讯云 IM SDK 设计，可无缝切换环信等其他 SDK
 * 实际接入时替换 APP_ID 及以下实现即可
 */

export interface IMConfig {
  appId: string
  userId: string
  userSig: string
}

export interface IMMessagePayload {
  channelId: string
  content: string
  type: 'text' | 'image' | 'file'
  fileUrl?: string
}

export interface IMServiceInterface {
  init: (config: IMConfig) => Promise<void>
  login: (userId: string, userSig: string) => Promise<void>
  logout: () => Promise<void>
  sendMessage: (payload: IMMessagePayload) => Promise<void>
  onMessage: (handler: (msg: IMMessagePayload & { from: string; timestamp: number }) => void) => void
  offMessage: () => void
  destroy: () => void
}

// ── 模拟实现（开发阶段） ──────────────────────────────────────────
const messageHandlers: Array<(msg: IMMessagePayload & { from: string; timestamp: number }) => void> = []

const MockIMService: IMServiceInterface = {
  init: async (_config: IMConfig) => {
    console.log('[IM] Initialized with appId:', _config.appId)
  },
  login: async (userId: string, _userSig: string) => {
    console.log('[IM] Logged in as:', userId)
  },
  logout: async () => {
    console.log('[IM] Logged out')
  },
  sendMessage: async (payload: IMMessagePayload) => {
    console.log('[IM] Message sent:', payload)
    // 模拟客服自动回复
    setTimeout(() => {
      const reply: IMMessagePayload & { from: string; timestamp: number } = {
        channelId: payload.channelId,
        content: getAutoReply(payload.channelId),
        type: 'text',
        from: 'agent',
        timestamp: Date.now(),
      }
      messageHandlers.forEach((h) => h(reply))
    }, 1200)
  },
  onMessage: (handler) => {
    messageHandlers.push(handler)
  },
  offMessage: () => {
    messageHandlers.length = 0
  },
  destroy: () => {
    messageHandlers.length = 0
  },
}

function getAutoReply(channelId: string): string {
  const replies: Record<string, string[]> = {
    'insure-service': [
      '您好！感谢您的咨询，我是您的专属投保顾问，请问有什么可以帮助您？',
      '我们的保险产品覆盖货运、冷链、雇主责任等多个险种，可以为您详细介绍。',
      '请稍候，我们将在1-3分钟内为您连接专业顾问。',
    ],
    'claim-service': [
      '您好！我是理赔服务专员，请提供您的报案号，我将协助您跟进理赔进度。',
      '材料审核中，预计1-2个工作日完成，请耐心等待。',
      '如需紧急处理，请拨打24小时理赔热线：400-XXX-XXXX。',
    ],
    'announcement': [
      '您好，这里是公告信息频道，如有疑问请联系客服。',
    ],
  }
  const list = replies[channelId] ?? replies['insure-service']
  return list[Math.floor(Math.random() * list.length)]
}

// ── 待接入腾讯云 IM 时替换此处 ──────────────────────────────────
// import TencentCloudChat from '@tencentcloud/chat'
// const TencentIMService: IMServiceInterface = { ... }

export const IMService: IMServiceInterface = MockIMService

export const IM_APP_ID = import.meta.env.VITE_IM_APP_ID ?? '1400000000'
