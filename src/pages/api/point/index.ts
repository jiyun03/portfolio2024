import type { NextApiRequest, NextApiResponse } from 'next'
import { ProjectDetails, Portfolio } from '@/types/point'
import jsonFile from './point.json'

const portfolio: Portfolio = jsonFile as Portfolio

export default async function handler(req: NextApiRequest, res: NextApiResponse<Portfolio | ProjectDetails | { error: string }>) {
  const { id } = req.query

  try {
    if (id) {
      const project = portfolio[id as string]
      if (project) {
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
