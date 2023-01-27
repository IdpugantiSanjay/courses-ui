import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GetCourseView} from "../course";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  courses: GetCourseView[] = []

  constructor(private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(({courses}) => {
      this.courses = courses
    })
  }
}
