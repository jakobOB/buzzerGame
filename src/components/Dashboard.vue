<template>
  <div class="host-container">
    <!-- Buzz Order -->
    <section class="section buzz-order">
      <h1>Buzz Order</h1>
      <ul class="buzz-list">
        <li
            v-for="(team, index) in buzzOrder"
            :key="team"
            :class="{ 'current-team': index === 0 }"
        >
          {{ index + 1 }}. {{ team }}
        </li>
      </ul>
    </section>

    <!-- Scores -->
    <section class="section">
      <h1>Team Scores</h1>
      <table class="score-table">
        <thead>
        <tr>
          <th>Team</th>
          <th>Score</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(score, team) in teams" :key="team">
          <td>{{ team }}</td>
          <td>{{ score }}</td>
        </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup>
import {ref, onMounted} from "vue";
import { io } from "socket.io-client";

const socket = ref(null);
const buzzOrder = ref([]);
const teams = ref({});

const PORT = 3000;
const URL = "192.168.1.2";

onMounted(() => {
  socket.value = io("http://"+URL+":"+PORT);

  socket.value.on("update-buzzes", (order) => {
    buzzOrder.value = order;
  });

  socket.value.on("update-teams", (data) => {
    teams.value = data;
  });

  socket.value.on("reset-buzzer", () => {
    buzzOrder.value = [];
  });

  socket.value.on("reset-teams", () => {
    // reload page
    teams.value = {};
    buzzOrder.value = [];
  });
});
</script>

<style>
.host-container {
  padding: 1rem;
  height: 100%;
}

.section {
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
}

/* Buzz Order Section */
.buzz-order {
  text-align: center; /* Center the entire section */
}

.buzz-list {
  list-style: none; /* Remove default list styling */
  padding: 0; /* Remove padding for clean layout */
  margin: 1rem 0; /* Add some spacing */
}

.buzz-list li {
  font-size: 2rem; /* Large font size for visibility */
  padding: 1rem; /* Add padding for spacing */
  margin-bottom: 0.5rem; /* Spacing between items */
  color: #333; /* Darker text for readability */
  background-color: #f3f4f6; /* Light gray background for all teams */
  border-radius: 0.5rem; /* Rounded corners */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
}

/* Highlight Current Team */
.buzz-list .current-team {
  font-weight: bold; /* Bold the current team */
  background-color: #44a133; /* Blue background for the current team */
  color: white; /* White text for contrast */
  transform: scale(1.05); /* Slightly enlarge the current team */
  transition: transform 0.2s, background-color 0.2s; /* Smooth hover/transition */
}

.score-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff; /* Add a white background for contrast */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add subtle shadow for depth */
  border-radius: 0.5rem; /* Add rounded corners */
  overflow: hidden; /* Ensure rounded corners apply */
}

.score-table th {
  font-size: 40px;
  background-color: #133e85; /* Blue header for visibility */
  color: white; /* White text for contrast */
  font-weight: bold; /* Bold text */
  padding: 1rem; /* Add padding */
  text-align: center; /* Center-align header text */
}

.score-table td {
  font-size: 40px;
  padding: 0.75rem; /* Add padding for readability */
  text-align: center; /* Center-align data */
  color: #333; /* Slightly darker text for better readability */
}

.score-table tr:nth-child(even) {
  background-color: #f9f9f9; /* Light gray for alternating rows */
}

.score-table tr:nth-child(odd) {
  background-color: #ffffff; /* White for alternating rows */
}
</style>
