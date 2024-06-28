import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()
  const { id: queryId } = router.query

  return <p>Post: {queryId}</p>
}
