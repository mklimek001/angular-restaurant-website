import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenegerViewComponent } from './meneger-view.component';

describe('MenegerViewComponent', () => {
  let component: MenegerViewComponent;
  let fixture: ComponentFixture<MenegerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenegerViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenegerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
