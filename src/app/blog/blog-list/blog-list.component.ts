import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BlogConstructorComponent } from 'src/app/blog/blog-constructor/blog-constructor.component';
import { BlogService } from 'src/app/blog/blog.service';
import { IBlogData } from 'src/app/blog/interfaces/blog-data';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent {
  isAdmin = localStorage.getItem('Role') === 'admin';
  blogs!: IBlogData[];
  date = Date.now();
  constructor(private blogService: BlogService, public dialog: MatDialog) {
    blogService.getPosts().subscribe((el) => (this.blogs = el));
  }

  addPost() {
    const dialogRef = this.dialog.open(BlogConstructorComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((el) => {
      if (el)
        this.blogService
          .addPost(el)
          .subscribe(() =>
            this.blogService.getPosts().subscribe((e) => (this.blogs = e)),
          );
    });
  }
}
