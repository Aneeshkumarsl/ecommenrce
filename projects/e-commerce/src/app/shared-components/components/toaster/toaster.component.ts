import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastService } from '../../../sharedServices/toaster.services';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
  host: { '[class.ngb-toasts]': 'true' },
})
export class ToasterComponent implements OnInit {
  constructor(public toastService: ToastService) {}

  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }

  ngOnInit(): void {}
}
