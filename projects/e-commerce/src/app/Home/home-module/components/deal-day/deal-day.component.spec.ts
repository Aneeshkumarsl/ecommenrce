import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealDayComponent } from './deal-day.component';

describe('DealDayComponent', () => {
  let component: DealDayComponent;
  let fixture: ComponentFixture<DealDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
