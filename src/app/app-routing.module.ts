import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainPageComponent } from 'src/app/main-page/main-page.component';


const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    },
    {
        path: '',
        component: MainPageComponent,
    },
    {
        path: 'employees',
        loadChildren: () => import('./employees/employees.module').then((m) => m.EmployeesModule),
    },
    {
        path: 'blog',
        loadChildren: () => import('./blog/blog.module').then((m) => m.BlogModule),
    },
    {
        path: '**',
        redirectTo: '',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
