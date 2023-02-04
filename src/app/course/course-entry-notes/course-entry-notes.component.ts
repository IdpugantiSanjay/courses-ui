import {Component, OnInit} from '@angular/core';
import {CourseService} from "../course.service";
import {ActivatedRoute} from "@angular/router";


export const DEFAULT_NOTE_TEMPLATE = `### 🚩 Notes\n\n\n\n###❗ Important Concepts\n\n\n\n###❓ Research\n
  `

@Component({
  selector: 'app-course-entry-notes',
  templateUrl: './course-entry-notes.component.html',
  styleUrls: ['./course-entry-notes.component.scss']
})
export class CourseEntryNotesComponent implements OnInit {

  notes = DEFAULT_NOTE_TEMPLATE

  constructor(private service: CourseService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.service.GetNote({
      courseId: +this.route.snapshot.params['id'],
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
