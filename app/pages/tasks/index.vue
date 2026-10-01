<script setup lang="ts">
import type { Task } from '~/types/task'

const taskStore = useTaskStore()
// 絞り込み・並び替えのロジックは composable にまとめている
const { tasks, status, sortOrder, sortedTasks, currentPage, totalPages, pagedTasks } = useTaskSearch()

/** 削除の確認中のタスク。null なら確認ダイアログを閉じている */
const taskToDelete = ref<Task | null>(null)

const confirmMessage = computed(() =>
  taskToDelete.value ? `「${taskToDelete.value.title}」を削除します。よろしいですか？` : '',
)

const deleteTask = () => {
  if (taskToDelete.value) taskStore.removeTask(taskToDelete.value.id)
  taskToDelete.value = null
}
</script>

<template>
  <section class="card">
    <h2 class="card-title">新規タスクを追加</h2>
    <TaskForm />
  </section>

  <section class="card">
    <div class="card-header">
      <h2 class="card-title">タスク一覧</h2>
      <p class="count">該当 {{ sortedTasks.length }} 件 ・ 全 {{ tasks.length }} 件</p>
    </div>

    <TaskFilter v-model:status="status" />

    <!-- 1件も無いときと、絞り込んだ結果が0件のときでは案内を変える -->
    <p v-if="tasks.length === 0" class="state">タスクがありません。</p>
    <p v-else-if="sortedTasks.length === 0" class="state">
      該当するタスクがありません。条件を変更してください。
    </p>
    <template v-else>
      <TaskList v-model:sort-order="sortOrder" :tasks="pagedTasks" @delete="taskToDelete = $event" />
      <!-- 1ページに収まるときはページ送りを出さない -->
      <TaskPager v-if="totalPages > 1" v-model:page="currentPage" :total-pages="totalPages" />
    </template>
  </section>

  <ConfirmDialog
    :open="taskToDelete !== null"
    :message="confirmMessage"
    @confirm="deleteTask"
    @cancel="taskToDelete = null"
  />
</template>

<style scoped>
.card {
  margin-bottom: var(--space-lg);
  padding: var(--space-lg);
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: var(--elevation-1);
}

.card-header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
}

.card-title {
  margin: 0 0 var(--space-md);
  font-size: var(--font-subtitle);
}

/* ヘッダー行の中では下余白を持たせない（行の高さで揃える） */
.card-header .card-title {
  margin-bottom: 0;
}

.count {
  margin: 0;
  color: var(--text-sub);
  font-size: var(--font-caption);
}

.state {
  margin: 0;
  padding: var(--space-lg);
  text-align: center;
  color: var(--text-sub);
}
</style>
