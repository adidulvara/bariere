-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('CAR_SUV', 'MINITRUCK', 'TRUCK', 'LORRY_TRUCK', 'BUS', 'OTHER');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "vehicleType" "VehicleType" NOT NULL,
    "bookingTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "crossingTime" TIMESTAMP(3),
    "qrCodeUrl" TEXT,
    "receiptUrl" TEXT,
    "contactNumber" TEXT NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);
