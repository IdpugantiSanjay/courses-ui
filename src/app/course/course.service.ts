import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GetCourseView, GetWatchedResponse} from "./course";

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
    return this.http.get<GetCourseView>(`/api/courses/${id}`)
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
