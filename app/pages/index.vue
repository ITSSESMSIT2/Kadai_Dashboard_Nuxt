<template>
  <section class="hero">
    <h2 class="hero-title">タスクの進捗を管理する</h2>
    <NuxtLink class="hero-button" to="/tasks">タスク一覧へ</NuxtLink>
  </section>

  <!-- PR4: ステータス別の件数サマリ（未対応 / 処理中 / 完了）をここに追加する -->
</template>

<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-lg);
  min-height: 320px;
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
</style>
