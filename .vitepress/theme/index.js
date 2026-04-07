import DefaultTheme from 'vitepress/theme'
import Contributors from './Contributors.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Contributors', Contributors)
  }
}
