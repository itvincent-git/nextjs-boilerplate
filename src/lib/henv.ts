/**
 * 环境变量封装，在浏览器环境中，从window['env']中获取，在node环境中，从process.env中获取
 * @param key
 * @returns
 */
const henv = (key: string): string | undefined => {
  const value =
    typeof window === 'undefined' ? process.env[key] : window['env'][key]
  return value
}

// ES模块导出
export default henv
