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
  nome_curso: string;
  semestre: number;
  aulas_teoricas: number;
  aulas_praticas: number;
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
