# 🎵 Immerse - Music Player

一個整合 Spotify API 並支援本地音樂播放的現代化音樂播放器應用程式，使用 React、TypeScript、Redux 與 Vite 構建。

## ✨ 主要功能

### 🎧 音樂播放

- **Spotify 整合**：透過 Spotify API 獲取最新專輯、推薦歌單與排行榜
- **本地音樂播放**：支援本地 MP3 檔案播放（使用 File System Access API）
- **音樂控制**：播放/暫停、上一首/下一首、進度條控制
- **音量調整**：可調整播放音量
- **隨機播放**：支援隨機播放模式
- **循環播放**：單曲循環功能

### 🎨 使用者介面

- **響應式設計**：支援桌面與行動裝置
- **搜尋功能**：搜尋曲名、歌手或專輯
- **個人化**：支援最愛收藏功能

### 📊 內容瀏覽

- **每日精選**：顯示每日精選音樂橫幅
- **最新專輯**：瀏覽 Spotify 最新發行的專輯
- **推薦歌單**：查看精選推薦歌單
- **排行榜**：查看熱門音樂排行榜
- **我的音樂**：管理與播放本地音樂庫

### 🔐 身份驗證

- **Spotify 登入**：透過 OAuth 2.0 進行 Spotify 帳號認證
- **Token 管理**：自動處理 access token 與 refresh token
- **使用者資訊**：顯示登入使用者的個人資訊

## 📁 專案結構

```
music-player/
├── src/
│   ├── components/        # React 元件
│   │   ├── AuthGroup.tsx     # 認證群組元件
│   │   ├── Banner.tsx        # 橫幅元件
│   │   ├── Musiclist.tsx     # 音樂清單
│   │   ├── Playlist.tsx      # 播放清單
│   │   ├── SearchBar.tsx     # 搜尋列
│   │   ├── TransportControl.tsx  # 播放控制器
│   │   └── ...
│   ├── hooks/             # 自定義 Hooks
│   │   ├── useAuth.ts        # 認證 Hook
│   │   └── useRouter.ts      # 路由 Hook
│   ├── layouts/           # 版面配置
│   │   └── Layout.tsx        # 主要版面
│   ├── store/             # Redux Store
│   │   ├── auth.ts           # 認證狀態
│   │   ├── music.ts          # 音樂狀態
│   │   └── common.ts         # 共用狀態
│   ├── utils/             # 工具函式
│   │   ├── audio.ts          # 音訊管理
│   │   ├── auth.ts           # 認證工具
│   │   ├── browse.ts         # 瀏覽 API
│   │   ├── file.ts           # 檔案處理
│   │   ├── search.ts         # 搜尋功能
│   │   └── ...
│   ├── views/             # 頁面元件
│   │   ├── Main.tsx          # 主頁面
│   │   └── Top.tsx           # 排行榜頁面
│   ├── App.tsx            # 應用程式根元件
│   └── Router.tsx         # 路由配置
├── public/                # 靜態資源
├── vite.config.js         # Vite 配置
├── tsconfig.json          # TypeScript 配置
├── tailwind.config.js     # Tailwind 配置
└── package.json           # 專案依賴
```

## 🚀 開始使用

### 環境需求

- Node.js 16.x 或更高版本
- pnpm (推薦) 或 npm

### 安裝

```bash
# 安裝依賴
pnpm install
```

### 環境變數設定

在專案根目錄建立 `.env` 檔案，並設定以下變數：

```env
# Spotify API 設定
VITE_CLIENT_ID=your_spotify_client_id
VITE_CLIENT_SECRET=your_spotify_client_secret
VITE_AUTH_BASE_URL=https://accounts.spotify.com
VITE_API_BASE_URL=https://api.spotify.com/v1

# 網站網域設定
VITE_SITE_DOMAIN_DEV=http://localhost:5173/music-player/
VITE_SITE_DOMAIN_PROD=https://yourdomain.com/music-player/
```

### 開發

```bash
# 啟動開發伺服器
pnpm dev

# 程式碼檢查
pnpm lint

# 程式碼格式化
pnpm format
```

### 建置

```bash
# 建置生產版本
pnpm build

# 分析 Bundle 大小
pnpm build:analyze

# 預覽建置結果
pnpm preview
```

### 部署

```bash
# 執行部署腳本
pnpm deploy
# 或
sh deploy.sh
```

## 🌐 瀏覽器支援

- Chrome 86+
- Edge 86+
- Safari 15.2+（部分功能可能受限）
- Firefox 最新版（File System Access API 不支援）

## 📄 授權

此專案僅供學習與研究使用。

## 🔗 相關連結

- [Spotify Web API 文件](https://developer.spotify.com/documentation/web-api/)
- [File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API)
- [React 文件](https://react.dev/)
- [Redux Toolkit 文件](https://redux-toolkit.js.org/)

---

Made with ❤️ using React + TypeScript + Vite
