import {Injectable} from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {map, Observable, zip} from 'rxjs';
import {CourseViewRouteData} from "./course";
import {CourseService} from "./course.service";

@Injectable({
  providedIn: 'root'
})
export class CourseResolver implements Resolve<CourseViewRouteData> {

  constructor(private readonly service: CourseService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CourseViewRouteData> {
    const watchedInfo = this.service.Watched(route.params['id'])
    const course = this.service.Get(+route.params['id'])

    return zip(course, watchedInfo).pipe(
      map(([course, watchedInfo]) => {
        const watchedEntriesSet = new Set<number>(watchedInfo.watchedEntries?.map(e => e.id) || [])
        for (const entry of course.entries || []) {
          if (watchedEntriesSet.has(entry.id)) {
            entry.watched = true
          }
        }
        return {course, watchedInfo}
      })
    )
  }
}
