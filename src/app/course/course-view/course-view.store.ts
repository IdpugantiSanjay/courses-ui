import {Injectable} from '@angular/core';
import {ComponentStore, tapResponse} from "@ngrx/component-store";
import {map, Observable, switchMap, tap, withLatestFrom} from "rxjs";
import {CourseService} from "../course.service";
import {WatchService} from "../watch.service";
import {Course, CourseEntry, CourseWatchInfo} from "../contracts";


type CourseViewState = {
  course: Course | undefined,
  watchInfo: CourseWatchInfo | undefined,
  hideWatched: boolean,
  search: string
}


function filterEntries(partialState: Omit<CourseViewState, 'watchInfo'>): CourseEntry[] {
  const {course, search, hideWatched} = partialState;
  const entries = course?.entries || []

  let filtered = [...entries]
  if (search) {
    filtered = filtered.filter(x => x.name.toLowerCase().includes(search.toLowerCase()))
  }
  if (hideWatched) {
    filtered = filtered.filter(x => !x.watched)
  }
  return filtered;
}

const CourseViewStateDefault: CourseViewState = Object.freeze({
  course: undefined,
  watchInfo: undefined,
  hideWatched: false,
  search: ''
})

@Injectable({
  providedIn: 'root'
})
export class CourseViewStore extends ComponentStore<CourseViewState> {
  // selectors
  readonly course$ = this.select(s => s.course)
  readonly search$ = this.select(s => s.search)
  readonly hideWatched$ = this.select(s => s.hideWatched)
  readonly #selectorsToFilter$ = this.select({
    course: this.course$,
    hideWatched: this.hideWatched$,
    search: this.search$
  })
  readonly entries$ = this.select(this.#selectorsToFilter$, filterEntries, { debounce: true })
  readonly watchInfo$ = this.select(s => s.watchInfo)
  readonly sections$ = this.select(s => s.course).pipe(map((course) => {
    const sections = course?.entries?.filter(e => !!e.section).map(e => e.section) || []
    return [...new Set(sections)];
  }))
  readonly hasSections$ = this.sections$.pipe(map(x => x.length))
  readonly canClear$ = this.select(s => s.hideWatched || !!s.search)

  sectionEntries(section: string): Observable<CourseEntry[]> {
    return this.entries$.pipe(
      map(e => e?.filter(x => x.section === section) || [])
    )
  }

  constructor(private course: CourseService, private watch: WatchService) {
    super({...CourseViewStateDefault})
  }

  // updaters
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

  setSearch(search: string) {
    this.patchState({
      search: search
    })
  }

  // effects

  readonly setWatched = this.effect((trigger$: Observable<number>) => {
    return trigger$.pipe(
      withLatestFrom(this.course$),
      switchMap(([entryId, course]) => {
        return this.watch.Create(course!.id, entryId)
      }),
      withLatestFrom(this.course$),
      tapResponse(
        ([_, c]) => this.fetchWatchInfo({courseId: c!.id}),
        (error) => console.error(error)
      )
    )
  })

  readonly deleteWatched = this.effect((trigger$: Observable<number>) => {
    return trigger$.pipe(
      switchMap((entryId) => {
        return this.watch.Delete(entryId)
      }),
      withLatestFrom(this.course$),
      tapResponse(
        ([_, c]) => this.fetchWatchInfo({courseId: c!.id}),
        (error) => console.error(error)
      )
    )
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
}
