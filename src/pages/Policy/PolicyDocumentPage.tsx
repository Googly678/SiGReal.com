import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import PageHeader from '../../components/PageHeader/PageHeader'
import { mockPolicyDetails } from '../../mocks/policy'
import styles from './PolicyDocumentPage.module.css'

export default function PolicyDocumentPage() {
  const { id } = useParams<{ id: string }>()
  const detail = useMemo(() => (id ? mockPolicyDetails[id] : undefined), [id])

  if (!detail) return <div>保单不存在</div>

  return (
    <div className={styles.page}>
      <PageHeader
        title="电子保单"
        showBack
        right={
          <a
            className={styles.downloadLink}
            href={detail.documentUrl}
            download={`${detail.policyNo}.pdf`}
          >
            下载
          </a>
        }
      />
      <div className={styles.previewArea}>
        <iframe
          title="电子保单预览"
          src={detail.documentUrl}
          className={styles.iframe}
        />
      </div>
    </div>
  )
}
