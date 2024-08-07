<!-- src/components/ClientProfile.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { pb, currentUser } from '../lib/pocketbase';
  import type { ClientsResponse, ClientsRecord, UsersResponse } from '../pocketbase-types';
  import { ClientsPlatformsOptions } from '../pocketbase-types';

  export let clientId: string | null = null;

  let name = '';
  let description = '';
  let platforms: ClientsPlatformsOptions[] = [];
  let user: UsersResponse | null = null;

  const allPlatforms = Object.values(ClientsPlatformsOptions);

  async function loadClient() {
    if (clientId) {
      try {
        const client = await pb.collection('clients').getOne<ClientsResponse>(clientId);
        name = client.name;
        description = client.description || '';
        platforms = client.platforms || [];
      } catch (error) {
        console.error('Error loading client:', error);
      }
    }
  }

  async function saveClient() {
    const data: ClientsRecord = {
      name,
      description: description || undefined,
      platforms: platforms.length > 0 ? platforms : undefined,
    };
    try {
      if (clientId) {
        await pb.collection('clients').update<ClientsResponse>(clientId, data);
      } else {
        await pb.collection('clients').create<ClientsResponse>(data);
      }
      // Handle successful save (e.g., show a message, redirect)
    } catch (error) {
      console.error('Error saving client:', error);
    }
  }

  onMount(() => {
    if (clientId) {
      loadClient();
    }
  });

  currentUser.subscribe((value) => {
    user = value;
  });
</script>

<form on:submit|preventDefault={saveClient}>
  <div>
    <label for="name">Client Name:</label>
    <input id="name" bind:value={name} required />
  </div>
  <div>
    <label for="description">Description:</label>
    <textarea id="description" bind:value={description}></textarea>
  </div>

  <fieldset>
    <legend>Platforms</legend>
    {#each allPlatforms as platform}
      <label>
        <input type="checkbox" bind:group={platforms} value={platform} />
        {platform}
      </label>
    {/each}
  </fieldset>

  <button type="submit">Save Client</button>
</form>

{#if user}
  <p>Last edited by: {user.email}</p>
{/if}
