declare module '*.css';
declare module '*.less' {
  const content: any;
  export default content;
}
declare module '*.png';
declare let API_PREFIX: string;
declare interface Window {
  cancelRequest: any;
  less: any;
}
