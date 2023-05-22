import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IEmployeeModel } from 'src/app/employees/interfaces/employee';

@Component({
  selector: 'app-blog-constructor',
  templateUrl: './blog-constructor.component.html',
  styleUrls: ['./blog-constructor.component.scss'],
})
export class BlogConstructorComponent {
  form: FormGroup;
  isEditing!: boolean;

  constructor(
    public dialogRef: MatDialogRef<BlogConstructorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEmployeeModel,
    private formBuilder: FormBuilder,
  ) {
    this.isEditing = !!data;
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      content: ['', Validators.required],
      image: ['', Validators.required],
    });
    if (data) this.form.patchValue(data);
  }

  onSubmit(): void {
    const formData = {
      createdAt: Date.now().toString(),
      ...this.form.value,
    } as IEmployeeModel;
    this.dialogRef.close(formData);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onDelete() {
    this.dialogRef.close('delete');
  }
}
