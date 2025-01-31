<template>
  <div>
    <h1>Host Page</h1>
    <h2>Teams</h2>
    <ul>
      <li v-for="(index, team) in teams" :key="index">
        {{ team }}:  {{index}}
      </li>
    </ul>

    <h2>Buzz Order</h2>
    <ol>
      <li v-for="team in buzzOrder" :key="team">{{ team }}</li>
    </ol>

    <div v-if="buzzOrder.length > 0">
      <h3>Current Team: {{ buzzOrder[0] }}</h3>
      <button class="host-button" @click="acceptAnswer">Correct</button>
      <button class="host-button" @click="denyAnswer">Incorrect</button>
    </div>
    <button class="host-button" @click="resetBuzzes">Reset Buzzes</button>
    <button class="host-button" @click="resetTeams">Reset Teams</button>
  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from "vue";
import { io } from "socket.io-client";

const socket = ref(null);
const buzzOrder = ref([]);
const teams = ref({});

const PORT = 3000;
const URL = "192.168.1.2";

const acceptAnswer = () => {
  socket.value.emit("correct-answer");
};

const denyAnswer = () => {
  socket.value.emit("incorrect-answer");
};

const resetBuzzes = () => {
  socket.value.emit("reset-buzzer");
};

const resetTeams = () => {
  teams.value = {};
  buzzOrder.value = [];
  socket.value.emit("reset-teams");
};

onMounted(() => {
  socket.value = io("http://"+URL+":"+PORT);

  socket.value.on("update-teams", (data) => {
    teams.value = data;
  });

  socket.value.on("update-buzzes", (order) => {
    buzzOrder.value = order;
  });

  socket.value.on("reset-buzzer", () => {
    buzzOrder.value = [];
  });
});

onUnmounted(() => {
  if(socket.value) {
    socket.value.disconnect();
  }
});
</script>

<style scoped>
.host-button {
  width: 50%;
  padding: 0.5rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 1rem
}
button:hover {
  background-color: #2563eb;
}
</style>
