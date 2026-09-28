<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const isNotFound = computed(() => props.error.statusCode === 404)

/** エラー状態を解除してトップへ戻る */
const backToTop = () => clearError({ redirect: '/' })
</script>

<template>
  <NuxtLayout>
    <section class="error">
      <p class="code">{{ error.statusCode }}</p>
      <h2 class="title">
        {{ isNotFound ? 'ページが見つかりません' : 'エラーが発生しました' }}
      </h2>
      <button class="button" type="button" @click="backToTop">トップへ戻る</button>
    </section>
  </NuxtLayout>
</template>

<style scoped>
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  min-height: 320px;
}

.code {
  margin: 0;
  color: var(--text-sub);
  font-size: 48px;
  font-weight: 600;
}

.title {
  margin: 0;
  font-size: var(--font-subtitle);
}

.button {
  margin-top: var(--space-md);
  padding: var(--space-md) var(--space-xl);
  color: var(--surface);
  background-color: var(--primary);
  border: none;
  border-radius: var(--radius-sm);
  font-family: inherit;
  font-size: var(--font-body);
  cursor: pointer;
}
</style>
