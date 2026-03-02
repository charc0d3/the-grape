import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { TasteVector } from '@/types/wine'
import { getFullMatch } from '@/lib/recommendation/matchAlgorithm'

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { wineId } = await request.json()
  if (!wineId) {
    return NextResponse.json({ error: 'wineId is required' }, { status: 400 })
  }

  const [user, wine] = await Promise.all([
    prisma.user.findUnique({ where: { id: session.user.id } }),
    prisma.wine.findUnique({ where: { id: wineId } }),
  ])

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }
  if (!wine) {
    return NextResponse.json({ error: 'Wine not found' }, { status: 404 })
  }
  if (!user.tasteProfile) {
    return NextResponse.json({ error: 'Complete onboarding first' }, { status: 400 })
  }
  if (!wine.tastVector) {
    return NextResponse.json({ error: 'Wine has no taste profile' }, { status: 400 })
  }

  const userTaste: TasteVector = JSON.parse(user.tasteProfile)
  const wineProfile: TasteVector = JSON.parse(wine.tastVector)
  const match = getFullMatch(userTaste, wineProfile)

  const scan = await prisma.scan.create({
    data: {
      userId: session.user.id,
      wineId: wine.id,
      score: match.score,
      matchColor: match.matchColor,
    },
  })

  return NextResponse.json({
    scan,
    wine,
    score: match.score,
    matchColor: match.matchColor,
    explanations: match.explanations,
  })
}
