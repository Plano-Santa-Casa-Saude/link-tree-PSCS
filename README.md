# Sistema de Consulta de Beneficiários - Santa Casa de Saúde SJC

## 📋 Descrição

Sistema web para consulta e visualização de beneficiários de planos de saúde, desenvolvido com React + TypeScript e Material-UI.

## 🚀 Tecnologias Utilizadas

- **React 18** - Biblioteca para interfaces de usuário
- **TypeScript** - Linguagem tipada para JavaScript
- **Material-UI (MUI)** - Biblioteca de componentes React
- **React Router** - Roteamento da aplicação
- **Vite** - Build tool e dev server

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── MenuSideBar.tsx     # Menu lateral principal
│   └── FiltroBeneficiarios.tsx  # Filtros e tabela de beneficiários
├── pages/              # Páginas da aplicação
│   └── Detalhado.tsx       # Página de detalhes do beneficiário
├── styles/             # Estilos e temas
│   └── StyleMenuSideBar.tsx  # Estilos do menu lateral
├── types/              # Definições de tipos TypeScript
│   └── index.ts            # Interfaces e tipos da aplicação
├── App.tsx             # Componente principal
└── main.tsx            # Ponto de entrada da aplicação
```

## 🎯 Funcionalidades

### Página Inicial
- **Filtros de Busca**: Nome, matrícula, CPF e opção de abrir protocolo
- **Tabela de Resultados**: Exibição dos beneficiários encontrados
- **Navegação**: Clique duplo para ver detalhes

### Página de Detalhes
- **Informações Pessoais**: Matrícula, nome e CPF
- **Informações do Plano**: Tipo de plano, cobertura e validade
- **Navegação**: Botão para retornar à lista

## 🛠️ Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone [url-do-repositorio]

# Entre na pasta do projeto
cd link-tree-project

# Instale as dependências
npm install
```

### Desenvolvimento
```bash
# Inicie o servidor de desenvolvimento
npm run dev

# Acesse http://localhost:5173
```

### Build de Produção
```bash
# Gere o build de produção
npm run build

# Os arquivos estarão na pasta dist/
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Verificação de linting

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (até 767px)

## 🎨 Design System

- **Cores**: Paleta baseada no tema da Santa Casa de Saúde
- **Componentes**: Design consistente com Material-UI
- **Tipografia**: Hierarquia clara e legível
- **Espaçamentos**: Sistema de grid responsivo

## 🔌 API

O sistema consome a API de beneficiários:
- **Endpoint**: `http://10.201.0.39:3333/beneficiarios/all`
- **Método**: GET
- **Resposta**: Lista de beneficiários com paginação

## 👥 Equipe de Desenvolvimento

- **Equipe de Desenvolvimento PSCS**
- **Santa Casa de Saúde São José dos Campos**

## 📄 Licença

Este projeto é de uso interno da Santa Casa de Saúde de São José dos Campos.
