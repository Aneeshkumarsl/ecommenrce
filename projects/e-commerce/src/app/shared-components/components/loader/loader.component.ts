import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../sharedServices/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  show!: boolean;
  constructor(private _loaderService: LoaderService) {}

  ngOnInit() {
    this._loaderService.loadState.subscribe(res => {
      this.show = res;
    });
  }
}
