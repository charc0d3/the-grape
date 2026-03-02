import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')

  if (!q || q.trim().length < 2) {
    return NextResponse.json({ wines: [] })
  }

  const wines = await prisma.wine.findMany({
    where: {
      OR: [
        { name: { contains: q.trim() } },
        { producer: { contains: q.trim() } },
        { grape: { contains: q.trim() } },
      ],
    },
    take: 10,
    orderBy: { name: 'asc' },
  })

  return NextResponse.json({ wines })
}
