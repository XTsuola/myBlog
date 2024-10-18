import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
    resolvers: [
        AntDesignVueResolver({
          importStyle: false
        }),
      ],
    })
  ],
  server: {
    host: '0.0.0.0', //ip地址
    port: 8080, //端口号
    // open: true //启动后是否自动打开浏览器
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
