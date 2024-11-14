import { Component, OnInit } from '@angular/core';
import { Issue } from '../model/issue.model';
import { IssueService } from '../service/issue.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-issue',
  // standalone: true,
  // imports: [],
  templateUrl: './list-issue.component.html',
  styleUrl: './list-issue.component.css'
})
export class ListIssueComponent implements OnInit{
  searchTerm: string = '';
  issues: Issue[] = [];
  filteredIssues: Issue[] = []; 

  constructor(
    private issueService: IssueService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadIssues();
  }

  loadIssues(): void {
    this.issueService.getIssues().subscribe((issueData) => {
      this.issues = issueData;
      this.filteredIssues = [...this.issues];
    });
  }

  deleteIssue(toDeleteIssue: Issue): void {
    if (toDeleteIssue.id !== undefined) {
      this.issueService.deleteIssue(toDeleteIssue.id).subscribe(() => {
        this.issues = this.issues.filter(issue => issue.id !== toDeleteIssue.id); 
        this.filteredIssues = this.filteredIssues.filter(issue => issue.id !== toDeleteIssue.id);
      });
    }
  }

  updateIssue(issueId: number | undefined): void {
    if (issueId !== undefined) {
      this.router.navigate(['update', issueId]);
    } else {
      console.log("Issue ID is undefined");
    }
  }

  filterIssues(): void {
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase(); 
      this.filteredIssues = this.issues.filter(issue =>
        (issue.id && issue.id.toString().includes(term)) ||
        (issue.title && issue.title.toLowerCase().includes(term))
      );
    } else {
      this.filteredIssues = [...this.issues];
    }
  }
}

