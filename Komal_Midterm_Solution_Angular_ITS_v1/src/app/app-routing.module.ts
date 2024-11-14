import { Component, NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { AuthGuardService } from "./service/auth-guard.service";
import { ListIssueComponent } from "./list-issue/list-issue.component";
import { AddIssueComponent } from "./add-issue/add-issue.component";
import { UpdateIssueComponent } from "./update-issue/update-issue.component";
 
const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'issues', component: ListIssueComponent, canActivate: [AuthGuardService]},
    { path: 'add', component: AddIssueComponent},
    { path: 'update/:id', component: UpdateIssueComponent},
    { path: '**', component: LoginComponent}
]

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [RouterModule],
}) 

export class AppRoutingModule{ 

}