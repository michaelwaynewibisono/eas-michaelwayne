<template>
  <div
    class="absolute top-60 left-1/2 transform -translate-x-1/2 md:w-[30%] w-[90%]"
  >
    <div class="flex gap-2">
      <input
        v-model="searchByEmail"
        type="text"
        class="focus:outline-none bg-[#F9E8D9] p-2 w-full rounded-sm"
        placeholder="Search your email"
      />
      <button
        @click="search"
        class="bg-[#EE7214] bg-opacity-90 hover:bg-opacity-100 text-[#f8f8f8] rounded-sm p-2"
      >
        Search
      </button>
    </div>
  </div>

  <div
    v-if="student"
    class="min-h-screen flex flex-col justify-center items-center"
  >
    <div class="bg-[#527853] text-[#F9E8D9] rounded-md md:w-[30%] w-[90%] p-4">
      <table class="bg-[#527853] text-[#F9E8D9] rounded-md w-full">
        <tr>
          <td>Nama</td>
          <td class="pr-3">:</td>
          <td>{{ student.full_name }}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td class="pr-3">:</td>
          <td>{{ student.email }}</td>
        </tr>
        <tr>
          <td>Asal Sekolah</td>
          <td class="pr-3">:</td>
          <td>{{ student.sekolah }}</td>
        </tr>
        <tr>
          <td>Status</td>
          <td class="pr-3">:</td>
          <td>{{ student.status }}</td>
        </tr>
        <tr>
          <td>Created At</td>
          <td class="pr-3">:</td>
          <td>{{ student.createdAt }}</td>
        </tr>
      </table>
    </div>
  </div>

  <div
    v-else-if="result === false"
    class="min-h-screen w-full justify-center items-center flex flex-col"
  >
    <p>Can't find email</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const searchByEmail = ref("");
const student = ref(null);
const result = ref(true);

const search = async () => {
  const response = await fetch(`http://localhost:5000/api/registrations`);
  const data = await response.json();
  student.value = data.docs.find(
    (student) => student.email === searchByEmail.value
  );
  result.value = student.value ? true : false;
};
</script>
