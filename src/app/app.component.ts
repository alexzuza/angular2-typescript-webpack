import {Component, OnInit, NgZone} from 'angular2/core';
import {ControlGroup, FormBuilder, Validators} from 'angular2/common';
import {Subject, Observable}  from 'rxjs/Rx';
import {RouteConfig, Router} from 'angular2/router';


@Component({
  selector: 'my-app',
  providers: [],
  pipes: [],
  template: `<h1>My Angular 2 App</h1>
  <div *ngFor="let item of arr">
    {{item}}
  </div>
    `
})

export class App {
  arr: Array<number> = [4,5,6,6];
  constructor() {
    console.clear();
  }
}
