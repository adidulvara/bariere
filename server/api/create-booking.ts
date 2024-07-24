import { PrismaClient } from '@prisma/client'
import { H3Event } from 'h3'

const prisma = new PrismaClient()

export default defineEventHandler(async (event: H3Event) => {
  try {
    const body = await readBody(event)
    
    const { vehicleType, licensePlate, phoneNumber, tariff } = body

    if (!vehicleType || !licensePlate || !phoneNumber || !tariff) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields',
      })
    }

    const booking = await prisma.booking.create({
      data: {
        vehicleType,
        licensePlate,
        contactNumber: phoneNumber,
        status: 'PENDING',
        // You might want to add more fields here based on your schema
      },
    })

    return booking
  } catch (error) {
    console.error('Error creating booking:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error creating booking',
    })
  }
})
