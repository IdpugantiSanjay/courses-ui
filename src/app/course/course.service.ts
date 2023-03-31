import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Course, CourseWatchInfo} from "./course";
import {map, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  readonly prefix = "/api/v1/users/1/courses"

  constructor(private http: HttpClient) {
  }

  List() {
    return this.http.get<{ items: Course[] }>(this.prefix)
  }

  Get(id: number) {
    const params = new HttpParams().set("view", "entries")
    return this.http.get<Course>(`${this.prefix}/${id}`, {params})
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
