import { Component } from '@angular/core';
import { Observable, fromEvent, merge, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {

  online$: Observable<boolean>;
  name: string;

  constructor() {
    this.online$ = merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false))
    )
    this.networkStatus()
  }  

  public networkStatus() {
    this.online$.subscribe(value => {
      this.name = `Angular 6 - Network Online? ${value}`;
    })
  }
}
