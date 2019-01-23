import base from './base'

const config = Object.assign(base, {
  input: 'src/slim/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  }
})

export default config