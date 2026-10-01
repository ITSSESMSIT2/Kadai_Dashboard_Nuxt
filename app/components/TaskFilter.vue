<script setup lang="ts">
import { STATUS_CLASS, STATUSES } from '~/constants/status'
import type { StatusFilter } from '~/types/filter'

const status = defineModel<StatusFilter>('status', { required: true })

/** 選択中のステータスの配色を一覧の表と揃える。「すべて」のときは色を付けない */
const statusClass = computed(() => (status.value ? STATUS_CLASS[status.value] : ''))
</script>

<template>
  <div class="filter">
    <div class="field">
      <label class="label" for="filterStatus">ステータス</label>
      <select id="filterStatus" v-model="status" class="control" :class="statusClass">
        <option :value="null">すべて</option>
        <option v-for="option in STATUSES" :key="option" :value="option">{{ option }}</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.filter {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  margin-bottom: var(--space-md);
}

.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.label {
  font-size: var(--font-caption);
  color: var(--text-sub);
}

.control {
  /* 高さは一覧のステータス欄（TaskItem の .status）に合わせる */
  height: 32px;
  min-width: 128px;
  padding: 0 var(--space-sm);
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-family: inherit;
  font-size: var(--font-body);
}

.control:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
}

/* 一覧のステータス欄（TaskItem の .status）と同じ配色にする */
.control.is-todo {
  color: var(--text-sub);
  border-color: var(--border);
  background-color: var(--status-todo-bg);
}

.control.is-doing {
  color: var(--primary);
  border-color: var(--primary);
  background-color: var(--status-doing-bg);
}

.control.is-done {
  color: var(--done);
  border-color: var(--done);
  background-color: var(--status-done-bg);
}

@media (max-width: 600px) {
  .field,
  .control {
    width: 100%;
    min-width: 0;
  }
}
</style>
