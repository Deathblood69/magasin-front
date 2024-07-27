import {vi} from 'vitest'

/**
 * Permet de mocker l'objet EventSource pour les tests vu qu'il n'existe pas dans node
 */
Object.defineProperty(window, 'EventSource', {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    close: vi.fn(() => {}),
    addEventListener: vi.fn(
      (_event: string, _callback: (_message: MessageEvent) => {}) => {},
    ),
  })),
})
