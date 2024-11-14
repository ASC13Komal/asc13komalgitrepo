import { Component, OnInit } from '@angular/core';
import { Issue } from '../model/issue.model';
import { IssueService } from '../service/issue.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { errorContext } from 'rxjs/internal/util/errorContext';
 
@Component({
  selector: 'app-add-issue',
  // standalone: true,
  // imports: [],
  templateUrl: './add-issue.component.html',
  styleUrl: './add-issue.component.css'
})
export class AddIssueComponent implements OnInit{
  id: number =0;
  issue: Issue = new Issue();
  constructor(private issueService: IssueService, 
    private route: ActivatedRoute, 
    private router: Router) { }

    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      this.issue = new Issue();
      this.issueService.getIssueById(this.id).subscribe(searchedIssu => {
        this.issue = searchedIssu;
      }, error => console.log(error));
    }
  
    createIssue(): void {
      this.issueService.createIssue(this.id, this.issue)
        .subscribe(createIssue => { console.log(createIssue)}, 
        error => console.log(error));
      this.router.navigate(['issues']);
    }
  
}
