import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { TasteVector } from '@/types/wine'
import { getFullMatch } from '@/lib/recommendation/matchAlgorithm'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const wine = await prisma.wine.findUnique({
    where: { id: params.id },
  })

  if (!wine) {
    return NextResponse.json({ error: 'Wine not found' }, { status: 404 })
  }

  // Find user's most recent scan of this wine
  const scan = await prisma.scan.findFirst({
    where: { userId: session.user.id, wineId: wine.id },
    orderBy: { createdAt: 'desc' },
  })

  // Find user's feedback for this wine
  const feedback = await prisma.feedback.findFirst({
    where: { userId: session.user.id, wineId: wine.id },
    orderBy: { createdAt: 'desc' },
  })

  // Generate match explanations if scanned
  let explanations = null
  if (scan?.score !== null && scan?.score !== undefined) {
    const user = await prisma.user.findUnique({ where: { id: session.user.id } })
    if (user?.tasteProfile && wine.tastVector) {
      const userTaste: TasteVector = JSON.parse(user.tasteProfile)
      const wineProfile: TasteVector = JSON.parse(wine.tastVector)
      const match = getFullMatch(userTaste, wineProfile)
      explanations = match.explanations
    }
  }

  // Parse JSON fields server-side
  const tastVector = wine.tastVector ? JSON.parse(wine.tastVector) : null
  const foodPairings = wine.foodPairings ? JSON.parse(wine.foodPairings) : []

  return NextResponse.json({
    wine: {
      ...wine,
      tastVector,
      foodPairings,
    },
    scan: scan ? {
      id: scan.id,
      score: scan.score,
      matchColor: scan.matchColor,
      createdAt: scan.createdAt,
    } : null,
    feedback: feedback ? {
      id: feedback.id,
      rating: feedback.rating,
    } : null,
    explanations,
  })
}
