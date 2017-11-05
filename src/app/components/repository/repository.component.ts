import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';

import { HttpService } from '../../services/http.service';
import { IssueService } from '../../services/issue.service';

import { Issue } from '../../shared/models/github-models';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css'],
  providers: [HttpService]
})
export class RepositoryComponent implements OnInit {

  issues: Issue[];

  owner: string;
  repo: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private issueService: IssueService
  ) { }

  ngOnInit() {
    let owner: string = this.activatedRoute.snapshot.params['owner'];
    let repo: string = this.activatedRoute.snapshot.params['repository'];
    this.owner = owner;
    this.repo = repo;
    console.log(`Owner: ${owner}, Repo: ${repo}`);

    this.issueService.getRepositoryIssues(this.owner, this.repo)
      .then(res => {
        this.issues = res;
        console.log(res);
        return this.issueService.getIssueComments(res[0].comments_url);
      }).then(res => {
        console.log(res);
        console.log('------LABEL-TYPES---------');
        console.log(this.issueService.getIssueLabelTypes(this.issues));
        console.log('------LABEL-SUBTYPES---------');
        console.log(this.issueService.getSubtypesByType(this.issues, 'type'));
      });
  }

}
