// import IFile from '@modules/files/entities/IFile';

export default interface IUser {
  id: string;
  name: string;
  cpf: string;
  email: string;
  birthday: Date;
  password: string;
  active: boolean;
  // files: IFile[];
  created_at: Date;
  updated_at: Date;
}
