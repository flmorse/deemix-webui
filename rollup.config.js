import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import alias from '@rollup/plugin-alias'
import analyze from 'rollup-plugin-analyzer'
import vue from 'rollup-plugin-vue'
import svg from 'rollup-plugin-svg'
import postcss from 'rollup-plugin-postcss'
import esbuild from 'rollup-plugin-esbuild'

const isProduction = !process.env.ROLLUP_WATCH
process.env.NODE_ENV = isProduction ? 'production' : 'development'

export default {
	input: 'src/app.js',
	output: [
		{
			file: 'public/js/bundle.js',
			format: 'module',
			sourcemap: !isProduction
		}
	],
	plugins: [
		alias({
			entries: [
				{
					find: 'vue',
					replacement: 'vue/dist/vue.esm'
				},
				{
					find: '@',
					replacement: __dirname + '/src'
				},
				{
					find: '@components',
					replacement: __dirname + '/src/components'
				}
			]
		}),
		// Needed for Vue imports
		replace({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		}),
		resolve(), // Tells Rollup how to find imported modules in node_modules
		commonjs(), // Converts imported modules to ES modules, if necessary
		svg(),
		vue(),
		postcss(),
		esbuild({
			sourceMap: false,
			minify: isProduction,
			target: 'es2015'
		}),
		isProduction && analyze({ showExports: true, limit: 15 }) // Show useful information about bundles, only in production
	]
}
