export interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  drivers_license: string;
  id?: string;
  avatar?: string;
}