import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';

import { HttpService } from '../../services/http.service';
import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css'],
  providers: [HttpService]
})
export class RepositoryComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private issueService: IssueService
  ) { }

  ngOnInit() {
    let owner: string = this.activatedRoute.snapshot.params['owner'];
    let repo: string = this.activatedRoute.snapshot.params['repository'];
    console.log(`Owner: ${owner}, Repo: ${repo}`);
    this.httpService.getRequest<string>('test')
      .then(res => console.log(res));

    this.issueService.getRepositoryIssues('facebook', 'react')
      .then(res => {
        console.log(res);
        return this.issueService.getIssueComments(res[0].comments_url);
      }).then(res => {
        console.log(res);
      });
  }

}
