export type Aluno = {
  id: number;
  nome: string;
  data_nascimento: string;
  curso: string;
  semestre: number;
  status: string;
  data_matricula: string;
  email: string;
  telefone: string;
  endereco: string;
  cpf: string;
};

export type Curso = {
  id: number;
  nome_curso: string;
  semestre: number;
  aulas_teoricas: number;
  aulas_praticas: number;
  email_coordenador: string;
  forma_oferecimento: string;
  modalidade: string;
  periodo: string;
  disciplinas_id: number[];
  professores_id: number[];
};

export type Professor = {
  id: number;
  nome: string;
  disciplina: string;
  data_admissao: string;
  status: string;
  cursos: Curso[];
  email: string;
  telefone: string;
};

export type ProfessoresResponse = {
  professores: Professor[];
};

export interface Disciplina {
  id: number;
  nome: string;
  aulas_teoricas: number;
  aulas_praticas: number;
  sigla: string;
  curso: number[]; 
  professor: number[]; 
  semestre: number;
  area_tecnologica: string;
  modalidade: string;
  qtd_aulas: number;
}


export interface Sala {
  id: number;
  nome_sala: string;
  bloco: string;
  capacidade: number;
  predio: string;
  equipamentos: Record<string, number>;
}

export interface Laboratorio {
  id: number;
  nome: string;
  capacidade: number;
  curso_associado: string;
  bloco: string;
  predio: string;
  equipamentos: Record<string, number>;
  horario: { dia: string, inicio: string, fim: string, professor_id: number, alunos_usando: string[] }[];
}

export interface Laboratorio {
  id: number;
  nome: string;
  curso_associado: string;
  equipamentos: Record<string, number>;
}