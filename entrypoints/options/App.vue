<template>
  <div class="options-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>{{ t('options.title') }}</span>
        </div>
      </template>
      <el-text type="info">{{ t('options.description') }}</el-text>
    </el-card>

    <el-card class="setting-card">
      <el-form label-position="top">
        <el-form-item :label="t('options.language')">
          <template #label>
            <span>{{ t('options.language') }}</span>
            <el-text type="info" size="small" style="display: block; margin-top: 4px;">
              {{ t('options.languageDesc') }}
            </el-text>
          </template>
          <el-select v-model="currentLocale" style="width: 200px;" @change="handleLocaleChange">
            <el-option
              v-for="lang in supportedLocales"
              :key="lang.code"
              :label="lang.name"
              :value="lang.code"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { supportedLocales, setLocale, getSystemLocale } from '../../utils';

const { t, locale } = useI18n();
const currentLocale = ref('system');

onMounted(async () => {
  try {
    const result = await chrome.storage.local.get('locale');
    currentLocale.value = result.locale || 'system';
  } catch (e) {
    console.warn('Failed to get locale:', e);
  }
});

const handleLocaleChange = async (value) => {
  await setLocale(value);
  const newLocale = value === 'system' ? getSystemLocale() : value;
  locale.value = newLocale;
};
</script>

<style scoped>
.options-container {
  padding: 24px;
  max-width: 600px;
  margin: 0 auto;
}

.card-header {
  font-size: 18px;
  font-weight: 600;
}

.setting-card {
  margin-top: 16px;
}
</style>