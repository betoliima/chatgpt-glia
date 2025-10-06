# GLIA Landing Page

Uma landing page minimalista e moderna para o chatbot GLIA, inspirada no design do ChatGPT, com foco em simplicidade, elegância e interatividade.

## 🚀 Tecnologias

- **React 18** - Biblioteca para interface de usuário
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Vite** - Build tool moderna
- **Lucide React** - Ícones modernos

## 🎨 Sistema de Design

### Paleta de Cores (Light Mode)
- **Background**: `210 20% 98%` - Azul muito claro, quase branco
- **Foreground**: `216 15% 26%` - Azul escuro para texto
- **Primary**: `212 88% 39%` - Azul vibrante para elementos principais
- **Accent**: `180 94% 48%` - Teal (#1BE0D9) para destaques
- **Card**: `0 0% 100%` - Branco puro para cards
- **Muted**: `210 17% 95%` - Cinza azulado suave para elementos secundários
- **Border**: `214 20% 90%` - Bordas sutis

### Paleta de Cores (Dark Mode)
- **Background**: `216 20% 9%` - Azul muito escuro
- **Foreground**: `210 17% 95%` - Texto claro
- **Primary**: `180 94% 48%` - Teal brilhante
- **Accent**: `180 94% 48%` - Teal para destaques
- **Card**: `216 18% 12%` - Azul escuro para cards
- **Border**: `216 15% 18%` - Bordas escuras

### Animações Customizadas
- `.animate-fade-in`: fade-in 0.8s ease-out forwards
- `.animate-scale-in`: scale-in 0.6s ease-out forwards
- `.animate-slide-up`: slide-up 0.7s ease-out forwards

## 📦 Instalação

1. Navegue até o diretório do projeto:
```bash
cd front-end
```

2. Instale as dependências:
```bash
npm install
```

## 🏃‍♂️ Execução

### Modo de Desenvolvimento
```bash
npm run dev
```
Abra [http://localhost:5173](http://localhost:5173) no seu navegador.

### Build de Produção
```bash
npm run build
```

### Preview da Build
```bash
npm run preview
```

## 🧩 Componentes

### ChatMessage
Exibe mensagens individuais no chat com estilização diferenciada para usuário e GLIA.

### ChatInput
Campo de entrada de mensagens com textarea expansível e botão de envio.

### ChatContainer
Gerencia o estado das mensagens e renderiza o histórico do chat com scroll automático.

## 🎭 Fluxo de Animações

- **0.0s** → Logo aparece (scale-in)
- **0.2s** → Primeira tagline (fade-in)
- **0.4s** → Segunda tagline (fade-in)
- **0.6s** → Terceira tagline (fade-in)
- **0.8s** → Chat Container (fade-in)
- **1.2s** → Footer (fade-in)

## 🚀 Funcionalidades

- ✅ Chat interativo com resposta simulada
- ✅ Scroll automático para última mensagem
- ✅ Enter para enviar (Shift+Enter para nova linha)
- ✅ Validação de input (não envia mensagens vazias)
- ✅ Estados visuais responsivos
- ✅ Animações fluidas e suaves
- ✅ Dark mode ready
- ✅ Design responsivo mobile-first
- ✅ SEO otimizado

## 📱 Responsividade

- **Mobile**: Layout otimizado para dispositivos móveis
- **Tablet/Desktop**: Elementos maiores e melhor espaçamento
- **Breakpoints**: Sistema baseado no Tailwind CSS

## 🎯 Princípios de Design

- ✅ **Minimalismo**: Apenas elementos essenciais
- ✅ **Hierarquia visual**: Logo → Taglines → Chat → Footer
- ✅ **Espaçamento generoso**: Layout respirável
- ✅ **Consistência**: Sistema de tokens de design
- ✅ **Acessibilidade**: Semântica HTML correta
- ✅ **Performance**: Animações otimizadas
- ✅ **Responsividade**: Mobile-first approach
