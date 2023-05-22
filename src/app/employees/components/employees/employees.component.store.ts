import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';

import { IEmployeeModel, IEmployeeWithId } from 'src/app/employees/interfaces/employee';
import { EmployeesService } from 'src/app/employees/services/employees.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

export interface EmployeesState {
  employees: IEmployeeWithId[] | null;
  loading: boolean;
}

const initialState: EmployeesState = {
  employees: null,
  loading: false,
};

@Injectable()
export class EmployeesStore extends ComponentStore<EmployeesState> {
  readonly employees$ = this.select((state) => state.employees);
  readonly loading$ = this.select(({ loading }) => loading);

  constructor(
    private employeesService: EmployeesService,
    private snackbarService: SnackbarService,
  ) {
    super(initialState);
  }

  getEmployees = this.effect((trigger$) => {
    return trigger$.pipe(
      switchMap(() => {
        this.setLoading(true);
        return this.employeesService.getAllEmployees();
      }),
      tap((employees) => {
        this.setLoading(false);
        this.patchState({ employees: employees });
      }),
      catchError((error) => {
        this.setLoading(false);
        this.snackbarService.openSnackBar(
          `Users Loading Failed: ${ error.message }`,
        );
        return of(null);
      }),
    );
  });

  addEmployee$ = this.effect((args$: Observable<{ employee: IEmployeeModel }>) =>
    args$.pipe(switchMap(
        (updateOptions) => {
          this.setLoading(true);
          return this.employeesService.addEmployee(updateOptions.employee);
        }),
      tap(() => {
        this.setLoading(false);
        this.getEmployees();
      }),
      catchError((error) => {
        this.setLoading(false);
        this.snackbarService.openSnackBar(
          `User Update Failed: ${ error.message }`,
        );
        return of(null);
      }),
    ),
  );

  updateEmployee$ = this.effect(
    (args$: Observable<{ employeeId: string; employee: IEmployeeModel }>) =>
      args$.pipe(
        switchMap((updateOptions) => {
          this.setLoading(true);
          return this.employeesService.editEmployee(
            updateOptions.employeeId,
            updateOptions.employee,
          );
        }),
        tap(() => {
          this.setLoading(false);
          this.getEmployees();
        }),
        catchError((error) => {
          this.setLoading(false);
          this.snackbarService.openSnackBar(
            `User Update Failed: ${ error.message }`,
          );
          return of(null);
        }),
      ));

  deleteEmployee$ = this.effect(
    (args$: Observable<{ employeeId: string }>) =>
      args$.pipe(
        switchMap((updateOptions) => {
          this.setLoading(true);
          return this.employeesService.deleteEmployee(
            updateOptions.employeeId,
          );
        }),
        tap(() => {
          this.setLoading(false);
          this.getEmployees();
        }),
        catchError((error) => {
          this.setLoading(false);
          this.snackbarService.openSnackBar(
            `User Update Failed: ${ error.message }`,
          );
          return of(null);
        }),
      ));


  private setLoading(state: boolean): void {
    this.patchState({ loading: state });
  }
}
