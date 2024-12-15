export interface ILoggedUSerData {
  user: {
    id?: string;
    nome?: string;
    cpf?: string;
    senha?: string;
  };
  token?: string;
}
