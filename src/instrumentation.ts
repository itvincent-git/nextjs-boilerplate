import henv from './lib/henv'

/**
 * support server log
 */
export async function register() {
  // Run in nodejs runtime
  if (process.env.NEXT_RUNTIME === 'nodejs' && process.env.APP_ENV !== 'mock') {
    const serverLog = (await import('@/lib/server-log')).default
    // Replace console methods with serverLog methods
    console.log = (...args) => serverLog.info(args.join(' '))
    console.error = (...args) => serverLog.error(args.join(' '))
    console.warn = (...args) => serverLog.warn(args.join(' '))
    console.info = (...args) => serverLog.info(args.join(' '))
    const myPodName = henv('MY_POD_NAME') || 'defaultPodName'
    console.info(`Instrumentation initialization complete. Pod: ${myPodName}`)
  }
}
