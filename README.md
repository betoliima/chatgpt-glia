# GLIA Intelligence - Projeto Completo

Sistema de chat inteligente com interface moderna inspirada no ChatGPT, organizado em uma arquitetura limpa e escalável.

## 📁 Estrutura do Projeto

```
/
├── front-end/          # Aplicação React/TypeScript
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/           # Componentes de interface
│   │   │   └── layout/       # Componentes de layout
│   │   ├── hooks/            # Hooks personalizados
│   │   ├── pages/            # Páginas da aplicação
│   │   ├── utils/            # Utilitários
│   │   ├── types/            # Tipos TypeScript
│   │   ├── assets/           # Recursos estáticos
│   │   └── constants/        # Constantes da aplicação
│   ├── package.json
│   └── vite.config.ts
├── api/               # API Python/FastAPI
│   ├── chatbot.py     # Servidor FastAPI
│   ├── config.py      # Configurações
│   ├── requirements.txt
│   └── run_api.bat    # Script para Windows
├── back-end/          # Espaço para backend futuro
├── shared/            # Código compartilhado
│   ├── types.ts       # Tipos compartilhados
│   └── utils.ts       # Utilitários compartilhados
├── .gitignore
└── README.md
```

## 🚀 Tecnologias

### Front-end
- **React 18** - Biblioteca para interface de usuário
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Vite** - Build tool moderna
- **Lucide React** - Ícones modernos

### API
- **Python 3.8+** - Linguagem de programação
- **FastAPI** - Framework web moderno
- **OpenAI API** - Integração com GPT-4
- **Uvicorn** - Servidor ASGI

## 📦 Instalação e Execução

### 1. API Python (Backend)
```bash
cd api
pip install -r requirements.txt

# Criar arquivo .env com sua chave OpenAI
cp env.example .env
# Edite o arquivo .env e adicione sua chave real da OpenAI

uvicorn chatbot:app --reload --host 0.0.0.0 --port 8000
```
API rodando em: http://localhost:8000

### 2. Front-end React
```bash
cd front-end
npm install
npm run dev
```
Acesse: http://localhost:5173

### 3. Testar a Integração
1. Certifique-se de que a API Python está rodando na porta 8000
2. Certifique-se de que o front-end está rodando na porta 5173
3. Abra o navegador em http://localhost:5173
4. Digite uma mensagem no chat
5. A mensagem será enviada para sua API Python e você receberá uma resposta da GLIA!

## 🎨 Características

- ✅ Interface moderna inspirada no ChatGPT
- ✅ Layout responsivo mobile-first
- ✅ Sistema de componentes organizado
- ✅ Tipos compartilhados entre front-end e API
- ✅ Hooks personalizados para lógica de chat
- ✅ Estrutura escalável e bem organizada
- ✅ **Integração real com OpenAI GPT-4**
- ✅ **API Python FastAPI funcional**

## 🔧 Desenvolvimento

### Estrutura de Componentes
- **UI Components**: Componentes reutilizáveis de interface
- **Layout Components**: Componentes de estrutura e layout
- **Hooks**: Lógica reutilizável (useChat, etc.)
- **Types**: Definições de tipos compartilhados

### Fluxo de Integração
1. **Usuário digita mensagem** → Front-end React
2. **Hook useChat** → Envia para `/api/chat`
3. **Proxy Vite** → Redireciona para `localhost:8000`
4. **API Python** → Processa com OpenAI GPT-4
5. **Resposta** → Retorna para o front-end
6. **Chat atualizado** → Exibe resposta da GLIA

### Configuração da API
A API está configurada com:
- **Modelo**: GPT-4o-mini
- **Sistema**: Prompt personalizado da BIONAI/GLIA
- **CORS**: Habilitado para desenvolvimento
- **Porta**: 8000 (padrão FastAPI)

## 📝 Próximos Passos

1. ✅ **Implementar integração real com IA** - CONCLUÍDO
2. Adicionar autenticação de usuários
3. Implementar persistência de conversas
4. Adicionar testes automatizados
5. Configurar CI/CD
6. Deploy em produção

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 🎯 Status do Projeto

- ✅ **Front-end organizado e funcional**
- ✅ **API Python integrada com OpenAI**
- ✅ **Comunicação front-end ↔ API funcionando**
- ✅ **Interface moderna e responsiva**
- ✅ **Sistema de tipos compartilhados**
- ✅ **Hooks personalizados para chat**

**O projeto está 100% funcional e pronto para uso!** 🚀
