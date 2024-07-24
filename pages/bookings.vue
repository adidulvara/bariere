<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Bookings</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <ul v-else class="space-y-4">
      <li v-for="booking in bookings" :key="booking.id" class="border p-4 rounded-lg">
        <p><strong>Vehicle:</strong> {{ booking?.vehicleType }}</p>
        <p><strong>License Plate:</strong> {{ booking?.licensePlate }}</p>
        <p><strong>Contact:</strong> {{ booking?.contactNumber }}</p>
        <p><strong>Status:</strong> {{ booking?.status }}</p>
        <p><strong>Created:</strong> {{ booking?.createdAt ? new Date(booking.createdAt).toLocaleString() : '' }}</p>
        <button @click="deleteBooking(booking.id)" class="mt-2 bg-red-500 text-white font-bold px-3 py-1 rounded hover:bg-red-600">
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Booking {
  id: string
  vehicleType: string
  licensePlate: string
  contactNumber: string
  status: string
  createdAt: string
}

const bookings = ref<Booking[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const fetchBookings = async () => {
  try {
    loading.value = true
    const response = await $fetch('/api/get-bookings')
    bookings.value = response
  } catch (err) {
    console.error('Error fetching bookings:', err)
    error.value = 'Failed to fetch bookings'
  } finally {
    loading.value = false
  }
}

const deleteBooking = async (id: string) => {
  try {
    await $fetch(`/api/delete-booking/${id}`, { method: 'DELETE' })
    bookings.value = bookings.value.filter(booking => booking.id !== id)
  } catch (err) {
    console.error('Error deleting booking:', err)
    error.value = 'Failed to delete booking'
  }
}

onMounted(() => {
  fetchBookings()
})
</script>