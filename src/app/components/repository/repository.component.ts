import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';

import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css'],
  providers: [HttpService]
})
export class RepositoryComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    let owner: string = this.activatedRoute.snapshot.params['owner'];
    let repo: string = this.activatedRoute.snapshot.params['repository'];
    console.log(`Owner: ${owner}, Repo: ${repo}`);
    this.httpService.getRequest<string>('test')
      .then(res => console.log(res));
  }

}
