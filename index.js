'use strict'

let path = require('path')
let arrify = require('arrify')
let merge = require('deepmerge')

module.exports = function (neutrino, options = {}) {
	const NODE_MODULES = path.join(__dirname, 'node_modules')
	const LOADER_EXTENSIONS = /\.(tsx?)$/
	let config = neutrino.config
	let compileRule = config.module.rule('compile')
	let typeRule = config.module.rule('type')
	let lintRule = config.module.rules.get('lint')
	let tslintLoader = lintRule && lintRule.uses.get('tslint')
	let compileExtensions = arrify(compileRule.get('test')).concat(LOADER_EXTENSIONS)
	let lintExtensions = arrify(lintRule && lintRule.get('test')).concat(LOADER_EXTENSIONS)

	// default values
	if (!options.include && !options.exclude) {
		options.include = [neutrino.options.source, neutrino.options.tests]
	}

	compileRule
		.test(compileExtensions)

	typeRule
		.test(LOADER_EXTENSIONS)
		.include
			.merge(options.include || [])
			.end()
		.exclude
			.add(NODE_MODULES)
			.merge(options.exclude || [])
			.end()
		.use('typescript')
			.loader(require.resolve('awesome-typescript-loader'))
			.options(merge({
				silent: true,
				compiler: 'typescript',
				useTranspileModule : false,
				configFileName: 'tsconfig.json',
				transpileOnly: false,
				useBabel: false, // Invoke Babel to transpile files. Useful with ES6 target. Please see `useCache` option which can improve warm-up time.
				useCache: false,
				babelCore: undefined, // Override the path used to find babel-core. Useful if node_modules is installed in a non-standard place or webpack is being invoked from a directory not at the root of the project.
				babelOptions : null, // Use this option to pass some options to Babel (e.g. presets).
				usePrecompiledFiles: false,

						/* Compiler options */
				// baseUrl: './scr',
				module: 'es2015', // 'commonjs'
				target: 'es2016', // 'es5'
				sourceMap: true,
				// inlineSourceMap: true,
				// inlineSources: false,
				allowJs: false,
				jsx: 'preserve',
				moduleResolution: 'Classic',
				lib: [
					'dom',
					'es2015',
					'es2016'
				],
				allowSyntheticDefaultImports: true,
				experimentalDecorators: true,
				noImplicitAny: true,
				noImplicitReturns: false,
				noImplicitUseStrict: false,
				noImplicitThis: false,
				noUnusedLocals: true,
				noUnusedParameters: true,
				strictNullChecks: true,
				removeComments: false,
				skipLibCheck: true,
				preserveConstEnums: false,
				stripInternal: false,
				newLine: 'lf',
				pretty: true
				// types: ['webpack-env']	
			}, options)) 
			.end()
	
	// config.module.rule('sourcemap')
	// 	.test(/\.js$/)
	// 	.pre()
	// 	.use('sourcemap')
	// 		.loader(require.resolve('source-map-loader'))
	// 		.end()

	config
		.resolve.extensions
			.add('.ts')
			.add('.tsx')
			.end().end()
		.resolveLoader.modules
			.add(NODE_MODULES)
			.end().end()

	if (tslintLoader) {
		lintRule
			.pre()
			.test(compileExtensions)
		tslintLoader
			.tap(options => merge(options, {
				
			}))
			.end()
	}
}



