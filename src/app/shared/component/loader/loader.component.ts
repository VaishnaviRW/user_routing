import { Component } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  template: `
    <div class="loader-overlay" *ngIf="loaderService.loading$ | async">
      <div class="spinner" role="status" aria-label="Loading"></div>
      <span>Loading...</span>
    </div>
  `,
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  constructor(public loaderService: LoaderService) {}
}
