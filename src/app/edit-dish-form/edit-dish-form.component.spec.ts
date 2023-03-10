import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDishFormComponent } from './edit-dish-form.component';

describe('EditDishFormComponent', () => {
  let component: EditDishFormComponent;
  let fixture: ComponentFixture<EditDishFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDishFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDishFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
