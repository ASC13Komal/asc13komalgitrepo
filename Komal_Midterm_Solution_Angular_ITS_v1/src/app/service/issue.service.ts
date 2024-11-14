import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Issue } from "../model/issue.model";

@Injectable({
    providedIn: "root"
})

export class IssueService {
    baseUrl : string = "http://localhost:3000/issues";
    constructor(private httpClient: HttpClient) {
    }

    getIssues() {
        return this.httpClient.get<Issue[]>(this.baseUrl);
    }

    getIssueById(id : number)  {
        return this.httpClient.get<Issue>(this.baseUrl + "/" + id);
    }

    createIssue(id: number, issue: Issue) {
        return this.httpClient.post(this.baseUrl, issue);
    }

    updateIssue(id:number, issue:any) {
        return this.httpClient.put(`${this.baseUrl}/${id}`, issue);
    }
    
    deleteIssue(id:number) {
        return this.httpClient.delete(this.baseUrl + "/" + id);
    }
}