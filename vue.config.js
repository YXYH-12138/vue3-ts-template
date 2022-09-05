const { resolve } = require("path");
const AutoImport = require("unplugin-auto-import/webpack");
const IconsResolver = require("unplugin-icons/resolver");
const { FileSystemIconLoader } = require("unplugin-icons/loaders");
const Icons = require("unplugin-icons/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

/** @type {import('@vue/cli-service').ProjectOptions} */
module.exports = {
	publicPath: "./",
	productionSourceMap: false,

	configureWebpack: {
		module: {
			rules: [
				{
					test: /\.mjs$/i,
					include: /node_modules/,
					type: "javascript/auto"
				}
			]
		},
		plugins: [
			AutoImport({
				resolvers: [
					// 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
					ElementPlusResolver(),
					// 自动导入图标组件
					IconsResolver({ prefix: "icon" })
				]
			}),
			Components({
				resolvers: [
					// 自动注册图标组件
					IconsResolver({
						prefix: "icon",
						customCollections: ["sw"]
						// enabledCollections: ["ep"]
					}),
					// 自动导入 Element Plus 组件
					ElementPlusResolver({ importStyle: "sass" })
				],
				// 要搜索组件的目录的相对路径。该目录下的组件不需要导入
				dirs: ["src/components"]
			}),
			Icons({
				compiler: "vue3",
				autoInstall: true,
				customCollections: {
					sw: FileSystemIconLoader("src/assets/svg", (svg) =>
						svg.replace(/^<svg /, '<svg fill="currentColor" ')
					)
				}
			})
		]
	},

	css: {
		loaderOptions: {
			scss: {
				prependData: `@use "~@/styles/variable.scss" as *;`
			}
		}
	},

	chainWebpack: (config) => {
		config.plugin("html").tap((args) => {
			args[0].title = process.env.VUE_APP_TITLE || "App";
			return args;
		});

		config.when(process.env.NODE_ENV !== "development", (config) => {
			// 将webpack运行时抽离到html中
			config
				.plugin("ScriptExtHtmlWebpackPlugin")
				.after("html")
				.use("script-ext-html-webpack-plugin", [{ inline: /runtime\..*\.js$/ }])
				.end();
			config.optimization.splitChunks({
				chunks: "all",
				cacheGroups: {
					libs: {
						name: "chunk-libs",
						test: /[\\/]node_modules[\\/]/,
						priority: 10,
						chunks: "initial"
					},
					elementUI: {
						name: "chunk-elementPlus",
						priority: 20,
						test: /[\\/]node_modules[\\/]_?element-plus(.*)/
					},
					commons: {
						name: "chunk-commons",
						test: resolve("src/components"),
						minChunks: 3,
						priority: 5,
						reuseExistingChunk: true
					}
				}
			});
			config.optimization.runtimeChunk("single");
		});
	}
};
