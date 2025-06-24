export interface Atendimento {
  id: number;
  numero: string;
  ultimaMensagem: string;
  data: string;
  status: "Em andamento" | "Concluído";
  precisaAprovacao: boolean;
  cliente: string;
  tags: string[];
  ultimaInteracao: string;
} 