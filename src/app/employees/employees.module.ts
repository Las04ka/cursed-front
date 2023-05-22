import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesService } from 'src/app/employees/services/employees.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeesComponent } from 'src/app/employees/components/employees/employees.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeesComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  declarations: [
    EmployeesComponent,
    AddEmployeeComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    CommonModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  providers: [EmployeesService]
})
export class EmployeesModule {
}
