import { PrismaClient } from '@prisma/client'
import { H3Event } from 'h3'

const prisma = new PrismaClient()

export default defineEventHandler(async (event: H3Event) => {
  try {
    const id = event.context.params?.id

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing booking ID',
      })
    }

    const deletedBooking = await prisma.booking.delete({
      where: { id },
    })

    return deletedBooking
  } catch (error) {
    console.error('Error deleting booking:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error deleting booking',
    })
  }
})
