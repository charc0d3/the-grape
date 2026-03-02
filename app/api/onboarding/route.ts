import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { calculateTasteVector, determinePersonality } from '@/lib/recommendation/tasteCalculator'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { answers } = await request.json()

    if (!answers || typeof answers !== 'object') {
      return NextResponse.json({ error: 'Invalid answers' }, { status: 400 })
    }

    const tasteVector = calculateTasteVector(answers)
    const personalityId = determinePersonality(tasteVector)

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        tasteProfile: JSON.stringify(tasteVector),
        personality: personalityId,
        onboardingCompleted: true,
        onboardingAnswers: JSON.stringify(answers),
      },
    })

    return NextResponse.json({
      personality: personalityId,
      tasteVector,
    })
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
