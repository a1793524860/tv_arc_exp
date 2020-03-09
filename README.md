# 兆豐行動投保 - 前端系統


## 前置作業

此專案範本是基於 [Create React App](https://github.com/facebook/create-react-app)
在進行 `npm install` 之前請確認 `node版本 >= 12` 以及 `npm版本 >= 6.9.0`


#### 請把專案的 `npm audit` 結果盡可能維持在 `0 vulnerabilities`

基本指令有:
- `npm run start` - 啟動開發模式
- `npm run build` - 建立production build

詳細範本資訊請參考 [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)

## 套件使用

本專案使用之套件以目前前端開發的主流套件為主, 若非必要請勿任意安裝套件, 尤其是各種畫面元件請務必自行實作.

請定期檢查 `package.json`是否包含了不存在於下列清單的套件, 若非必要請移除

#### 開發相關套件
- `typescript`
- `react-scripts`
- 任何 `@types` 開頭的套件皆為 `typescript描述檔`, 並非runtime會用到的套件

#### UI套件
- `react`
- `react-dom`
- `react-feather` (此套件為feather icons的react元件, 因為並非主流套件所以鎖版號)
- `styled-components`

#### 狀態管理及資料結構
- `redux`
- `react-redux`
- `redux-observable`
- `rxjs`
- `immutable`

#### 其他
- `react-router-dom`
- `connected-react-router`
- `lodash-es`
- `axios`
- `axios-mock-adapter` (此為目前mock api的使用套件, 等接上實際api之後可考慮移除)
- `qrcode` 產生QR code的套件, 需鎖版號
- `@mikecousins/react-pdf` 瀏覽PDF的套件, 需鎖版號


## 程式架構

本專案的開發是基於下列技術的基本用法, 在開發前若對其中一項技術不熟悉的話請務必先了解

- `TypeScript`
- `React` 以及 `React hooks` (本專案不採用傳統的 `class component`)
- `Redux` 以及一些 [`Redux相關的hooks`](https://react-redux.js.org/next/api/hooks)
- `styled-components`
- 非同步處理使用 `redux-observable`, 需要 `rxjs` 的基本知識
- store的資料以 `immutable` 形式為主, 需了解基本 [Immutable.js](https://immutable-js.github.io/immutable-js/) 的原理以及用法