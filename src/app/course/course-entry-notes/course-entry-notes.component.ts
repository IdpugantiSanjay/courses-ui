import {Component, OnInit} from '@angular/core';
import {CourseService} from "../course.service";
import {ActivatedRoute} from "@angular/router";
import {GetCourseView} from "../course";
import {Observable} from "rxjs";


export const DEFAULT_NOTE_TEMPLATE = `###❗ Notes\n\n\n\n###❓ Research\n
  `

@Component({
  selector: 'app-course-entry-notes',
  templateUrl: './course-entry-notes.component.html',
  styleUrls: ['./course-entry-notes.component.scss']
})
export class CourseEntryNotesComponent implements OnInit {

  get courseId() {
    return +this.route.snapshot.params['id']
  }

  course$!: Observable<GetCourseView>


  notes = DEFAULT_NOTE_TEMPLATE

  constructor(private service: CourseService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const courseId =+this.route.snapshot.params['id']
    this.course$ = this.service.Get(courseId)
    this.service.GetNote({
      courseId: courseId,
      entryId: +this.route.snapshot.params['entryId']
    }).subscribe(x => this.notes = x)
  }

  save() {
    this.service.SaveNote({
      courseId: +this.route.snapshot.params['id'],
      entryId: +this.route.snapshot.params['entryId'],
      note: this.notes
    }).subscribe()
  }
}
