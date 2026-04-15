import { useEffect, useRef, useState } from 'react'
import { useIMStore, type IMMessage } from '../../store/im'
import { IMService } from '../../services/im'
import { useAuthStore } from '../../store/auth'
import styles from './IMModal.module.css'

const CHANNEL_NAMES: Record<string, string> = {
  'insure-service': '投保服务',
  'claim-service': '理赔服务',
  'announcement': '公告信息',
}

export default function IMModal() {
  const { isModalOpen, activeChannel, closeIM, addMessage, markRead, messages } = useIMStore()
  const userInfo = useAuthStore((s) => s.userInfo)
  const [inputText, setInputText] = useState('')
  const [isSending, setIsSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const channelId = activeChannel ?? ''
  const channelMessages: IMMessage[] = messages[channelId] ?? []

  useEffect(() => {
    if (!isModalOpen || !channelId) return
    document.body.classList.add('modal-open')
    markRead(channelId)

    // 添加欢迎消息（若频道无消息）
    if ((messages[channelId] ?? []).length === 0) {
      const welcomeMsg: IMMessage = {
        id: `welcome-${Date.now()}`,
        from: 'agent',
        content: `您好！欢迎使用${CHANNEL_NAMES[channelId] ?? '客服'}，我们将竭诚为您服务。`,
        timestamp: Date.now(),
        type: 'text',
        isOwn: false,
      }
      addMessage(channelId, welcomeMsg)
    }

    IMService.onMessage((msg) => {
      const newMsg: IMMessage = {
        id: `msg-${Date.now()}`,
        from: msg.from,
        content: msg.content,
        timestamp: msg.timestamp,
        type: msg.type,
        isOwn: false,
      }
      addMessage(channelId, newMsg)
    })

    return () => {
      document.body.classList.remove('modal-open')
      IMService.offMessage()
    }
  }, [isModalOpen, channelId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [channelMessages.length])

  if (!isModalOpen) return null

  const handleSend = async () => {
    const text = inputText.trim()
    if (!text || isSending) return

    const ownMsg: IMMessage = {
      id: `own-${Date.now()}`,
      from: userInfo?.name ?? '我',
      content: text,
      timestamp: Date.now(),
      type: 'text',
      isOwn: true,
    }
    addMessage(channelId, ownMsg)
    setInputText('')
    setIsSending(true)

    await IMService.sendMessage({ channelId, content: text, type: 'text' })
    setIsSending(false)
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className={styles.overlay} onClick={closeIM}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerInfo}>
            <span className={styles.headerTitle}>{CHANNEL_NAMES[channelId] ?? '客服'}</span>
            <span className={styles.headerSubtitle}>在线客服</span>
          </div>
          <button className={styles.closeBtn} onClick={closeIM} aria-label="关闭">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 5l10 10M15 5L5 15" stroke="rgba(0,0,0,0.48)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className={styles.messages}>
          {channelMessages.map((msg) => (
            <div key={msg.id} className={`${styles.bubble} ${msg.isOwn ? styles.ownBubble : styles.agentBubble}`}>
              {!msg.isOwn && (
                <div className={styles.agentAvatar}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1.5C5.5 1.5 3.5 3 3.5 5c0 1.6.9 2.9 2.2 3.6L4 12h8l-1.7-3.4C11.6 7.9 12.5 6.6 12.5 5c0-2-2-3.5-4.5-3.5z" fill="white" />
                  </svg>
                </div>
              )}
              <div className={`${styles.bubbleContent} ${msg.isOwn ? styles.ownContent : styles.agentContent}`}>
                <span>{msg.content}</span>
                <time className={styles.time}>
                  {new Date(msg.timestamp).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                </time>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className={styles.inputArea}>
          <input
            ref={inputRef}
            className={styles.textInput}
            placeholder="输入消息..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className={`${styles.sendBtn} ${inputText.trim() ? styles.sendBtnActive : ''}`}
            onClick={handleSend}
            disabled={!inputText.trim() || isSending}
            aria-label="发送"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 10L17 3l-5 14-3-4-4-3z" fill="white" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
