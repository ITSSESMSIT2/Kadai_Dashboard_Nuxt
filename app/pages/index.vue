<template>
  <!-- PR1: このヘッダーを app/layouts/default.vue に移し、両ページで共通に使う -->
  <header class="header">
    <h1 class="title">進捗管理ボード</h1>
  </header>

  <main class="container">
    <section class="hero">
      <h2 class="hero-title">タスクの進捗を管理する</h2>

      <!-- PR1: '/tasks' のページを作り、この button を NuxtLink に差し替える -->
      <button class="hero-button" type="button" disabled>タスク一覧へ（PR1で有効化）</button>
    </section>

    <!-- PR5: ステータス別の件数サマリ（未対応 / 処理中 / 完了）をここに追加する -->
  </main>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  height: 64px;
  padding: 0 var(--space-xl);
  background: var(--primary);
}

.title {
  margin: 0;
  color: var(--surface);
  font-size: 19px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-xl);
}

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
  border: none;
  border-radius: var(--radius-sm);
  box-shadow: var(--elevation-1);
  font-size: 15px;
  cursor: pointer;
}

.hero-button:hover {
  box-shadow: var(--elevation-2);
}

.hero-button:disabled {
  background: var(--text-sub);
  box-shadow: none;
  cursor: not-allowed;
}
</style>
