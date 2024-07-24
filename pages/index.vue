<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
    <h1 class="text-3xl font-bold text-center mb-6 text-blue-600">Trecere Bac Brăila</h1>
    
    <!-- Step 1: Vehicle Selection -->
    <div v-if="step === 1" class="space-y-4">
      <button
        v-for="vehicle in vehicleTypes"
        :key="vehicle.type"
        @click="selectVehicle(vehicle.type)"
        class="w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 flex items-center justify-between"
      >
        <div class="flex items-center space-x-2">
          <span class="text-2xl">{{ vehicle.icon }}</span>
          <span>{{ vehicle.label }}</span>
        </div>
        <span class="font-bold">{{ vehicle.price }} RON</span>
      </button>
    </div>

    <!-- Step 2: License Plate and Phone Number -->
    <div v-if="step === 2" class="space-y-4">
      <button @click="goToStep(1)" class="mb-4 flex items-center text-blue-600 hover:text-blue-800">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Înapoi  
      </button>
      <div>
        <label for="licensePlate" class="block text-sm font-medium text-gray-700">Număr de înmatriculare</label>
        <input
          type="text"
          id="licensePlate"
          v-model="licensePlate"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          placeholder="e.g., BR 01 ABC"
        >
      </div>
      <div>
        <label for="phoneNumber" class="block text-sm font-medium text-gray-700">Număr de telefon</label>
        <input
          type="tel"
          id="phoneNumber"
          v-model="phoneNumber"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          placeholder="e.g., 0712 345 678"
        >
      </div>    
      <button
        @click="goToStep(3)"
        class="w-full py-3 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
      >
        Continuă
      </button>
    </div>

    <!-- Step 3: Tariff Selection -->
    <div v-if="step === 3" class="space-y-4">
      <button @click="goToStep(2)" class="mb-4 flex items-center text-blue-600 hover:text-blue-800">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Înapoi
      </button>
      <div class="space-y-2">
        <label class="text-lg font-medium text-gray-700">Selectați tariful:</label>
        <div v-for="tariff in tariffs" :key="tariff.type" class="flex items-center space-x-3">
          <input
            type="radio"
            :id="tariff.type"
            :value="tariff.type"
            v-model="selectedTariff"
            class="form-radio h-5 w-5 text-blue-600"
          >
          <label :for="tariff.type" class="flex flex-col">
            <span class="font-medium">{{ tariff.label }}</span>
            <span class="text-sm text-gray-500">{{ tariff.hours }}</span>
            <span class="font-bold">Preț: {{ calculatePrice(tariff.type) }} RON</span>
          </label>
        </div>
      </div>
      <button
        @click="goToStep(4)"
        :disabled="!selectedTariff"
        class="w-full py-3 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continuă
      </button>
    </div>

    <!-- Step 4: Confirmation -->
    <div v-if="step === 4" class="space-y-4">
      <button @click="goToStep(3)" class="mb-4 flex items-center text-blue-600 hover:text-blue-800">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Înapoi
      </button>
      <div class="bg-gray-100 p-4 rounded-lg">
        <h2 class="font-bold text-lg mb-2">Rezumat rezervare:</h2>
        <p><strong>Vehicul:</strong> {{ getVehicleLabel() }}</p>
        <p><strong>Număr de înmatriculare:</strong> {{ licensePlate }}</p>
        <p><strong>Număr de telefon:</strong> {{ phoneNumber }}</p>
        <p><strong>Tarif:</strong> {{ getTariffLabel() }}</p>
        <p><strong>Preț total:</strong> {{ calculatePrice(selectedTariff) }} RON</p>
      </div>
      <button
        @click="submitBooking"
        class="w-full py-3 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
      >
        Confirmă și plătește
      </button>
    </div>

    <!-- Step 5: Booking Successful -->
    <div v-if="step === 5" class="space-y-4">
      <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
        <p class="font-bold">Booking Successful!</p>
        <p>Your booking has been confirmed.</p>
      </div>
      <button
        @click="goHome"
        class="w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Go Back Home
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const step = ref(1);
const selectedVehicle = ref('');
const licensePlate = ref('');
const phoneNumber = ref('');
const selectedTariff = ref('');

const vehicleTypes = [
  { type: 'CAR_SUV', label: 'Mașină / SUV', icon: '🚗', price: 30 },
  { type: 'TRUCK', label: 'Camion', icon: '🚚', price: 250 },
  { type: 'MINITRUCK', label: 'Dubă', icon: '🚐', price: 40 },
];

const tariffs = [
  { type: 'DAY', label: 'Tarif zi', hours: '06:00 - 21:59' },
  { type: 'NIGHT', label: 'Tarif noapte', hours: '22:00 - 05:59' },
];

const goToStep = (nextStep: number) => {
  step.value = nextStep;
};

const selectVehicle = (type: string) => {
  selectedVehicle.value = type;
  step.value = 2;
};

const calculatePrice = (tariffType: string) => {
  const vehicle = vehicleTypes.find(v => v.type === selectedVehicle.value);
  if (!vehicle) return 0;
  
  return tariffType === 'NIGHT' ? vehicle.price + 150 : vehicle.price;
};

const getVehicleLabel = () => {
  const vehicle = vehicleTypes.find(v => v.type === selectedVehicle.value);
  return vehicle ? vehicle.label : '';
};

const getTariffLabel = () => {
  const tariff = tariffs.find(t => t.type === selectedTariff.value);
  return tariff ? tariff.label : '';
};

const submitBooking = async () => {
  const bookingData = {
    vehicleType: selectedVehicle.value,
    licensePlate: licensePlate.value,
    phoneNumber: phoneNumber.value,
    tariff: selectedTariff.value,
  };

  try {
    const response = await $fetch('/api/create-booking', {
      method: 'POST',
      body: bookingData,
    });
    console.log('Booking created:', response);
    step.value = 5; // Move to the success step
  } catch (error) {
    console.error('Error creating booking:', error);
    // TODO: Handle error (e.g., show error message to user)
  }
};

const goHome = () => {
  // Reset all form fields
  selectedVehicle.value = '';
  licensePlate.value = '';
  phoneNumber.value = '';
  selectedTariff.value = '';
  step.value = 1; // Go back to the first step
};

</script>