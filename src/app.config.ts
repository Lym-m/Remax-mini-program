import { AppConfig } from "remax/wechat";

const config: AppConfig = {
  pages: [
      'pages/login/index/index', // 登录
      'pages/main/index/index', // 主页
  ],
  window: {
    navigationBarTitleText: '',
    navigationBarBackgroundColor: '#282c34'
  }
};

export default config;
