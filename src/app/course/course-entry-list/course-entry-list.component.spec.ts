import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEntryListComponent } from './course-entry-list.component';

describe('CourseEntryListComponent', () => {
  let component: CourseEntryListComponent;
  let fixture: ComponentFixture<CourseEntryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseEntryListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseEntryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
