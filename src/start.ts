import {bootstrap} from '@angular/platform-browser-dynamic';
/*
 * Platform and Environment
 * our providers/directives/pipes
 */
import {DIRECTIVES, PROVIDERS} from './platform/browser';
import {ENV_PROVIDERS} from './platform/environment';

/*
 * App Component
 * our top level component that holds all of our components
 */
import {App, APP_PROVIDERS} from './app';

export function main(initialHmrState?: any): Promise<any> {
  return bootstrap(App, [
    ...ENV_PROVIDERS,
    ...PROVIDERS,
    ...DIRECTIVES,
    ...APP_PROVIDERS
  ])
    .catch(err => console.error(err));
}

if ('development' === ENV && HMR === true) {
  let ngHmr = require('angular2-hmr');
  ngHmr.hotModuleReplacement(main, module);
} else {
  document.addEventListener('DOMContentLoaded', () => main());
}

