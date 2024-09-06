import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal,NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() value:any;

  constructor(public activeModal: NgbActiveModal, config: NgbModalConfig,) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
  }

}
