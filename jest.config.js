module.exports = {
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': require.resolve('identity-obj-proxy'), // 原有配置，不能改动。
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/mock/fileMock.ts',
    '@/components': '<rootDir>/src/components',
  },
  testPathIgnorePatterns: ['/node_modules/', 'node', '.umirc.test.ts'],
  setupFiles: ['<rootDir>/mock/matchMediaMock.ts'],
};
