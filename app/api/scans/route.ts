import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const tab = request.nextUrl.searchParams.get('tab') || 'scanned'

  let scans

  if (tab === 'loved') {
    // Wines with thumbs_up feedback
    scans = await prisma.scan.findMany({
      where: {
        userId: session.user.id,
        wine: {
          feedback: {
            some: { userId: session.user.id, rating: 'thumbs_up' },
          },
        },
      },
      include: {
        wine: {
          include: {
            feedback: {
              where: { userId: session.user.id },
              take: 1,
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
  } else if (tab === 'tried') {
    // Wines with any feedback
    scans = await prisma.scan.findMany({
      where: {
        userId: session.user.id,
        wine: {
          feedback: {
            some: { userId: session.user.id },
          },
        },
      },
      include: {
        wine: {
          include: {
            feedback: {
              where: { userId: session.user.id },
              take: 1,
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
  } else {
    // All scanned wines
    scans = await prisma.scan.findMany({
      where: { userId: session.user.id },
      include: {
        wine: {
          include: {
            feedback: {
              where: { userId: session.user.id },
              take: 1,
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
  }

  // Deduplicate by wineId (keep most recent scan)
  const seen = new Set<string>()
  const unique = scans.filter((scan) => {
    if (seen.has(scan.wineId)) return false
    seen.add(scan.wineId)
    return true
  })

  const result = unique.map((scan) => ({
    id: scan.id,
    wineId: scan.wine.id,
    wineName: scan.wine.name,
    producer: scan.wine.producer,
    region: scan.wine.region,
    grape: scan.wine.grape,
    vintage: scan.wine.vintage,
    type: scan.wine.type,
    score: scan.score,
    matchColor: scan.matchColor,
    scannedAt: scan.createdAt,
    feedback: scan.wine.feedback[0]?.rating || null,
  }))

  return NextResponse.json({ scans: result })
}
