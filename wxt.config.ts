import { defineConfig } from 'wxt';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import pkg from './package.json';

const __dirname = dirname(fileURLToPath(import.meta.url));

// See https://wxt.dev/api/config.html
export default defineConfig({
	// https://wxt.dev/guide/resources/upgrading.html#default-output-directories-changed
	outDirTemplate: '{{browser}}-mv{{manifestVersion}}',
	vite: () => ({
		plugins: [
			VueI18nPlugin({
				include: resolve(__dirname, './locales/**'),
				strictMessage: false,
				// 启用 JIT 编译，预编译消息为函数
				jitCompilation: true,
			}),
		],
		define: {
			// vue-i18n 特性标志
			__VUE_I18N_FULL_INSTALL__: true,
			__VUE_I18N_LEGACY_API__: false,
			__INTLIFY_PROD_DEVTOOLS__: false,
			__INTLIFY_JIT_COMPILATION__: true,
		},
	}),
	extensionApi: 'chrome',
	modules: ['@wxt-dev/module-vue'],
	manifest: {
		name: 'Wxt Plugin Template',
		version: pkg.version,
		description: '基于 Wxt 构建的自定义模板，引入了一些特性。',
		permissions: ['storage'],
		host_permissions: ['http://*/*', 'https://*/*'],
		options_ui: {
			open_in_tab: true,
		},
	},
	hooks: {
		'build:manifestGenerated': (wxt, manifest) => {
			if (wxt.config.command === 'serve') {
				manifest.content_scripts ??= [];
				manifest.content_scripts.push({
					matches: ['*://*/*'],
					js: ['content-scripts/content.js'],
				});
			}
		},
	},
});
