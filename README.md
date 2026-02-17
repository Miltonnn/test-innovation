# Innovation Store 🚀

Projeto desenvolvido com Next.js 15, focado em performance, SEO e experiência do usuário. O projeto apresenta um catálogo de produtos com filtros avançados e sistema de favoritos.

## 📋 Sobre o Projeto

Innovation Store é uma plataforma de e-commerce que oferece:
- Catálogo de produtos com filtros dinâmicos
- Sistema de favoritos persistente
- Interface moderna e responsiva
- Alta performance e otimização para SEO
- Testes automatizados

## 🔐 Sistema de Autenticação

A página de login implementa um sistema completo de autenticação com verificação de token e integração com API.

### Funcionalidades do Login

- **Autenticação via API** - Verificação de credenciais contra endpoint seguro
- **Gerenciamento de Tokens** - Armazenamento e validação de JWT
- **Proteção de Rotas** - Redirecionamento de usuários não autenticados
- **Persistência de Sessão** - Mantém o usuário logado entre sessões
- **Tratamento de Erros** - Mensagens claras para credenciais inválidas

### Fluxo de Autenticação
1. Usuário preenche email e senha
2. Cliente faz requisição POST para /api/auth/login
3. API valida credenciais e retorna JWT token
4. Token é armazenado (localStorage/sessionStorage/cookies)
4. Cliente verifica token em cada requisição protegida
5. Token expirado redireciona para login

## 🛠️ Stack Tecnológica

### Core
- **Next.js 16.1.6** - Framework React com renderização híbrida (SSR/SSG)
- **React 19.2.3** - Biblioteca para construção de interfaces
- **TypeScript** - Tipagem estática para maior robustez

### Estado e Dados
- **@tanstack/react-query** - Gerenciamento de estado do servidor e cache
- **Zustand** - Estado global leve e performático
- **Axios** - Cliente HTTP para requisições à API

### Estilização e UI
- **Tailwind CSS v4** - Framework CSS utilitário
- **shadcn/ui** - Componentes reutilizáveis e acessíveis
- **lucide-react** - Ícones modernos e consistentes
- **class-variance-authority** - Variantes de componentes type-safe
- **tailwind-merge** - Combinação inteligente de classes
- **tailwindcss-animate** - Animações com Tailwind

### Utilitários
- **use-debounce** - Debounce para inputs de busca
- **radix-ui** - Componentes headless acessíveis

### Testes
- **Jest** - Testes unitários
- **Testing Library** - Testes de componentes React
- **Playwright** - Testes end-to-end


## 🚀 Funcionalidades Principais

- ✅ **Catálogo de Produtos** - Listagem com grid responsivo
- ✅ **Filtros Avançados** - Filtros por categoria, preço, etc.
- ✅ **Sistema de Favoritos** - Salve produtos favoritos
- ✅ **Pesquisa com Debounce** - Busca otimizada
- ✅ **Autenticação** - Sistema de login
- ✅ **Design Responsivo** - Funciona em todos os dispositivos
- ✅ **SEO Otimizado** - Meta tags e estrutura semântica
- ✅ **Acessibilidade** - Componentes acessíveis (ARIA labels)

## 💻 Como Executar

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/test-innovation.git

# Entre no diretório
cd test-innovation

# Instale as dependências
npm install
# ou
yarn install

# Configure as variáveis de ambiente
cp .env.example .env.local

# Execute em desenvolvimento
npm run dev
# ou
yarn dev
