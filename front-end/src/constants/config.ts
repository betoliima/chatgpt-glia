// Configurações da aplicação
export const APP_CONFIG = {
  taglines: [
    "Think Different",
  ],
  animation: {
    delays: {
      logo: '0s',
      taglines: 0.2,
      chat: 0.8,
      footer: 1.2
    }
  },
  layout: {
    maxWidth: 'max-w-3xl',
    containerPadding: 'px-4 py-12',
    gap: 'gap-8'
  }
} as const;

// Tipos para as configurações
export type AppConfig = typeof APP_CONFIG;
export type Taglines = typeof APP_CONFIG.taglines;
