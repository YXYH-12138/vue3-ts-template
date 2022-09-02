const { resolve } = require("path");
const AutoImport = require("unplugin-auto-import/webpack");
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
				resolvers: [ElementPlusResolver()]
			}),
			Components({
				resolvers: [ElementPlusResolver({ importStyle: "sass" })],
				// 要搜索组件的目录的相对路径。该目录下的组件不需要导入
				dirs: ["src/components"]
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
		// set svg-sprite-loader
		// config.module.rule("svg").exclude.add(resolve("src/assets/icons")).end();
		// config.module
		// 	.rule("icons")
		// 	.test(/\.svg$/)
		// 	.include.add(resolve("src/assets/icons"))
		// 	.end()
		// 	.use("svg-sprite-loader")
		// 	.loader("svg-sprite-loader")
		// 	.options({
		// 		symbolId: "icon-[name]"
		// 	})
		// 	.end();

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
