import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, Route } from '@angular/router';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    let owner: string = this.activatedRoute.snapshot.params['owner'];
    let repo: string = this.activatedRoute.snapshot.params['repository'];
    console.log(`Owner: ${owner}, Repo: ${repo}`);
  }

}
