import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { APIResponse } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';
import { Game } from 'src/app/models';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  sort: string = '';
  platform: string;
  games: Array<Game>;
  search = '';
  private routeSub: Subscription;
  private gameSub: Subscription;
  pageSize: number = 15;
  pagesBtns: number[];

  constructor(
    public httpService: HttpService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {
    this.setPage(1);
  }

  page: number = 1;
  totalPages = 1;
  query = { page: 1, page_size: this.pageSize };
  setPage(page: number) {
    this.query['page'] = page;
    this.page = page;
    this.searchGames();
  }
  ngOnInit(): void {
    this.activateRoute.params.subscribe((params: Params) => {
      const q = { ordering: 'metacrit', page: 1 };
      if (params['game-search']) q['search'] = params['game-search'];
      this.query = { ...this.query, ...q };
      this.searchGames();
    });

    // if (this.filter) console.log(this.filter);
  }

  setPlatform() {
    this.query['platforms'] = this.platform;
    this.setPage(1);
  }

  canGoNext = false;
  canGoPrev = false;
  noOfPages = 8;
  searchGames(): void {
    if (this.gameSub) this.gameSub.unsubscribe();
    this.gameSub = this.httpService.getGameList(this.query).subscribe((res) => {
      this._processPaginator(res.count);
      this.games = res.results as Game[];
    });
  }
  private _processPaginator(count: number) {
    this.totalPages = Math.ceil(count / this.pageSize);

    const idx = (this.pagesBtns ?? [this.page]).findIndex(
      (p) => p == this.page
    );
    let start = 0;
    if (idx == -1) start = 0;
    else if (idx == 0) start = Math.max(0, this.page - this.noOfPages - 1);
    else if (idx == this.noOfPages - 1) start = this.page - 1;
    else start = this.pagesBtns[0] - 1;

    this.pagesBtns = new Array(this.noOfPages)
      .fill(0)
      .map((p, i) => i + start + 1);

    this.canGoPrev = this.pagesBtns[0] > 1;
    this.canGoNext =
      this.pagesBtns[this.pagesBtns.length - 1] < this.totalPages;
  }

  openGameDetails(id: string): void {
    this.router.navigate(['gameDB/details', id]);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.gameSub ? this.gameSub.unsubscribe() : null;
    this.routeSub ? this.routeSub.unsubscribe() : null;
  }
}
