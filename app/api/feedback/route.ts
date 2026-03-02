import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { TasteVector } from '@/types/wine'
import { updateTasteProfile } from '@/lib/recommendation/tasteUpdate'

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { wineId, rating } = await request.json()

  if (!wineId || !['thumbs_up', 'neutral', 'thumbs_down'].includes(rating)) {
    return NextResponse.json({ error: 'wineId and valid rating required' }, { status: 400 })
  }

  const [user, wine] = await Promise.all([
    prisma.user.findUnique({ where: { id: session.user.id } }),
    prisma.wine.findUnique({ where: { id: wineId } }),
  ])

  if (!user || !wine) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  // Check for existing feedback on this wine
  const existing = await prisma.feedback.findFirst({
    where: { userId: session.user.id, wineId },
  })

  if (existing) {
    // Update existing feedback
    await prisma.feedback.update({
      where: { id: existing.id },
      data: { rating },
    })
  } else {
    // Create new feedback
    await prisma.feedback.create({
      data: {
        userId: session.user.id,
        wineId,
        rating,
      },
    })
  }

  // Update taste profile if user has one and wine has a vector
  if (user.tasteProfile && wine.tastVector) {
    const currentTaste: TasteVector = JSON.parse(user.tasteProfile)
    const wineProfile: TasteVector = JSON.parse(wine.tastVector)

    const feedbackCount = await prisma.feedback.count({
      where: { userId: session.user.id },
    })

    const newTaste = updateTasteProfile(
      currentTaste,
      wineProfile,
      rating as 'thumbs_up' | 'neutral' | 'thumbs_down',
      feedbackCount
    )

    await prisma.user.update({
      where: { id: session.user.id },
      data: { tasteProfile: JSON.stringify(newTaste) },
    })

    return NextResponse.json({ success: true, tasteUpdated: true, newTaste })
  }

  return NextResponse.json({ success: true, tasteUpdated: false })
}
