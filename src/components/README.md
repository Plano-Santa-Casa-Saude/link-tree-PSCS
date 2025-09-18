# Estrutura de Componentes

Esta pasta contém todos os componentes do sistema, organizados por funcionalidade para melhor manutenibilidade e escalabilidade.

## 📁 Estrutura de Pastas

### `common/`
Componentes reutilizáveis que podem ser usados em qualquer parte da aplicação.
- `Campo.tsx` - Componente de campo de entrada de dados

### `layout/`
Componentes responsáveis pela estrutura e layout da aplicação.
- `MenuSideBar.tsx` - Barra lateral de navegação

### `beneficiary/`
Módulo de gestão de beneficiários.
- `BeneficiaryFilters.tsx` - Filtros e busca de beneficiários
- `UserAttention.tsx` - Alertas e atenção do usuário

### `protocols/`
Módulo de gestão de protocolos.
- `Protocols.tsx` - Listagem de protocolos
- `ProcessProtocol.tsx` - Trâmites de protocolos
- `AttachmentsProtocol.tsx` - Anexos de protocolos

### `financial/`
Módulo financeiro.
- `Financial.tsx` - Gestão financeira principal
- `DetailMonthlyFee.tsx` - Detalhes de mensalidades
- `CurrentCopart.tsx` - Coparticipação vigente

### `guides/`
Módulo de guias médicas.
- `GuiaListaComponent.tsx` - Listagem de guias médicas
- `GuiaListaComponent.css` - Estilos do componente de guias

### `documents/`
Módulo de documentos e cartas.
- `Letters.tsx` - Cartas e documentos

## 📦 Exports

Cada pasta possui um arquivo `index.ts` que exporta todos os componentes da pasta, permitindo imports limpos:

```typescript
// Import de um módulo específico
import { BeneficiaryFilters, UserAttention } from '../components/beneficiary';

// Import de todos os componentes
import { Campo, MenuSideBar, BeneficiaryFilters } from '../components';
```

## 🎯 Benefícios da Organização

1. **Modularidade**: Cada funcionalidade está isolada em sua própria pasta
2. **Escalabilidade**: Fácil adicionar novos componentes em módulos existentes
3. **Manutenibilidade**: Código organizado por domínio de negócio
4. **Reutilização**: Componentes comuns separados dos específicos
5. **Imports Limpos**: Sistema de exports centralizados
