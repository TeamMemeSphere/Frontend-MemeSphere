import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 주현아 여기 삭제해야돼
    port: 3000, // 로컬 개발 환경의 포트 번호 통일
    proxy: {
      "/api/proxy": {
        target: "https://api.binance.com",  // 프록시가 우회할 API 주소
        changeOrigin: true,                  // Origin 헤더 변경
        rewrite: (path) => path.replace(/^\/api\/proxy/, ""),  // 경로 수정
      },
      
    },
  },
  define: {
    "global": {},
  },
});