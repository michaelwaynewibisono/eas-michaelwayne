<template>
  <div
    class="flex flex-col min-h-screen w-full justify-center items-center gap-3 bg-[#f8f8f8]"
  >
    <input type="text" v-model="full_name" placeholder="Full Name" />
    <input type="email" v-model="email" placeholder="Email" />
    <input type="text" v-model="school" placeholder="Asal Sekolah" />
    <input
      type="text"
      v-model="status"
      placeholder="Asal Sekolah"
      class="hidden"
    />
    <button @click="submitForm">Submit</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const full_name = ref("");
const email = ref("");
const school = ref("");
const status = ref("Waiting");

const submitForm = async () => {
  const response = await fetch("http://localhost:5000/api/registrations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      full_name: full_name.value,
      email: email.value,
      sekolah: school.value,
      status: status.value,
    }),
  });

  if (response.ok) {
    full_name.value = "";
    email.value = "";
    school.value = "";

    alert("Success!");
  } else {
    alert("Can't use this email");
  }
};
</script>
