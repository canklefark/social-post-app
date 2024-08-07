<script lang="ts">
  import { pb, currentUser } from '../lib/pocketbase';

  function logout() {
    pb.authStore.clear();
  }
</script>

<button on:click={logout}>Log out</button>
