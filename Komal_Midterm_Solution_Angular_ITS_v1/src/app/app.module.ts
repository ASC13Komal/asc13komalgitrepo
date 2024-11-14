import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgClass } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { ListIssueComponent } from "./list-issue/list-issue.component";
import { AddIssueComponent } from "./add-issue/add-issue.component";
import { FormControl } from "@angular/forms";
import { UpdateIssueComponent } from "./update-issue/update-issue.component";

@NgModule ({
    declarations: [AppComponent, LoginComponent, ListIssueComponent, AddIssueComponent, UpdateIssueComponent ],
    imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule, FormsModule, NgClass],
    bootstrap: [AppComponent]
})

export class AppModule{

}