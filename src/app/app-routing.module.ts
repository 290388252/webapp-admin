import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CKEditorModule} from 'ng2-ckeditor';
const routes: Routes = [
    { path: '', redirectTo: '/main', pathMatch: 'full' },
    { path: 'main', loadChildren: './operation/main/main.module#MainModule' },
    { path: 'cMain', loadChildren: './customer/c-main/c-main.module#CMainModule' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes), CKEditorModule],
    exports: [RouterModule]
})
export class AppRoutingModule {}
