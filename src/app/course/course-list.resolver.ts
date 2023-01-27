import {Injectable} from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable, pluck} from 'rxjs';
import {CourseService} from "./course.service";
import {GetCourseView} from "./course";

@Injectable({
  providedIn: 'root'
})
export class CourseListResolver implements Resolve<GetCourseView[]> {
  constructor(private readonly service: CourseService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GetCourseView[]> {
    return this.service.List().pipe(pluck('courses'));
  }
}
