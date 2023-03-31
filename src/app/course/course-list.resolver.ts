import {Injectable} from '@angular/core';
import {
  Resolve
} from '@angular/router';
import {map, Observable, pluck} from 'rxjs';
import {CourseService} from "./course.service";
import {CourseListPageData} from "./course";

@Injectable({
  providedIn: 'root'
})
export class CourseListResolver implements Resolve<CourseListPageData> {
  constructor(private readonly service: CourseService) {
  }

  resolve(): Observable<CourseListPageData> {
    return this.service.List().pipe(pluck('items'), map(c => {
      const pageData: CourseListPageData = {
        completed: [],
        inProgress: [],
        notStarted: c
      }
      return pageData
    }));
  }
}
