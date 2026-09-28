<template>
  <header class="app-bar">
    <h1 class="app-title">
      <NuxtLink class="app-title-link" to="/">進捗管理ボード</NuxtLink>
    </h1>
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

/* リンクの既定の見た目（青字・下線）を打ち消して、文字はヘッダーのまま押せるようにする */
.app-title-link {
  color: inherit;
  text-decoration: none;
}

.app-title-link:hover {
  opacity: 0.85;
}

.app-title-link:focus-visible {
  outline: 2px solid var(--surface);
  outline-offset: 4px;
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
