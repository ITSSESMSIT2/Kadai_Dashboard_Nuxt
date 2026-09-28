<script setup lang="ts">
const props = defineProps<{ open: boolean; message: string }>()
const emit = defineEmits<{ confirm: []; cancel: [] }>()

const dialogRef = ref<HTMLDialogElement | null>(null)

// open の変化に合わせてダイアログを開閉する。showModal() で背面の操作を止められる
watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) dialogRef.value?.showModal()
    else dialogRef.value?.close()
  },
)
</script>

<template>
  <!-- Escキーで閉じたときも cancel として扱う -->
  <dialog ref="dialogRef" class="dialog" @cancel.prevent="emit('cancel')">
    <p class="message">{{ message }}</p>
    <div class="actions">
      <button type="button" class="button" @click="emit('cancel')">キャンセル</button>
      <button type="button" class="button button-danger" @click="emit('confirm')">削除する</button>
    </div>
  </dialog>
</template>

<style scoped>
.dialog {
  min-width: 320px;
  max-width: 90vw;
  padding: var(--space-lg);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: var(--elevation-2);
}

.dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.4);
}

.message {
  margin: 0 0 var(--space-lg);
  font-size: var(--font-body);
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-sm);
}

.button {
  height: 40px;
  min-width: 104px;
  padding: 0 var(--space-md);
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-family: inherit;
  font-size: var(--font-body);
  cursor: pointer;
}

.button-danger {
  color: var(--surface);
  background-color: var(--danger);
  border-color: var(--danger);
  font-weight: 600;
}
</style>
