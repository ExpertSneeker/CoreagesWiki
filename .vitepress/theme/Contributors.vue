<script setup>
import { ref, onMounted } from 'vue'

const contributors = ref([])

onMounted(async () => {
  try {
    const res = await fetch('https://api.github.com/repos/ExpertSneeker/CoreagesWiki/contributors?per_page=100')
    if (res.ok) {
      contributors.value = await res.json()
    }
  } catch (e) {
    // ignore fetch errors
  }
})
</script>

<template>
  <div class="contributors" v-if="contributors.length">
    <h2>本文档贡献者</h2>
    <div class="contributor-list">
      <a
        v-for="user in contributors"
        :key="user.login"
        :href="user.html_url"
        target="_blank"
        class="contributor"
        :title="`${user.login} (${user.contributions} commits)`"
      >
        <img :src="user.avatar_url" :alt="user.login" />
        <span>{{ user.login }}</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.contributors {
  margin-top: 2rem;
  padding-top: 1.5rem;
}

.contributors h2 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.contributor-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.contributor {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.8rem;
  border-radius: 2rem;
  background: var(--vp-c-bg-soft);
  text-decoration: none;
  color: var(--vp-c-text-1);
  transition: background 0.2s;
}

.contributor:hover {
  background: var(--vp-c-brand-soft);
}

.contributor img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.contributor span {
  font-size: 0.9rem;
}
</style>
