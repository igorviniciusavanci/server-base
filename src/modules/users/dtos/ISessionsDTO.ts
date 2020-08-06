import IUser from '../entities/IUser';

export interface ICreateSessionRequestDTO {
  cpf: string;
  password: string;
}

export interface ICreateSessionResponseDTO {
  user: IUser;
  token: string;
}
