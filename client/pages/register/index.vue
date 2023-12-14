<template>
  <div>
    <input type="text" v-model="fullName" placeholder="Full Name" />
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

const fullName = ref("");
const email = ref("");
const school = ref("");
const status = ref("waiting");

const submitForm = async () => {
  const formData = {
    full_name: fullName.value,
    email: email.value,
    sekolah: school.value,
    status: status.value,
  };

  const response = await fetch("http://localhost:5000/api/registrations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    fullName.value = "";
    email.value = "";
    school.value = "";

    alert("Success!");
  } else {
    alert("Fail!");
  }
};
</script>
