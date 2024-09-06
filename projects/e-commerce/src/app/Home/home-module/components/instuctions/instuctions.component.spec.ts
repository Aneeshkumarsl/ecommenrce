import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstuctionsComponent } from './instuctions.component';

describe('InstuctionsComponent', () => {
  let component: InstuctionsComponent;
  let fixture: ComponentFixture<InstuctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstuctionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstuctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
