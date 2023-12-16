<template>
  <div v-for="student in students" :key="student.id" class="p-3">
    <div class="flex flex-row justify-between">
      <div class="w-full">{{ student.full_name }}</div>
      <div class="w-full">{{ student.email }}</div>
      <div class="w-full">{{ student.sekolah }}</div>
      <div :class="`status-display ${!student.isEdit ? 'block' : 'hidden'}`">
        {{ student.status }}
      </div>
      <div class="w-full">
        <select
          v-model="student.newStatus"
          :class="`status-edit ${student.isEdit ? 'block' : 'hidden'}`"
        >
          <option :value="student.status" disabled selected hidden>
            {{ student.status }}
          </option>
          <option value="Waiting">Waiting</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      <div class="w-full">
        <button
          @click="edit(student)"
          :class="`${!student.isEdit ? 'block' : 'hidden'}`"
        >
          Edit
        </button>
        <button
          @click="update(student)"
          :class="`${student.isEdit ? 'block' : 'hidden'}`"
        >
          Update
        </button>
      </div>
      <div class="w-full">{{ student.createdAt }}</div>
      <br />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const students = ref([]);
let studentId = null;

const displayStudents = async () => {
  const res = await fetch("http://localhost:5000/api/registrations/");
  const data = await res.json();
  students.value = data.docs.map((student) => ({
    ...student,
    newStatus: student.status,
  }));
};

const edit = (student) => {
  student.isEdit = !student.isEdit;
  studentId = student.id;
};

const update = async (student) => {
  await fetch(`http://localhost:5000/api/registrations/${studentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: student.newStatus }),
  });
  student.isEdit = !student.isEdit;
  await displayStudents();
};

onMounted(async () => {
  await displayStudents();
});
</script>
