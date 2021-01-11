import { build } from 'esbuild'
import { join, resolve } from 'path'

const rootDir = resolve(join(__dirname, '..'))

build({
  entryPoints: [rootDir + '/src/index.tsx'],
  bundle: true,
  minify: true,
  outfile: rootDir + '/docs/index.js',
  define: {
    "process.env.NODE_ENV": '"production"'
  }
}).catch(() => process.exit(1)) 