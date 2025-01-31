<template>
  <div class="team-container">
    <!-- Team Name at the Top -->
    <header class="team-header">
      <h1>{{ teamName || "Join a Team" }}</h1>
    </header>

    <!-- Buzz Button -->
    <div class="buzz-container">
      <button v-if="teamName" @click="buzz" :disabled="hasBuzzed" class="buzz-button">
        {{ hasBuzzed ? "Buzzed!" : "Buzz!" }}
      </button>

      <!-- Join Form -->
      <div v-else class="join-form">
        <input
            v-model="teamInput"
            placeholder="Enter Team Name"
            class="team-input"
        />
        <button @click="joinTeam" class="join-button">Join Team</button>
      </div>
    </div>
  </div>
</template>


<script setup>
import {ref, onMounted, onUnmounted} from "vue";
import { io } from "socket.io-client";

const socket = ref(null);
const teamName = ref("");
const teamInput = ref("");
const hasBuzzed = ref(false);

const PORT = 3000;
const URL = "192.168.1.2";

const joinTeam = () => {
  if (teamInput.value) {
    teamName.value = teamInput.value;
    socket.value.emit("join-team", teamInput.value);
  }
};

const buzz = () => {
  if (!hasBuzzed.value) {
    socket.value.emit("buzz");
    hasBuzzed.value = true;
  }
};

onMounted(() => {
  socket.value = io("http://"+URL+":"+PORT);

  socket.value.on("reset-buzzer", () => {
    hasBuzzed.value = false;
  });

  socket.value.on("reset-teams", () => {
    // reload page
    location.reload();
  });
});

onUnmounted(() => {
  if(socket.value) {
    socket.value.disconnect();
  }
});
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.team-container {
  display: flex;
  flex-direction: column;
  height: 90vh;
}

.team-header {
  color: white;
  text-align: center;
  padding: 1rem;
}

.team-header h1 {
  margin: 0;
  font-size: 1.5rem;
}

.buzz-container {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.buzz-button {
  width: 100%;
  height: 100%;
  font-size: 2rem;
  color: white;
  background-color: #3b82f6;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
}

.buzz-button:disabled {
  background-color: #d1d5db;
  cursor: not-allowed;
}

.join-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.team-input {
  font-size: 20px;
  width: 80%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
}

.join-button {
  padding: 0.5rem 1rem;
  color: white;
  background-color: #10b981;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

.join-button:hover {
  background-color: #059669;
}
</style>