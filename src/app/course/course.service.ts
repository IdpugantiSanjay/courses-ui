import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GetCourseView, GetWatchedResponse} from "./course";
import {of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  // #coursesCache = new Map<number, GetCourseView>()

  constructor(private http: HttpClient) {
  }

  List() {
    return this.http.get<{ courses: GetCourseView[] }>('/api/courses')
  }

  Get(id: number) {
    const cachedCourse = localStorage.getItem(`course-${id}`)
    if (cachedCourse) return of(JSON.parse(cachedCourse) as GetCourseView)
    return this.http.get<GetCourseView>(`/api/courses/${id}`).pipe(
      tap(response => {
        localStorage.setItem(`course-${id}`, JSON.stringify(response))
      })
    )
  }


  SetWatched(courseId: number, entryId: number) {
    return this.http.post(`/api/watched/${courseId}/${entryId}`, {})
  }

  RemoveWatched(courseId: number, entryId: number) {
    return this.http.delete(`/api/watched/${courseId}/${entryId}`)
  }

  Watched(courseId: number) {
    return this.http.get<GetWatchedResponse>(`/api/watched/${courseId}`)
  }
}
