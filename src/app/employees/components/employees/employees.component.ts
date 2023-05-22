import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from 'src/app/employees/components/add-employee/add-employee.component';
import { EmployeesStore } from 'src/app/employees/components/employees/employees.component.store';
import { IEmployeeWithId } from 'src/app/employees/interfaces/employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  providers: [EmployeesStore],
})
export class EmployeesComponent {
  employees$ = this.employeesStore.employees$;
  loading$ = this.employeesStore.loading$;
  isAdmin = localStorage.getItem('Role') === 'admin';

  constructor(
    private employeesStore: EmployeesStore,
    public dialog: MatDialog,
  ) {
    this.employeesStore.getEmployees();
  }

  editById(employee: IEmployeeWithId) {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '500px',
      data: employee,
    });
    dialogRef.afterClosed().subscribe((el) => {
      if (el === 'delete')
        this.employeesStore.deleteEmployee$({ employeeId: employee._id });
      else if (el)
        this.employeesStore.updateEmployee$({
          employeeId: employee._id,
          employee: el,
        });
    });
  }

  addEmployee() {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((el) => {
      if (el) this.employeesStore.addEmployee$({ employee: el });
    });
  }
}
