import {Component, OnInit} from '@angular/core';
import {CoursesViewStore} from "./courses-view.store";
import {CourseListComponent} from "../course-list/course-list.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-courses-view',
  templateUrl: './courses-view.component.html',
  styleUrls: ['./courses-view.component.scss'],
  providers: [CoursesViewStore],
  standalone: true,
  imports: [CommonModule, CourseListComponent]
})
export class CoursesViewComponent implements OnInit {
  constructor(public readonly store: CoursesViewStore) {
  }

  ngOnInit(): void {
    this.store.fetchCourses()
  }
}
