import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {map, Observable, zip} from 'rxjs';
import {CourseViewRouteData} from "./course";
import {CourseService} from "./course.service";
import {WatchService} from "./watch.service";

@Injectable({
  providedIn: 'root'
})
export class CourseResolver implements Resolve<CourseViewRouteData> {

  constructor(private readonly courseService: CourseService, private readonly watchService: WatchService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const courseWatchStats = this.watchService.Get(route.params['id'])
    const course = this.courseService.Get(+route.params['id'])
    return zip(course, courseWatchStats).pipe(
      map(([course, courseWatchStats]) => {
        const watchedEntriesSet = new Set<number>(courseWatchStats.watchedIdList || [])
        for (const entry of course.entries || []) {
          if (watchedEntriesSet.has(entry.id)) {
            entry.watched = true
          }
        }
        const courseWithDurationLeft: CourseViewRouteData['course'] = course
        return {course: courseWithDurationLeft, courseWatchInfo: courseWatchStats}
      })
    );
  }
}
