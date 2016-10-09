import { Component, Inject } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>My Angular 2 App</h1>
      {{test}}
    `
})

export class AppComponent {
  constructor(@Inject('AppLocalized') public test: string) {
    console.log(test);
    var d = new Promise(() => {})
  }
}
