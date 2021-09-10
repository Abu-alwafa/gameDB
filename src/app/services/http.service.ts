import { HttpClient, HttpParams } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { APIResponse, Game } from '../models';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  platforms$ = this.http.get<any>(`${env.BASE_URL}/platforms`).pipe(
    map((res) => res.results),
    shareReplay()
  );

  getGameList(query: any): Observable<any> {
    const params = query;
    console.log('params: ', params);

    return this.http.get<any>(`${env.BASE_URL}/games`, {
      params,
    });
  }

  getGameDetails(id: string): Observable<Game> {
    const gameInfoRequest = this.http.get(`${env.BASE_URL}/games/${id}`);
    const gameTrailersRequest = this.http.get(
      `${env.BASE_URL}/games/${id}/movies`
    );
    const gameScreenshotsRequest = this.http.get(
      `${env.BASE_URL}/games/${id}/screenshots`
    );

    return forkJoin({
      gameInfoRequest,
      gameScreenshotsRequest,
      gameTrailersRequest,
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['gameInfoRequest'],
          screenshots: resp['gameScreenshotsRequest']?.results,
          trailers: resp['gameTrailersRequest']?.results,
        };
      })
    );
  }
}
