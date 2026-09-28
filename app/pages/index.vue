<script setup lang="ts">
import type { Status } from '~/types/task'
import { STATUSES } from '~/constants/status'

const taskStore = useTaskStore()
// 集計は getters が持つ。画面側では数え直さない
const { countByStatus } = storeToRefs(taskStore)

/** ステータスごとに件数の色を変える（一覧の配色と揃える） */
const STATUS_CLASS: Record<Status, string> = {
  未対応: 'is-todo',
  処理中: 'is-doing',
  完了: 'is-done',
}
</script>

<template>
  <section class="hero">
    <h2 class="hero-title">タスクの進捗を管理する</h2>
    <NuxtLink class="hero-button" to="/tasks">タスク一覧へ</NuxtLink>
  </section>

  <section class="summary">
    <div v-for="status in STATUSES" :key="status" class="summary-card">
      <p class="summary-label">{{ status }}</p>
      <p class="summary-count" :class="STATUS_CLASS[status]">
        {{ countByStatus[status] }}<span class="summary-unit">件</span>
      </p>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-lg);
  min-height: 240px;
}

.hero-title {
  margin: 0;
  font-size: 28px;
}

.hero-button {
  padding: var(--space-md) var(--space-xl);
  color: var(--surface);
  background: var(--primary);
  border-radius: var(--radius-sm);
  box-shadow: var(--elevation-1);
  font-size: 15px;
}

.hero-button:hover {
  box-shadow: var(--elevation-2);
}

.summary {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
}

.summary-card {
  flex: 1 1 160px;
  padding: var(--space-lg);
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: var(--elevation-1);
}

.summary-label {
  margin: 0 0 var(--space-sm);
  color: var(--text-sub);
  font-size: var(--font-caption);
}

.summary-count {
  margin: 0;
  font-size: 28px;
  font-weight: 600;
}

.summary-count.is-todo {
  color: var(--text-sub);
}

.summary-count.is-doing {
  color: var(--primary);
}

.summary-count.is-done {
  color: var(--done);
}

.summary-unit {
  margin-left: var(--space-xs);
  font-size: var(--font-body);
  font-weight: normal;
  color: var(--text-sub);
}
</style>
