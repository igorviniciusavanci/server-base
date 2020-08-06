export default interface ICreateUserDTO {
  name: string;
  cpf: string;
  email?: string;
  birthday?: string;
  password: string;
}
