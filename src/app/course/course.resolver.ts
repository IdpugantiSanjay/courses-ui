import {Injectable} from '@angular/core';
import {
  Resolve,
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

  resolve(route: ActivatedRouteSnapshot): Observable<CourseViewRouteData> {
    const watchedInfo = this.service.Watched(route.params['id'])
    const course = this.service.Get(+route.params['id'])
    const entryIdListHavingNotes = this.service.GetEntriesWithNotes(+route.params['id']).pipe(map(x => x.entryIdList))

    return zip(course, watchedInfo, entryIdListHavingNotes).pipe(
      map(([course, watchedInfo, entriesWithNotes]) => {
        const watchedEntriesSet = new Set<number>(watchedInfo.watchedEntries?.map(e => e.id) || [])
        for (const entry of course.entries || []) {
          if (watchedEntriesSet.has(entry.id)) {
            entry.watched = true
            entry.hasNotes = entriesWithNotes.includes(entry.id)
          }
        }
        const courseWithDurationLeft: CourseViewRouteData['course'] = { ...course, durationLeft: watchedInfo.durationLeft }
        return {course: courseWithDurationLeft, watchedInfo}
      })
    )
  }
}
