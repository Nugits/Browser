import { Injectable } from '@angular/core';

import { HttpService } from './http.service';

import { Issue } from '../shared/models/github-models';

@Injectable()
export class IssueService {

  constructor(
    private httpService: HttpService
  ) { }

  getRepositoryIssues(owner: string, repo: string): Promise<Issue[]> {
    return this.httpService.getRequest<Issue[]>(`https://api.github.com/repos/${owner}/${repo}/issues`);
  }

  getIssueComments(url: string): Promise<Comment[]> {
    return this.httpService.getRequest<Comment[]>(url);
  }

}
