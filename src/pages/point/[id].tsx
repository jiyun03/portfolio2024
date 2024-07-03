import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ProjectDetails } from '@/types/point'

export default function Page() {
  const router = useRouter()
  const { id: queryId } = router.query
  const [pointDetail, setPointDetail] = useState<ProjectDetails | null>(null)

  useEffect(() => {
    const fetchProject = async () => {
      const response = await fetch(`/api/point?id=${queryId}`)
      const data = await response.json()
      setPointDetail(data)
      console.log(data)
    }

    if (queryId) {
      fetchProject()
    }
  }, [queryId])

  return <p>Post: {queryId}</p>
}
