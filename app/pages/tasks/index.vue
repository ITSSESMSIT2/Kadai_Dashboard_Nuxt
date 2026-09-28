<script setup lang="ts">
const taskStore = useTaskStore()
// 分割代入するとリアクティビティが切れるため storeToRefs を使う
const { tasks } = storeToRefs(taskStore)
</script>

<template>
  <section class="card">
    <h2 class="card-title">タスク一覧</h2>

    <p v-if="tasks.length === 0" class="state">タスクがありません。</p>
    <TaskList v-else :tasks="tasks" />
  </section>
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
