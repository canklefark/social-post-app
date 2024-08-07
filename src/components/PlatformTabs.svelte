<script lang="ts">
  export let platforms: string[];
  export let activeTab: string;

  function setActiveTab(platform: string) {
    activeTab = platform;
  }
</script>

<div class="tabs">
  {#each platforms as platform}
    <button class:active={activeTab === platform} on:click={() => setActiveTab(platform)}>
      {platform}
    </button>
  {/each}
</div>

<style>
  .tabs {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  button {
    padding: 0.5rem 1rem;
    border: none;
    background: #f0f0f0;
    cursor: pointer;
  }
  button.active {
    background: #007bff;
    color: white;
  }
</style>
