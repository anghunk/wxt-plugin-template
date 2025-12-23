<template>
  <el-card class="popup-container" shadow="never">
    <template #header>
      <div class="popup-header">
        <el-icon :size="24" color="#409EFF"><Setting /></el-icon>
        <span>{{ t('popup.title') }}</span>
      </div>
    </template>
    <el-text type="info">{{ t('popup.description') }}</el-text>
    <el-divider />
    <el-button type="primary" :icon="Setting" @click="openOptions">
      {{ t('common.settings') }}
    </el-button>
  </el-card>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { Setting } from '@element-plus/icons-vue';

const { t } = useI18n();

function openOptions() {
  chrome.runtime.sendMessage({ action: "open_options_page" });
  window.close();
}
</script>

<style scoped>
.popup-container {
  min-width: 280px;
  border: none;
}

.popup-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
}
</style>