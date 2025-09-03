// Tipos utilizados na aplicação
export interface Beneficiario {
  id: number;
  ativo: boolean;
  matricula: string;
  nome: string;
  cpf: string;
  plano: string;
}

export interface FiltroBeneficiario {
  nome?: string;
  matricula?: string;
  cpf?: string;
  abrirProtocolo?: boolean;
}

