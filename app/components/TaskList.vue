<script setup lang="ts">
import type { Task } from '~/types/task'

defineProps<{ tasks: Task[] }>()
const emit = defineEmits<{ delete: [task: Task] }>()
</script>

<template>
  <!-- 画面が狭いときは横スクロールさせ、列が潰れないようにする -->
  <div class="scroll">
    <table class="table">
      <thead>
        <tr class="head">
          <th class="th th-name">タスク名</th>
          <th class="th th-due">期限</th>
          <th class="th th-status">ステータス</th>
          <th class="th th-action">操作</th>
        </tr>
      </thead>
      <tbody>
        <TaskItem
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @delete="emit('delete', $event)"
        />
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.scroll {
  overflow-x: auto;
}

.table {
  width: 100%;
  min-width: 480px;
  border-collapse: collapse;
}

.th {
  padding: var(--space-sm);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  color: var(--text-sub);
  font-size: var(--font-caption);
  font-weight: normal;
  text-align: left;
}

.th-due {
  width: 110px;
}

.th-status {
  width: 120px;
}

.th-action {
  width: 36px;
  text-align: center;
}
</style>
