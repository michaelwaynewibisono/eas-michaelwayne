<template>
  <input v-model="searchByEmail" type="text" />
  <button @click="triggerBelowDiv">search</button>
  <div>
    <div>
      <div>{{ student.full_name }}</div>
      <div>{{ student.email }}</div>
      <div>{{ student.sekolah }}</div>
      <div>{{ student.status }}</div>
      <div>{{ student.createdAt }}</div>
      <br />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const students = ref([]);

const displayStudents = async () => {
  const res = await fetch("http://localhost:5000/api/registrations/");
  const data = await res.json();
  students.value = data.docs;
};

onMounted(async () => {
  displayStudents();
});
</script>
