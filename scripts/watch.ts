import { build } from 'esbuild'
import { join, resolve } from 'path'
import * as chokidar from 'chokidar'
import * as liveServer from "live-server"

const rootDir = resolve(join(__dirname, '..'))

chokidar.watch([
  rootDir + '/public/index.html',
  rootDir + '/src',
]).on('change', devBuild)

devBuild().then(() => {
  liveServer.start({
    port: 8181,
    root: rootDir + "/public",
    open: false,
    file: "index.html",
    wait: 1000,
  })
})

async function devBuild() {
  const start = Date.now()
  await build({
    entryPoints: [rootDir + '/src/index.tsx'],
    bundle: true,
    minify: false,
    sourcemap: 'inline',
    sourcesContent: false,
    outfile: rootDir + '/public/index.js',
    define: {
      "process.env.NODE_ENV": '"production"'
    }
  })
  console.log("built in " + (Date.now() - start) + 'ms');
}