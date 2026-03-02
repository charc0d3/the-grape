import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { TasteVector } from '@/types/wine'
import { generateExplanation } from '@/lib/recommendation/matchAlgorithm'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const scan = await prisma.scan.findUnique({
    where: { id: params.id },
    include: { wine: true },
  })

  if (!scan) {
    return NextResponse.json({ error: 'Scan not found' }, { status: 404 })
  }

  if (scan.userId !== session.user.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } })

  let explanations = null
  if (user?.tasteProfile && scan.wine.tastVector && scan.score !== null) {
    const userTaste: TasteVector = JSON.parse(user.tasteProfile)
    const wineProfile: TasteVector = JSON.parse(scan.wine.tastVector)
    explanations = generateExplanation(userTaste, wineProfile, scan.score)
  }

  return NextResponse.json({
    scan,
    wine: scan.wine,
    score: scan.score,
    matchColor: scan.matchColor,
    explanations,
  })
}
