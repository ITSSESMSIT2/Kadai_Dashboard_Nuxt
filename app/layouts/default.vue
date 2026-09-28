<template>
  <header class="app-bar">
    <h1 class="app-title">進捗管理ボード</h1>
  </header>

  <main class="container">
    <slot />
  </main>
</template>

<style scoped>
.app-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 var(--space-xl);
  background-color: var(--primary);
  color: var(--surface);
  box-shadow: var(--elevation-2);
}

.app-title {
  margin: 0;
  font-size: var(--font-title);
  font-weight: 600;
}

.container {
  margin: 0 auto;
  padding: var(--space-lg) var(--space-xl);
}

@media (max-width: 600px) {
  .app-bar {
    padding: 0 var(--space-md);
  }

  .container {
    padding: var(--space-md);
  }
}
</style>
