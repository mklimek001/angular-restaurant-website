import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenegerBarComponent } from './meneger-bar.component';

describe('MenegerBarComponent', () => {
  let component: MenegerBarComponent;
  let fixture: ComponentFixture<MenegerBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenegerBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenegerBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
