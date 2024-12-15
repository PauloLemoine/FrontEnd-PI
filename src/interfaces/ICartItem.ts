import { IEmployee } from './IEmployee';

export interface ICartItem {
  id: number;
  employee: IEmployee;
  nome: string;
  preco: string;
  data_hora: string;
}
