<template>
  <div>
    <input type="text" v-model="newStatus" placeholder="New Status" />
    <button @click="updateStudentStatus">Update</button>
  </div>

  <div v-for="student in students" :key="student.id">
    <div>
      <div>{{ student.full_name }}</div>
      <div>{{ student.email }}</div>
      <div>{{ student.sekolah }}</div>
      <div>{{ student.status }}</div>
      <button @click="displayEdit(student)">Edit</button>
      <div>{{ student.createdAt }}</div>
      <br />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const students = ref([]);
const newStatus = ref("");
const router = useRouter();
let selectedStudentId = null;

const displayStudents = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/registrations/");
    const data = await res.json();
    students.value = data.docs;
  } catch (error) {
    console.error("Error fetching students:", error);
  }
};

const displayEdit = (student) => {
  newStatus.value = student.status; // Set status to the input field
  selectedStudentId = student.id; // Store the selected student's ID
  console.log("Editing student:", student);
};

const updateStudentStatus = async () => {
  const updatedData = { status: newStatus.value };

  if (selectedStudentId) {
    // Ensure there's a selected student ID before sending the request
    await fetch(
      `http://localhost:5000/api/registrations/${selectedStudentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );

    console.log("Status updated successfully!");
    newStatus.value = ""; // Clear the input field after update
    await displayStudents(); // Refresh the list after updating
  } else {
    console.error("No student selected for update.");
  }
};

onMounted(async () => {
  await displayStudents();
});
</script>
