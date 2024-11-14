import { TestBed } from '@angular/core/testing';

import { NotFGuard } from './not-f.guard';

describe('NotFGuard', () => {
  let guard: NotFGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NotFGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
