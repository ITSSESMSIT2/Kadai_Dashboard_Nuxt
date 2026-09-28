<script setup lang="ts">
import type { Task } from '~/types/task'

const taskStore = useTaskStore()
// 分割代入するとリアクティビティが切れるため storeToRefs を使う
const { tasks } = storeToRefs(taskStore)

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
    <h2 class="card-title">タスク一覧</h2>

    <p v-if="tasks.length === 0" class="state">タスクがありません。</p>
    <TaskList v-else :tasks="tasks" @delete="taskToDelete = $event" />
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

.card-title {
  margin: 0 0 var(--space-md);
  font-size: var(--font-subtitle);
}

.state {
  margin: 0;
  padding: var(--space-lg);
  text-align: center;
  color: var(--text-sub);
}
</style>
