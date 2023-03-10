import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserBarComponent } from './admin-user-bar.component';

describe('AdminUserBarComponent', () => {
  let component: AdminUserBarComponent;
  let fixture: ComponentFixture<AdminUserBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUserBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
