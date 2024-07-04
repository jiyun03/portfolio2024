import type { NextApiRequest, NextApiResponse } from 'next'
import { ProjectDetails, Portfolio } from '@/types/point'
import jsonFile from './point.json'

const portfolio: Portfolio = jsonFile as Portfolio

export default async function handler(req: NextApiRequest, res: NextApiResponse<Portfolio | ProjectDetails | { error: string }>) {
  const { id } = req.query

  try {
    if (id) {
      const projectId = id as string
      const project = portfolio[projectId]

      if (project) {
        // 이전 프로젝트와 다음 프로젝트
        const projectIds = Object.keys(portfolio)
        const currentIndex = projectIds.indexOf(projectId)

        const prevProjectId = currentIndex > 0 ? projectIds[currentIndex - 1] : null
        const nextProjectId = currentIndex < projectIds.length - 1 ? projectIds[currentIndex + 1] : null

        project.btn = {
          prev: prevProjectId ? portfolio[prevProjectId].name : '',
          next: nextProjectId ? portfolio[nextProjectId].name : '',
        }

        res.status(200).json(project)
      } else {
        res.status(404).json({ error: '프로젝트를 찾을 수 없습니다' })
      }
    } else {
      res.status(200).json(portfolio)
    }
  } catch (err) {
    res.status(500).json({ error: '데이터를 불러오는데 실패했습니다' })
  }
}
