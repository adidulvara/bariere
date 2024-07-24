import { PrismaClient } from '@prisma/client'
import { H3Event } from 'h3'

const prisma = new PrismaClient()

export default defineEventHandler(async (event: H3Event) => {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return bookings
  } catch (error) {
    console.error('Error fetching bookings:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching bookings',
    })
  }
})
