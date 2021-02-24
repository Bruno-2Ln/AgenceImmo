import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartStrokePropertyComponent } from './heart-stroke-property.component';

describe('HeartStrokePropertyComponent', () => {
  let component: HeartStrokePropertyComponent;
  let fixture: ComponentFixture<HeartStrokePropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeartStrokePropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeartStrokePropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
