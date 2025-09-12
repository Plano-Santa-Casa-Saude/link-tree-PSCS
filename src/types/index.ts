export type Theme = 'dark' | 'light';

// Tipos para AlertaComponent
export interface Alerta {
  data: string;
  setor: string;
  descricao: string;
}

export interface AlertaComponentProps {
  alertas?: Alerta[];
  titulo?: string;
  mostrarModal?: boolean;
  onFecharModal?: () => void;
  className?: string;
}

// Tipos para GuiaListaComponent
export interface Guia {
  NR_GUIA: string;
  NR_TRANSACAO: string;
  STATUS_GUIA: string;
  TIPO_GUIA: string;
  DT_EMISSAO: string;
  DIAS_CORRIDOS: number;
  DT_VENCIMENTO: string;
  CD_MATRICULA: string;
  NM_SEGURADO: string;
  DS_ESPECIALIDADE: string;
  NM_PRESTADOR_SOL: string;
  NM_AUTORIZADOR: string;
  DS_DEPTO_OPERADORA: string;
  PRAZO: string;
  NIVEL: string;
  NR_GUIA_TEM: string;
  DS_OBSERVACAO?: string;
}

export interface FiltrosGuia {
  nrGuia: string;
  statusGuia: string;
  guiaTem: string;
}

export interface Paginacao {
  paginaAtual: number;
  totalPaginas: number;
  totalRegistros: number;
}

export interface GuiaListaComponentProps {
  matricula: string;
  onGuiaClick?: (nrGuia: string) => void;
  apiUrl?: string;
}

// Tipos para OuvidoriaComponent
export interface Ouvidoria {
  OCORRENCIA: string;
  MOTIVO: string;
  ORIGEM_ATENDIMENTO: string;
}

export interface OuvidoriaComponentProps {
  matricula?: string;
  ouvidorias?: Ouvidoria[];
  titulo?: string;
  mostrarModal?: boolean;
  onFecharModal?: () => void;
  className?: string;
  apiUrl?: string;
}

