<script setup lang="ts">
import type { Status } from '~/types/task'
import { STATUSES } from '~/constants/status'

const taskStore = useTaskStore()

const title = ref('')
const dueDate = ref(today())
const status = ref<Status>('未対応')
const errorMessage = ref('')

const resetForm = () => {
  title.value = ''
  dueDate.value = today()
  status.value = '未対応'
}

const submit = () => {
  // 空白だけの入力を弾くため、前後の空白を除去してから判定する
  const trimmedTitle = title.value.trim()
  if (!trimmedTitle) {
    errorMessage.value = 'タスク名を入力してください'
    return
  }

  errorMessage.value = ''
  taskStore.addTask({ title: trimmedTitle, dueDate: dueDate.value, status: status.value })
  resetForm()
}
</script>

<template>
  <!-- novalidate でブラウザ標準の検証を止め、メッセージは自分で出す -->
  <form class="form" novalidate @submit.prevent="submit">
    <div class="row">
      <div class="field field-title">
        <label class="label" for="taskTitle">タスク名 <span class="required">必須</span></label>
        <input
          id="taskTitle"
          v-model="title"
          class="control"
          :class="{ 'is-invalid': errorMessage }"
          type="text"
          required
          :aria-invalid="Boolean(errorMessage)"
          aria-describedby="taskTitleError"
          placeholder="例）API設計ドキュメントを書く"
          @input="errorMessage = ''"
        />
      </div>

      <div class="field">
        <label class="label" for="taskDueDate">期限</label>
        <input id="taskDueDate" v-model="dueDate" class="control" type="date" />
      </div>

      <div class="field">
        <label class="label" for="taskStatus">ステータス</label>
        <select id="taskStatus" v-model="status" class="control">
          <option v-for="value in STATUSES" :key="value" :value="value">{{ value }}</option>
        </select>
      </div>

      <button class="submit" type="submit">追加</button>
    </div>

    <p v-if="errorMessage" id="taskTitleError" class="error">{{ errorMessage }}</p>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: var(--space-md);
}

.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

/* タスク名を伸縮させて余白を埋める（基準320px・縮小可） */
.field-title {
  flex: 1 1 320px;
}

.label {
  font-size: var(--font-caption);
  color: var(--text-sub);
}

.required {
  color: var(--danger);
}

.control {
  height: 40px;
  min-width: 128px;
  padding: 0 var(--space-sm);
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-family: inherit;
  font-size: var(--font-body);
}

.control:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
}

.control.is-invalid {
  border-color: var(--danger);
}

.control.is-invalid:focus {
  box-shadow: 0 0 0 2px rgba(211, 47, 47, 0.2);
}

.error {
  margin: 0;
  color: var(--danger);
  font-size: var(--font-caption);
}

.submit {
  height: 40px;
  min-width: 128px;
  margin-left: auto;
  padding: 0 var(--space-lg);
  color: var(--surface);
  background-color: var(--primary);
  border: none;
  border-radius: var(--radius-sm);
  font-size: var(--font-body);
  font-weight: 600;
  cursor: pointer;
}

@media (max-width: 600px) {
  .field,
  .control,
  .submit {
    width: 100%;
    min-width: 0;
    margin-left: 0;
  }
}
</style>
