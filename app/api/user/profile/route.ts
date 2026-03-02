import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { TasteVector } from '@/types/wine'

const TASTE_DIMENSIONS: (keyof TasteVector)[] = [
  'acidity', 'tannin', 'fruit', 'sweetness', 'body', 'style',
]

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        personality: true,
        tasteProfile: true,
        onboardingCompleted: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({
      personality: user.personality,
      tasteProfile: user.tasteProfile ? JSON.parse(user.tasteProfile) : null,
      onboardingCompleted: user.onboardingCompleted,
    })
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { tasteProfile } = await request.json()

  if (!tasteProfile || typeof tasteProfile !== 'object') {
    return NextResponse.json({ error: 'Invalid taste profile' }, { status: 400 })
  }

  // Validate all dimensions are present and in range
  for (const dim of TASTE_DIMENSIONS) {
    const val = tasteProfile[dim]
    if (typeof val !== 'number' || val < 0 || val > 1) {
      return NextResponse.json(
        { error: `Invalid value for ${dim}: must be 0-1` },
        { status: 400 }
      )
    }
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { tasteProfile: JSON.stringify(tasteProfile) },
  })

  return NextResponse.json({ success: true, tasteProfile })
}
