import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEntryNotesComponent } from './course-entry-notes.component';

describe('CourseEntryNotesComponent', () => {
  let component: CourseEntryNotesComponent;
  let fixture: ComponentFixture<CourseEntryNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseEntryNotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseEntryNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
