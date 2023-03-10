import { TestBed } from '@angular/core/testing';

import { DishesServiceService } from './dishes-service.service';

describe('DishesServiceService', () => {
  let service: DishesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DishesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
