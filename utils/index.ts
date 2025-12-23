import { createI18n } from 'vue-i18n';

// 静态导入语言文件
import zh from '../locales/zh-CN.json';
import en from '../locales/en-US.json';

// 语言资源
const messages = {
  zh,
  en,
};

// 获取浏览器语言
function getBrowserLanguage(): string {
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith('zh')) {
    return 'zh';
  }
  return 'en';
}

// 获取保存的语言设置
async function getSavedLanguage(): Promise<string> {
  try {
    const result = await chrome.storage.local.get('locale');
    return result.locale || 'system';
  } catch (e) {
    return 'system';
  }
}

// 创建 i18n 实例
export async function createI18nInstance() {
  const savedLang = await getSavedLanguage();
  const locale = savedLang === 'system' ? getBrowserLanguage() : savedLang;
  
  return createI18n({
    legacy: false,
    locale,
    fallbackLocale: 'en',
    messages,
    globalInjection: true, // 启用全局 $t 函数
  });
}

// 支持的语言列表
export const supportedLocales = [
  { code: 'system', name: '跟随系统' },
  { code: 'zh', name: '中文' },
  { code: 'en', name: 'English' },
];

// 获取系统语言
export function getSystemLocale(): string {
  return getBrowserLanguage();
}

// 保存语言设置
export async function setLocale(locale: string): Promise<void> {
  try {
    await chrome.storage.local.set({ locale });
  } catch (e) {
    console.warn('Failed to save locale:', e);
  }
}

export { getBrowserLanguage, getSavedLanguage, createI18nInstance as createI18nInstanceAsync };
