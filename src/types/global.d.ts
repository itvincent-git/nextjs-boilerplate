declare global {
  interface Window {
    env: Record<string, string | undefined>
  }
}
export {};
