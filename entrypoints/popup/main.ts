import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import { createI18nInstanceAsync } from '../../utils';
import './style.less';

// 异步初始化应用以支持 i18n
(async () => {
	const i18n = await createI18nInstanceAsync();
	const app = createApp(App);
	app.use(ElementPlus);
	app.use(i18n);
	app.mount('#app');
})();
