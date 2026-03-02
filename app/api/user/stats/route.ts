import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const [user, scanCount, feedbackCount] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        personality: true,
        tasteProfile: true,
        email: true,
      },
    }),
    prisma.scan.count({ where: { userId: session.user.id } }),
    prisma.feedback.count({ where: { userId: session.user.id } }),
  ])

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  return NextResponse.json({
    email: user.email,
    personality: user.personality,
    tasteProfile: user.tasteProfile ? JSON.parse(user.tasteProfile) : null,
    scanCount,
    feedbackCount,
  })
}
