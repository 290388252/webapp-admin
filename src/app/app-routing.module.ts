import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CKEditorModule} from 'ng2-ckeditor';
const routes: Routes = [
    { path: '', redirectTo: '/main/userDetail', pathMatch: 'full' },
    { path: 'main', loadChildren: './operation/main/main.module#MainModule' },
    { path: 'login', loadChildren: './operation/login/login.module#LoginModule' },
    { path: 'cMain', loadChildren: './customer/c-main/c-main.module#CMainModule' },
    { path: 'cLogin', loadChildren: './customer/c-login/c-login.module#CLoginModule' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes), CKEditorModule],
    exports: [RouterModule]
})
export class AppRoutingModule {}
