import { Component } from '@angular/core';
import { ColumnMode } from 'projects/swimlane/ngx-datatable/src/public-api';

@Component({
  selector: 'basic-material-theme-demo',
  template: `
    <div>
      <h3>
        Material Theme
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/basic/material.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        [rows]="rows"
        [loadingIndicator]="loadingIndicator"
        [columns]="columns"
        [columnMode]="ColumnMode.force"
        [headerHeight]="40"
        [summaryRow]="true"
        [summaryPosition]="'bottom'"
        [footerHeight]="40"
        [limit]="10"
        rowHeight="auto"
        [reorderable]="reorderable"
      >
        <datatable-pager
          [pagerLeftArrowIcon]="'datatable-icon-left'"
          [pagerRightArrowIcon]="'datatable-icon-right'"
          [pagerPreviousIcon]="'datatable-icon-prev'"
          [pagerNextIcon]="'datatable-icon-skip'"
          [page]="1"
          [size]="4"
          [count]="300"
        >
        </datatable-pager>
      </ngx-datatable>
    </div>
  `
})
export class MaterialThemeComponent {
  rows = [];
  loadingIndicator = true;
  reorderable = true;

  columns = [
    { prop: 'name', summaryFunc: () => null },
    { name: 'Gender', summaryFunc: cells => this.summaryForGender(cells) },
    { name: 'Company', summaryFunc: () => null }
  ];

  ColumnMode = ColumnMode;

  constructor() {
    this.fetch(data => {
      this.rows = data;
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 1500);
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  private summaryForGender(cells: string[]) {
    const males = cells.filter(cell => cell === 'male').length;
    const females = cells.filter(cell => cell === 'female').length;

    return `males: ${males}, females: ${females}`;
  }
}
