<script setup lang="ts">
import type { Status, Task } from '~/types/task'
import { STATUSES } from '~/constants/status'

const props = defineProps<{ task: Task }>()

/** ステータスごとに選択欄の文字色・枠線・背景を変える */
const STATUS_CLASS: Record<Status, string> = {
  未対応: 'is-todo',
  処理中: 'is-doing',
  完了: 'is-done',
}

const statusClass = computed(() => STATUS_CLASS[props.task.status])
</script>

<template>
  <tr>
    <td class="cell cell-name">{{ task.title }}</td>
    <td class="cell">{{ formatDate(task.dueDate) }}</td>
    <td class="cell">
      <!-- PR3: @change でストアの action を呼び、ステータスを更新する -->
      <select class="status" :class="statusClass" :value="task.status">
        <option v-for="status in STATUSES" :key="status" :value="status">{{ status }}</option>
      </select>
    </td>
    <td class="cell cell-action">
      <!-- PR3: @click でストアの action を呼び、この行を削除する -->
      <button class="delete" type="button" :aria-label="`${task.title} を削除`">
        <img src="~/assets/images/trash.svg" alt="" />
      </button>
    </td>
  </tr>
</template>

<style scoped>
.cell {
  padding: var(--space-md) var(--space-sm);
  border-bottom: 1px solid var(--border);
  font-size: var(--font-body);
}

.cell-name {
  overflow-wrap: anywhere;
}

.cell-action {
  text-align: center;
}

.status {
  width: 120px;
  height: 32px;
  padding: 0 var(--space-sm);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-family: inherit;
  font-size: var(--font-body);
}

.status.is-todo {
  color: var(--text-sub);
  border-color: var(--border);
  background-color: var(--status-todo-bg);
}

.status.is-doing {
  color: var(--primary);
  border-color: var(--primary);
  background-color: var(--status-doing-bg);
}

.status.is-done {
  color: var(--done);
  border-color: var(--done);
  background-color: var(--status-done-bg);
}

.delete {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}

.delete:hover {
  background-color: var(--danger-bg);
}

.delete img {
  display: block;
  width: 20px;
  height: 20px;
}
</style>
