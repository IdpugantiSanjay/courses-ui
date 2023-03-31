import {Injectable} from '@angular/core';
import {ComponentStore} from "@ngrx/component-store";
import {Course, CourseEntry, CourseWatchInfo} from "../course";
import {map, Observable, switchMap, tap, withLatestFrom} from "rxjs";
import {CourseService} from "../course.service";
import {WatchService} from "../watch.service";

@Injectable({
  providedIn: 'root'
})
export class CourseViewStore extends ComponentStore<{
  course: Course | undefined,
  watchInfo: CourseWatchInfo | undefined,
  hideWatched: boolean,
  search: string
}> {

  readonly course$ = this.select(s => s.course)

  readonly entries$ = this.select(s => {
    const entries = s.course?.entries || [];
    return entries.filter(x => {
      let result = true
      if (s.search) {
        result = x.section.includes(s.search) || x.name.includes(s.search)
      }
      if (s.hideWatched && x.watched) {
        result = false
      }
      return result;
    })
  })

  readonly watchInfo$ = this.select(s => s.watchInfo)
  readonly sections$ = this.select(s => s).pipe(map((state) => {
    const sections = state.course?.entries?.map(e => e.section) || []
    return [...new Set(sections)];
  }))
  readonly hasSections$ = this.sections$.pipe(map(x => Boolean(x)))
  readonly hideWatched$ = this.select(s => s.hideWatched)
  readonly canClear$ = this.select(s => s.hideWatched || !!s.search)

  constructor(private course: CourseService, private watch: WatchService) {
    super({course: undefined, watchInfo: undefined, search: '', hideWatched: false})
  }

  readonly toggleHideWatched = this.updater((state) => {
    return {
      ...state,
      hideWatched: !state.hideWatched
    }
  })

  readonly clear = this.updater((state) => {
    return {
      ...state,
      search: '',
      hideWatched: false
    }
  })

  readonly fetchCourse = this.effect((trigger$: Observable<{ courseId: number }>) => {
    return trigger$.pipe(
      switchMap(x => {
        return this.course.Get(x.courseId).pipe(tap(x => this.#updateCourse(x)))
      })
    )
  })

  readonly fetchWatchInfo = this.effect((trigger$: Observable<{ courseId: number }>) => {
    return trigger$.pipe(
      switchMap(x => {
        return this.watch.Get(x.courseId).pipe(tap(x => this.#updateWatchInfo(x)))
      }),
    )
  })

  #updateCourse(course: Course) {
    this.patchState({
      course: course
    })
  }

  #updateWatchInfo(courseWatchInfo: CourseWatchInfo) {
    this.patchState((state) => {
      const entries = state.course?.entries?.map(x => {
        return {...x, watched: courseWatchInfo.watchedIdList.includes(x.id)}
      })
      return {
        course: {...state.course, entries} as Course,
        watchInfo: courseWatchInfo
      }
    })
  }

  readonly setWatched = this.effect((trigger$: Observable<number>) => {
    return trigger$.pipe(
      withLatestFrom(this.course$),
      switchMap(([entryId, course]) => {
        return this.watch.Create(course!.id, entryId)
      }),
      withLatestFrom(this.course$),
      tap(([_, c]) => this.fetchWatchInfo({courseId: c!.id}))
    )
  })

  readonly deleteWatched = this.effect((trigger$: Observable<number>) => {
    return trigger$.pipe(
      switchMap((entryId) => {
        return this.watch.Delete(entryId)
      }),
      withLatestFrom(this.course$),
      tap(([_, c]) => this.fetchWatchInfo({courseId: c!.id}))
    )
  })

  sectionEntries(section: string): Observable<CourseEntry[]> {
    return this.entries$.pipe(
      map(e => e?.filter(x => x.section === section) || [])
    )
  }

  setSearch(search: string) {
    this.patchState({
      search: search
    })
  }
}
