import henv from './henv'

// 针对 Next.js，确保 logger 仅初始化一次，防止热更新时重复初始化
let serverLog: any = undefined

if (serverLog === undefined && typeof window === 'undefined') {
  // 仅在服务器端环境加载 winston
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { createLogger, format, transports } = require('winston')
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const path = require('path')
  // 日志根目录，根据运维环境
  const homeDir = '/opt/app'

  // 定义日志级别
  const logLevels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  }

  // 日志格式化函数
  const logFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss,SSS' }),
    format.printf(
      (info: { timestamp: any; level: string; message: any }) =>
        `${info.timestamp} ${info.level.toUpperCase()} ${info.message}`,
    ),
  )
  const myPodName = henv('MY_POD_NAME') || 'defaultPodName'
  const severLog = henv('X_SERVER_LOG') || 0

  // Read package name from package.json
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const fs = require('fs')
  let packageName = 'app'
  try {
    const packageJson = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'),
    )
    packageName = packageJson.name || 'app'
  } catch (error) {
    console.warn(
      '[ServerLog] Failed to read package.json, using default name "app"',
    )
  }
  console.info(
    `[ServerLog]init homeDir:${homeDir} severLog:${severLog} myPodName:${myPodName}`,
  )

  // 创建不同环境下的配置
  const getTransports = () => {
    const transportList: any[] = []

    if (severLog === '1') {
      // 配置文件日志（循环写入）
      const fileTransport = new transports.File({
        filename: path.join(homeDir, 'logs', `${packageName}_${myPodName}.log`),
        maxsize: 1000 * 1024 * 1024, // 每个日志文件最大 1G
        maxFiles: 2, // 保留最多 2 个日志文件
        level: severLog === '1' ? 'info' : 'debug', // 生产环境只记录 warn 级别及以上
        format: logFormat,
      })
      transportList.push(fileTransport)
    }

    // 开发环境才打印到控制台
    if (severLog !== '1') {
      const consoleTransport = new transports.Console({
        level: 'debug',
        format: format.combine(
          format.colorize(), // 彩色输出
          logFormat,
        ),
      })
      transportList.push(consoleTransport)
    }

    console.info(
      `[ServerLog]severLog:${severLog} getTransports:`,
      transportList.map((item) => item.name),
    )

    return transportList
  }

  // 初始化 Logger
  serverLog = createLogger({
    levels: logLevels,
    transports: getTransports(),
    exitOnError: false, // 避免异常终止
    exceptionHandlers:
      severLog === '1'
        ? [
            new transports.File({
              filename: path.join(
                homeDir,
                'logs',
                `${packageName}_exception_${myPodName}.log`,
              ),
            }),
          ]
        : [
            new transports.Console({
              format: format.combine(format.colorize(), logFormat),
            }),
          ],
    rejectionHandlers:
      severLog === '1'
        ? [
            new transports.File({
              filename: path.join(
                homeDir,
                'logs',
                `${packageName}_rejection_${myPodName}.log`,
              ),
            }),
          ]
        : [
            new transports.Console({
              format: format.combine(format.colorize(), logFormat),
            }),
          ],
  })
} else {
  // serverLog = console;
  // 客户端环境下，使用空的 Logger
  serverLog = {
    error: () => {},
    warn: () => {},
    info: () => {},
    log: () => {},
    debug: () => {},
  }
}

export default serverLog
