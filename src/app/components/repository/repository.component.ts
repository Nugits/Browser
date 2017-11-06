import { Component, OnInit } from '@angular/core';
import { NgZone } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';

import { HttpService } from '../../services/http.service';
import { IssueService } from '../../services/issue.service';

import { Issue, GithubRepository } from '../../shared/models/github-models';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css'],
  providers: [HttpService]
})
export class RepositoryComponent implements OnInit {

  repository: GithubRepository;
  issues: Issue[];
  filteredIssues: Issue[] = [];
  labelTypes: string[];
  labelTypesCount: {[key: string]: number};
  keys: string[];

  owner: string;
  repo: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private issueService: IssueService,
    private zone: NgZone
  ) { }

  ngOnInit() {
    let owner: string = this.activatedRoute.snapshot.params['owner'];
    let repo: string = this.activatedRoute.snapshot.params['repository'];
    this.owner = owner;
    this.repo = repo;
    this.issueService.getRepositoryIssues(this.owner, this.repo)
      .then(res => {
        this.issues = res;
        res.forEach(issue => {
          this.filteredIssues.push(issue);
        })
        this.initLabelTypes(res);
        return this.issueService.getRepositoryInfo(this.owner, this.repo);
      }).then(res => {
        this.repository = res;
      });
  }

  selectType(type: string) {
    console.log('lalala');
    debugger;
    this.zone.run(() => {
      this.labelTypesCount = this.issueService.getLabelsCountBySubtype(this.issues, type);
      this.keys = Object.keys(this.labelTypesCount);
    });
  }

  private initLabelTypes(issues: Issue[]) {
    this.labelTypes = Array.from(this.issueService.getIssueLabelTypes(issues));
    this.labelTypesCount = this.issueService.getLabelsCountBySubtype(issues, this.labelTypes[0]);
    this.keys = Object.keys(this.labelTypesCount);
  }

  filterIssues(subtype: string) {
    this.filteredIssues.length = 0;
    this.issues.filter(issue => this.containsSubtype(issue, subtype)).forEach(issue => {
      this.filteredIssues.push(issue);
    });
  }
  
  private containsSubtype(issue: Issue, subtype: string) {
    let result: boolean = false;
    issue.labels.forEach(l => {
      if (this.issueService.extractSubtype(l.name) === subtype) {
        result = true;
      }
    });

    return result;
  }
}
