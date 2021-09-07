import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-game-tabs',
  templateUrl: './game-tabs.component.html',
  styleUrls: ['./game-tabs.component.scss'],
})
export class GameTabsComponent implements OnInit {
  @Input()
  game: Game;
  color = 'blue';
  // gameId: string;
  // routeSub: Subscription;
  // gameSub: Subscription;
  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    // this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
    //   this.gameId = params['id'];
    //   this.getGameDetails(this.gameId);
    // });
  }

  // getGameDetails(id: string): void {
  //   this.gameSub = this.httpService
  //     .getGameDetails(id)
  //     .subscribe((gameResp: Game) => {
  //       this.game = gameResp;
  //       // setTimeout(() => {
  //       //   this.gameRating = this.game.metacritic;
  //       // }, 1000);
  //     });
  // }

  // ngOnDestroy(): void {
  //   //Called once, before the instance is destroyed.
  //   //Add 'implements OnDestroy' to the class.
  //   if (this.gameSub) this.gameSub.unsubscribe();
  //   if (this.routeSub) this.routeSub.unsubscribe();
  // }
}
