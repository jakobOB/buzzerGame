<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <input
          v-model="password"
          type="password"
          placeholder="Enter admin password"
      />
      <button type="submit">Login</button>
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import {ref} from "vue";

const password = ref("");
const errorMessage = ref("");
const router = useRouter();

const handleLogin = () => {
  const adminPassword = "bokaj#1599"; // Set your password here
  if (password.value === adminPassword) {
    localStorage.setItem("authToken", "secure"); // Save auth token
    router.push("/host"); // Redirect to the dashboard
  } else {
    errorMessage.value = "Invalid password. Please try again.";
  }
};
</script>

<style>
.login {
  max-width: 300px;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
input {
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
}
button {
  width: 100%;
  padding: 0.5rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #2563eb;
}
</style>
