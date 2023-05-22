export interface IEmployeeModel {
  description: string;
  firstName: string;
  image: string;
  lastName: string;
  patronymic: string;
}

export interface IEmployeeWithId {
  description: string;
  firstName: string;
  image: string;
  lastName: string;
  patronymic: string;
  _id: string;
}