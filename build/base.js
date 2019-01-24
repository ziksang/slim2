import babel from 'rollup-plugin-babel'
import { eslint } from "rollup-plugin-eslint";
export default {
  plugins: [
    babel({
      include: 'src/**',
      presets: [
        ['@babel/preset-env', {
          "targets": {
            "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
          }
        }]
      ]
    }),
    eslint({
      include: ['src/**/*.js']
    })
  ]
}
