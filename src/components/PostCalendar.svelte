<script lang="ts">
  import { onMount } from 'svelte';
  import { pb } from '../lib/pocketbase';
  import PlatformTabs from './PlatformTabs.svelte';
  import type { ClientsResponse, PostsResponse } from '../pocketbase-types';

  export let clientId: string;

  let client: ClientsResponse | null = null;
  let posts: PostsResponse[] = [];
  let activeTab: string = '';

  onMount(async () => {
    try {
      client = await pb.collection('clients').getOne(clientId);
      if (client && client.platforms && client.platforms.length > 0) {
        activeTab = client.platforms[0];
        await loadPosts();
      }
    } catch (error) {
      console.error('Error fetching client:', error);
      // Handle error (e.g., show error message to user)
    }
  });

  async function loadPosts() {
    if (!activeTab) return;
    try {
      const resultList = await pb.collection('posts').getList(1, 50, {
        filter: `client = "${clientId}" && platform = "${activeTab}"`,
        sort: 'postDate',
      });
      posts = resultList.items;
    } catch (error) {
      console.error('Error fetching posts:', error);
      // Handle error (e.g., show error message to user)
    }
  }

  $: if (activeTab) {
    loadPosts();
  }
</script>

{#if client}
  <h2>{client.name} - Posts</h2>
  {#if client.platforms && client.platforms.length > 0}
    <PlatformTabs platforms={client.platforms} bind:activeTab />

    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Caption</th>
          <th>Approved</th>
          <th>Responsible</th>
          <th>Due Date</th>
          <th>Post Date</th>
        </tr>
      </thead>
      <tbody>
        {#each posts as post}
          <tr>
            <td><img src={pb.getFileUrl(post, post.image)} alt="" width="100" /></td>
            <td>{post.caption}</td>
            <td>{post.isApproved ? 'Yes' : 'No'}</td>
            <td>{post.responsiblePerson}</td>
            <td>{new Date(post.dueDate).toLocaleDateString()}</td>
            <td>{new Date(post.postDate).toLocaleDateString()}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    <p>No platforms available for this client.</p>
  {/if}
{:else}
  <p>Loading...</p>
{/if}
