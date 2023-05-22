import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IEmployeeModel } from 'src/app/employees/interfaces/employee';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent {
  form: FormGroup;
  isEditing!: boolean;

  constructor(
    public dialogRef: MatDialogRef<AddEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEmployeeModel,
    private formBuilder: FormBuilder,
  ) {
    this.isEditing = !!data;
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      patronymic: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
    });
    if (data) this.form.patchValue(data);
  }

  onSubmit(): void {
    const formData = this.form.value as IEmployeeModel;
    this.dialogRef.close(formData);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onDelete() {
    this.dialogRef.close('delete');
  }
}
