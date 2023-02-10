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
    return this.service.List().pipe(pluck('courses'), map(c => {
      const pageData: CourseListPageData = {
        completed: c.filter(c => c.progress === 100),
        inProgress: c.filter(c => c.progress > 0 && c.progress < 100).sort((a, z) => z.progress > a.progress ? 1 : -1),
        notStarted: c.filter(c => c.progress === 0)
      }
      return pageData
    }));
  }
}
