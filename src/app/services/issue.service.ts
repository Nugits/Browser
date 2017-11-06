import { Injectable } from '@angular/core';

import { HttpService } from './http.service';

import { Issue, GithubRepository } from '../shared/models/github-models';

@Injectable()
export class IssueService {

  constructor(
    private httpService: HttpService
  ) { }

  getRepositoryInfo(owner: string, repo: string): Promise<GithubRepository> {
    return this.httpService.getRequest<GithubRepository>(`https://api.github.com/repos/${owner}/${repo}`);
  }

  getRepositoryIssues(owner: string, repo: string): Promise<Issue[]> {
    return this.httpService.getRequest<Issue[]>(`https://api.github.com/repos/${owner}/${repo}/issues`);
  }

  getIssueComments(url: string): Promise<Comment[]> {
    return this.httpService.getRequest<Comment[]>(url);
  }

  getIssueLabelTypes(issues: Issue[]): Set<string> {
    let types: Set<string> = new Set<string>();
    issues.forEach(issue => {
      issue.labels.forEach(label => {
        let type = this.extractType(label.name);
        if (type !== null) {
          types.add(type);
        }
      });
    });

    return types;
  }

  getSubtypesByType(issues: Issue[], type: string): Set<string> {
    let subTypes: Set<string> = new Set<string>();
    issues.forEach(issue => {
      issue.labels
        .filter(label => {
          let extracted = this.extractType(label.name);
          return extracted === null ? false : extracted.toLowerCase() === type.toLowerCase();
        })
        .forEach(label => {
          let subtype = this.extractSubtype(label.name);
          if (subtype !== null) {
            subTypes.add(subtype);
          }
        })
    });

    return subTypes;
  }

  getLabelsCountBySubtype(issues: Issue[], type: string): {[key: string]: number} {
    let result: {[key: string]: number} = {};
    issues.forEach(issue => {
      let used: Set<string> = new Set<string>();
      issue.labels.filter(l => {
        let t = this.extractType(l.name);
        return t === null ? false : type === t;
      })
      .forEach(label => {
        let sub = this.extractSubtype(label.name);
        if (sub !== null && !used.has(sub)) {
          if (result[sub] === undefined) {
            result[sub] = 0;
          }
          result[sub]++;
          used.add(sub);
        }
      });
    });

    return result;
  }

  extractType(label: string): string {
    return this.labelSplit(label, 0);
  }

  extractSubtype(label: string): string {
    return this.labelSplit(label, 1);
  }

  private labelSplit(label: string, index: number): string {
    let splitted = label.split(':');
    if (splitted.length !== 2) {
      return null;
    }
    return splitted[index].trim();
  }
}
