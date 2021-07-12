import buble from '@rollup/plugin-buble';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import autoprefixer from 'autoprefixer';
import url from 'postcss-url';

function createEntries(configs) {
  return configs.map((c) => createEntry(c));
}

function createEntry(config) {
  const c = {
    input: 'src/index.js',
    plugins: [],
    output: {
      file: config.file,
      format: config.format,
      sourcemap: true,
    },
  };

  if (config.format === 'umd') {
    c.output.name = c.output.name || 'jigsaw';
  }

  if (config.transpile !== false) {
    c.plugins.push(buble({ exclude: '**/*.css' }));
  }

  c.plugins.push(resolve());

  const postcssPlugins = [];
  postcssPlugins.push(autoprefixer);

  if (config.bundle) {
    postcssPlugins.push(url({ url: 'inline', maxSize: 12 }));
  } else {
    postcssPlugins.push(url({ url: 'copy', useHash: false }));
  }

  c.plugins.push(
    postcss({
      extract: config.bundle
        ? 'jigsaw.bundle.css'
        : config.minify
        ? 'jigsaw.min.css'
        : 'jigsaw.css',
      minimize: config.minify,
      plugins: postcssPlugins,
      to: __dirname + '/dist/jigsaw.css',
    })
  );

  if (config.minify) {
    c.plugins.push(terser({ module: config.format === 'es' }));
  }

  return c;
}

export default createEntries([
  {
    file: 'dist/jigsaw.esm.js',
    format: 'es',
    transpile: false,
  },
  {
    file: 'dist/jigsaw.esm.min.js',
    format: 'es',
    transpile: false,
    minify: true,
  },
  {
    file: 'dist/jigsaw.js',
    format: 'umd',
  },
  {
    file: 'dist/jigsaw.min.js',
    format: 'umd',
    minify: true,
  },
  {
    file: 'dist/jigsaw.bundle.js',
    format: 'umd',
    minify: true,
    bundle: true,
  },
]);
