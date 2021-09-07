import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import {
  debounceTime,
  delay,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  gameId: string;
  game: Game;

  game$ = this.activatedRoute.params.pipe(
    filter((params) => this.gameId != params['id']),
    tap((ps) => (this.gameId = ps['id'])),
    switchMap(() => this.httpService.getGameDetails(this.gameId)),
    tap((game: Game) => {
      this.game = game;
      this._resetRating(game.metacritic);
    })
  );

  gameRating: number = 0;
  private _resetRating(rating: number) {
    setTimeout(() => {
      this.gameRating = rating;
      console.log('rating: ', rating);
    }, 1000);
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) {}

  //convert tp pipe with cache
  getColor(value: number): string {
    if (value > 75) return '#ef4655';
    else return '#f7aa38';
  }
}
