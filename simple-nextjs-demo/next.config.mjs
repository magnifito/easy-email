import path from 'path';
const nextConfig = {
  webpack: (config, { isServer }) => {
    // 强制所有模块使用同一个 React 实例
    config.resolve.alias = {
      ...config.resolve.alias,
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
      '@arco-design/web-react/es/_util/react-dom': path.resolve('./node_modules/@arco-design/web-react/es/_util/react-dom.js'),
    };
    return config;
  },
};
export default nextConfig;
