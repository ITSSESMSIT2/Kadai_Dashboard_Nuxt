<script setup lang="ts">
defineProps<{ totalPages: number }>()

const page = defineModel<number>('page', { required: true })

const toPrev = () => {
  if (page.value > 1) page.value -= 1
}

const toNext = (totalPages: number) => {
  if (page.value < totalPages) page.value += 1
}
</script>

<template>
  <nav class="pager" aria-label="ページ送り">
    <button class="button" type="button" :disabled="page <= 1" @click="toPrev">前へ</button>

    <!-- 読み上げでは「3ページ中2ページ目」と伝わるようにする -->
    <p class="status" aria-live="polite">
      <span aria-hidden="true">{{ page }} / {{ totalPages }}</span>
      <span class="reader">{{ totalPages }}ページ中{{ page }}ページ目</span>
    </p>

    <button
      class="button"
      type="button"
      :disabled="page >= totalPages"
      @click="toNext(totalPages)"
    >
      次へ
    </button>
  </nav>
</template>

<style scoped>
.pager {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  padding-top: var(--space-md);
}

.button {
  height: 32px;
  min-width: 72px;
  padding: 0 var(--space-md);
  color: var(--primary);
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-family: inherit;
  font-size: var(--font-body);
  cursor: pointer;
}

.button:hover:not(:disabled) {
  border-color: var(--primary);
}

.button:disabled {
  color: var(--text-sub);
  cursor: not-allowed;
  opacity: 0.5;
}

.button:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

.status {
  margin: 0;
  color: var(--text-sub);
  font-size: var(--font-body);
}

/* 画面には出さず、読み上げにだけ渡す */
.reader {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
</style>
