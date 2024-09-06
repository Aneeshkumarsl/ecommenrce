import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSmallGridComponent } from './product-small-grid.component';

describe('ProductSmallGridComponent', () => {
  let component: ProductSmallGridComponent;
  let fixture: ComponentFixture<ProductSmallGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSmallGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSmallGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
