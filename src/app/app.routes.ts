import { Routes } from '@angular/router';
import { AddEmpComponent } from './components/add-emp/add-emp.component';
import { EmpListComponent } from './components/add-emp/emp-list/emp-list.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {
        path:'add-emp',
        component: AddEmpComponent
    },
    {
        path: 'emp-list',
        component: EmpListComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }
];
