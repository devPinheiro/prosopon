export interface ElectronAPI {
  sendAction: (action: unknown) => void
  onStateUpdate: (callback: (state: unknown) => void) => void
  getInitialState: () => Promise<unknown>
}

// Extend the Window interface
declare global {
  interface Window {
    electron: ElectronAPI
  }
}
