import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GetCourseView, GetWatchedResponse} from "./course";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) {
  }

  List() {
    return this.http.get<{ courses: GetCourseView[] }>('/api/courses')
  }

  Get(id: number) {
    // const cachedCourse = localStorage.getItem(`course-${id}`)
    // if (cachedCourse) return of(JSON.parse(cachedCourse) as GetCourseView)
    return this.http.get<GetCourseView>(`/api/courses/${id}`).pipe(
      // tap(response => {
      //   localStorage.setItem(`course-${id}`, JSON.stringify(response))
      // })
    )
  }

  SaveNote(request: { courseId: number, entryId: number, note: string }) {
    return this.http.post(`/api/notes`, request)
  }


  GetNote(request: { courseId: number, entryId: number }) {
    return this.http.get<{ note: string }>(`/api/notes/${request.courseId}/${request.entryId}`).pipe(map(x => x.note))
  }


  GetEntriesWithNotes(courseId: number) {
    return this.http.get<{ entryIdList: number[] }>(`/api/notes/${courseId}`, {})
  }

  UpdateTags(courseId: number, tagIdList: number[]) {
      return this.http.patch(`/api/courses/${courseId}`, { courseId, tagIdList })
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
