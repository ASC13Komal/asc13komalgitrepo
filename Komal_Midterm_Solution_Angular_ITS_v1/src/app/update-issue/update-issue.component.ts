import { Component, OnInit } from '@angular/core';
import { IssueService } from '../service/issue.service';
import { Issue } from '../model/issue.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { errorContext } from 'rxjs/internal/util/errorContext';

@Component({
  selector: 'app-update-issue',
  // standalone: true,
  // imports: [],
  templateUrl: './update-issue.component.html',
  styleUrl: './update-issue.component.css'
})
export class UpdateIssueComponent implements OnInit{
  id: number = 0;
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

  updateIssue(): void {
    this.issueService.updateIssue(this.id, this.issue)
      .subscribe(updatedIssue => { console.log(updatedIssue) }, 
      error => console.log(error));
    this.router.navigate(['issues']);
  }

}


