import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  search: string;
  error: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  searchClick() {
    let urlTokens = this.search.split('/');
    let len = urlTokens.length;
    if (len >= 2) {
      let owner = urlTokens[len - 2];
      let repo = urlTokens[len - 1];
      this.router.navigate([`/${owner}/${repo}`]);
    } else {
      this.search = '';
      this.error = 'Invalid link. Use \'https://github.com/[owner]/[repo]\'';
    }
  }

}
