import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogConstructorComponent } from 'src/app/blog/blog-constructor/blog-constructor.component';
import { DeleteConfirmationDialogComponent } from 'src/app/blog/blog-page/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { BlogService } from 'src/app/blog/blog.service';
import { IBlogData } from 'src/app/blog/interfaces/blog-data';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss'],
})
export class BlogPageComponent {
  blogData!: IBlogData;
  date = Date.now();
  isAdmin = localStorage.getItem('Role') === 'admin';
  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
  ) {
    blogService.getPostById(route.snapshot.params['id']).subscribe((el) => {
      this.blogData = el;
    });
  }

  delete() {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '300px',
      data: this.blogData.title, // Pass any data you want to the dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.blogService.deletePost(this.blogData._id).subscribe(
          () => this.router.navigateByUrl(''),
          (error) => {
            console.log(error);
            this.router.navigateByUrl('');
          },
        );
      }
    });
  }

  edit() {
    const dialogRef = this.dialog.open(BlogConstructorComponent, {
      width: '500px',
      data: this.blogData,
    });
    dialogRef.afterClosed().subscribe((el) => {
      if (el)
        this.blogService
          .editPost(this.route.snapshot.params['id'], el)
          .subscribe(() =>
            this.blogService
              .getPostById(this.route.snapshot.params['id'])
              .subscribe((el) => {
                this.blogData = el;
              }),
          );
    });
  }
}
