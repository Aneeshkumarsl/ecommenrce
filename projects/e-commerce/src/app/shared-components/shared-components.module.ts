import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ProductNavComponent } from './components/nav-bar/product-nav/product-nav.component';
import { SearchNavComponent } from './components/nav-bar/search-nav/search-nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { ImageModalComponent } from './components/image-modal/image-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BackToTopComponent } from './components/back-to-top/back-to-top.component';
import { RatingComponent } from './components/rating/rating.component';
import { LoaderComponent } from './components/loader/loader.component';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './components/modal/modal.component';
import { ToasterComponent } from './components/toaster/toaster.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavBarComponent,
    ProductNavComponent,
    SearchNavComponent,
    FooterComponent,
    ImageModalComponent,
    BackToTopComponent,
    RatingComponent,
    LoaderComponent,
    ModalComponent,
    ToasterComponent,
  ],
  imports: [CommonModule, NgbModule, RouterModule, ReactiveFormsModule],
  exports: [
    NavBarComponent,
    ProductNavComponent,
    SearchNavComponent,
    FooterComponent,
    ImageModalComponent,
    BackToTopComponent,
    RatingComponent,
    LoaderComponent,
    ModalComponent,
    ToasterComponent,
  ],
})
export class SharedComponentsModule {}
