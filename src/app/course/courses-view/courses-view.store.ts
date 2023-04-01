import {Injectable} from '@angular/core';
import {Course} from "../contracts";
import {ComponentStore, tapResponse} from "@ngrx/component-store";
import {CourseService} from "../course.service";
import {Observable, switchMap} from "rxjs";


type CourseListState = {
  inProgress: Course[],
  notStarted: Course[],
  completed: Course[]
}

const CourseListStateDefaults: CourseListState = Object.freeze({
  inProgress: [],
  notStarted: [],
  completed: []
})


function groupCourses(courses: Course[]) {
  return {
    notStarted: courses.filter(c => !!c),
    inProgress: [],
    completed: []
  } satisfies CourseListState
}

@Injectable({
  providedIn: 'root'
})
export class CoursesViewStore extends ComponentStore<CourseListState> {
  readonly notStarted$ = this.select(s => s.notStarted)
  readonly completed$ = this.select(s => s.completed)
  readonly inProgress$ = this.select(s => s.inProgress)

  constructor(private readonly course: CourseService) {
    super({...CourseListStateDefaults})
  }

  fetchCourses = this.effect((trigger$: Observable<void>) => {
    return trigger$.pipe(
      switchMap(() => {
        return this.course.List().pipe(
          tapResponse(
            response => {
              const state = groupCourses(response.items)
              this.setState({
                ...state
              })
            }, (error) => console.error(error))
        )
      })
    )
  })
}
