import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {GetCourseView, CourseWatchInfo} from "./course";
import {map, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  readonly prefix = "/api/v1/users/1/courses"

  constructor(private http: HttpClient) {
  }

  List() {
    return this.http.get<{ items: GetCourseView[] }>(this.prefix)
  }

  Get(id: number) {
    // const cachedCourse = localStorage.getItem(`course-${id}`)
    // if (cachedCourse) return of(JSON.parse(cachedCourse) as GetCourseView)
    const params = new HttpParams().set("view", "entries")
    return this.http.get<GetCourseView>(`${this.prefix}/${id}`, {params})

    // .pipe(
    //   tap(response => {
    //     localStorage.setItem(`course-${id}`, JSON.stringify(response))
    //   })
    // )
  }

  // SaveNote(request: { courseId: number, entryId: number, note: string }) {
  //   return this.http.post(`/api/notes`, request)
  // }
  //
  //
  // GetNote(request: { courseId: number, entryId: number }) {
  //   return this.http.get<{ note: string }>(`/api/notes/${request.courseId}/${request.entryId}`).pipe(map(x => x.note))
  // }
  //
  //
  // GetEntriesWithNotes(courseId: number) {
  //   return this.http.get<{ entryIdList: number[] }>(`/api/notes/${courseId}`, {})
  // }


  // SetWatched(courseId: number, entryId: number) {
  //   return this.http.post(`/api/watched/${courseId}/${entryId}`, {})
  // }
  //
  // RemoveWatched(courseId: number, entryId: number) {
  //   return this.http.delete(`/api/watched/${courseId}/${entryId}`)
  // }
  //
  // Watched(courseId: number) {
  //   return this.http.get<GetWatchedResponse>(`/api/watched/${courseId}`)
  // }
}
