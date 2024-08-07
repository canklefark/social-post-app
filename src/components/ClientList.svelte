<script lang="ts">
  import { onMount } from 'svelte';
  import { pb } from '../lib/pocketbase';
  import type { ClientsResponse } from '../pocketbase-types';

  let clients: ClientsResponse[] = [];

  onMount(async () => {
    const resultList = await pb.collection('clients').getList(1, 50, {
      sort: 'name',
    });
    clients = resultList.items;
  });
</script>

<div class="client-list">
  <h2>Clients</h2>
  {#if clients.length > 0}
    <ul>
      {#each clients as client}
        <li>
          <a href={`/client/${client.id}`}>{client.name}</a>
        </li>
      {/each}
    </ul>
  {:else}
    <p>No clients found.</p>
  {/if}
  <a href="/client/new" class="button">Add New Client</a>
</div>

<style>
  .client-list {
    margin: 1rem 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    margin-bottom: 0.5rem;
  }
  .button {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 4px;
  }
</style>
