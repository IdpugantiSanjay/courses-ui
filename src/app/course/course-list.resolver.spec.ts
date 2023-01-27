import { TestBed } from '@angular/core/testing';

import { CourseListResolver } from './course-list.resolver';

describe('CourseListResolver', () => {
  let resolver: CourseListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CourseListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
