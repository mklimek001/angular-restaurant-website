import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketElemComponent } from './basket-elem.component';

describe('BasketElemComponent', () => {
  let component: BasketElemComponent;
  let fixture: ComponentFixture<BasketElemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasketElemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketElemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
