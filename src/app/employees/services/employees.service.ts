import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEmployeeModel, IEmployeeWithId } from 'src/app/employees/interfaces/employee';
import { environment } from 'src/environments/environment.development';

const url = environment.apiUrl + '/employee/';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  constructor(private http: HttpClient) {
  }

  getAllEmployees() {
    return this.http.get<IEmployeeWithId[]>(url);
  }

  deleteEmployee(id: string) {
    return this.http.delete(url + id);
  }

  editEmployee(id: string, employee: IEmployeeModel) {
    return this.http.put(url + id, employee);
  }

  addEmployee(employee: IEmployeeModel) {
    return this.http.post(url, employee);
  }

}
