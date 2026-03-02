import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const threeDaysAgo = new Date()
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)

  // Find scans from 3+ days ago that have no feedback
  const scansWithoutFeedback = await prisma.scan.findMany({
    where: {
      userId: session.user.id,
      createdAt: { lte: threeDaysAgo },
      wine: {
        feedback: {
          none: { userId: session.user.id },
        },
      },
    },
    include: { wine: true },
    orderBy: { createdAt: 'desc' },
    take: 1,
  })

  if (scansWithoutFeedback.length === 0) {
    return NextResponse.json({ pending: null })
  }

  const scan = scansWithoutFeedback[0]
  return NextResponse.json({
    pending: {
      scanId: scan.id,
      wineId: scan.wine.id,
      wineName: scan.wine.name,
      producer: scan.wine.producer,
      score: scan.score,
      matchColor: scan.matchColor,
      scannedAt: scan.createdAt,
    },
  })
}
