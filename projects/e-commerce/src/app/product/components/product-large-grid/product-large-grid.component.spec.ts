import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductLargeGridComponent } from './product-large-grid.component';

describe('ProductLargeGridComponent', () => {
  let component: ProductLargeGridComponent;
  let fixture: ComponentFixture<ProductLargeGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductLargeGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductLargeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
