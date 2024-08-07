<!-- src/components/Login.svelte -->
<script lang="ts">
  import { login } from '../lib/pocketbase';

  let email = '';
  let password = '';
  let error = '';
  let message = '';

  async function handleLogin() {
    try {
      const authData = await login(email, password);
      console.log('Login successful', authData);
      message = 'Login successful! Redirecting...';
      // Redirect or update UI here
      window.location.href = '/clients';
    } catch (e) {
      console.error('Login failed', e);
      error = 'Login failed. Please check your credentials.';
    }
  }
</script>

<form on:submit|preventDefault={handleLogin}>
  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" bind:value={email} required />
  </div>
  <div>
    <label for="password">Password:</label>
    <input type="password" id="password" bind:value={password} required />
  </div>
  {#if error}
    <p class="error">{error}</p>
  {/if}
  {#if message}
    <p class="message">{message}</p>
  {/if}
  <button type="submit">Log in</button>
</form>

<style>
  .error {
    color: red;
  }
  .message {
    color: green;
  }
</style>
