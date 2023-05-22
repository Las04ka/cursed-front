import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { DeleteConfirmationDialogComponent } from './blog-page/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { BlogConstructorComponent } from './blog-constructor/blog-constructor.component';

const routes: Routes = [
  {
    path: '',
    component: BlogListComponent,
  },
  { path: ':id', component: BlogPageComponent },
];
@NgModule({
  declarations: [BlogListComponent, BlogPageComponent, DeleteConfirmationDialogComponent, BlogConstructorComponent],
  imports: [SharedModule, RouterModule.forChild(routes), MatGridListModule, MatProgressSpinnerModule, MatInputModule,],
})
export class BlogModule {}
