import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootloader } from '@angularclass/hmr';

import { AppModule } from './app';

export function run() {
  platformBrowserDynamic()
    .bootstrapModule(AppModule);
}

bootloader(run);