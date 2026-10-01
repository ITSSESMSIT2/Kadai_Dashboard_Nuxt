<script setup lang="ts">
import type { Task } from '~/types/task'
import type { SortOrder } from '~/types/filter'

defineProps<{ tasks: Task[] }>()
const emit = defineEmits<{ delete: [task: Task] }>()

const sortOrder = defineModel<SortOrder>('sortOrder', { required: true })

const toggleSort = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}
</script>

<template>
  <!-- 画面が狭いときは横スクロールさせ、列が潰れないようにする -->
  <div class="scroll">
    <table class="table">
      <thead>
        <tr class="head">
          <th class="th th-name" scope="col">タスク名</th>
          <!-- 並び替えできる列はヘッダーを押せるようにする。aria-sort で並び順を読み上げに伝える -->
          <th
            class="th th-due"
            scope="col"
            :aria-sort="sortOrder === 'asc' ? 'ascending' : 'descending'"
          >
            <button class="sort" type="button" @click="toggleSort">
              期限
              <span class="arrow" aria-hidden="true">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
            </button>
          </th>
          <th class="th th-status" scope="col">ステータス</th>
          <th class="th th-action" scope="col">操作</th>
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

/* 見出しの文字のまま押せるようにする（ボタンらしい装飾は付けない） */
.sort {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  padding: 0;
  color: inherit;
  background: none;
  border: none;
  font: inherit;
  cursor: pointer;
}

.sort:hover {
  color: var(--primary);
}

.sort:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

/* 並び順の矢印。現在の並び順は aria-sort が伝えるので読み上げからは外す */
.arrow {
  color: var(--primary);
}

.th-status {
  width: 120px;
}

.th-action {
  width: 36px;
  text-align: center;
}
</style>
