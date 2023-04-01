import {Component, OnInit} from '@angular/core';
import {CourseService} from "../course.service";
import {ActivatedRoute} from "@angular/router";
import {Observable, Subject} from "rxjs";
import {Course} from "../contracts";


export const DEFAULT_NOTE_TEMPLATE = `###❗ Notes\n\n\n\n###❓ Research\n
  `

@Component({
  selector: 'app-course-entry-notes',
  templateUrl: './course-entry-notes.component.html',
  styleUrls: ['./course-entry-notes.component.scss']
})
export class CourseEntryNotesComponent implements OnInit {
  save$ = new Subject<{ courseId: number, entryId: number, note: string }>()

  get courseId() {
    return +this.route.snapshot.params['id']
  }

  course$!: Observable<Course>
  notes = DEFAULT_NOTE_TEMPLATE

  buttonName: 'Save' | 'Saving...' | 'Saved' = 'Save'

  constructor(private service: CourseService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const courseId = +this.route.snapshot.params['id']
    this.course$ = this.service.Get(courseId)
    // this.service.GetNote({
    //   courseId: courseId,
    //   entryId: +this.route.snapshot.params['entryId']
    // }).subscribe(x => this.notes = x)

    // const HALF_SECOND = 500
    // this.save$
    //   .pipe(
    //     tap(() => this.buttonName = 'Saving...'),
    //     exhaustMap(payload => this.service.SaveNote(payload).pipe(delay(HALF_SECOND))),
    //     tap(() => this.buttonName = 'Saved'),
    //     delay(HALF_SECOND),
    //     tap(() => this.buttonName = 'Save'),
    //   ).subscribe()
  }

  save() {
    this.save$.next({
      courseId: +this.route.snapshot.params['id'],
      entryId: +this.route.snapshot.params['entryId'],
      note: this.notes
    })
  }
}
