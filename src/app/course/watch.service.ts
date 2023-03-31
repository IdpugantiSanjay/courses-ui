import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CourseWatchInfo} from "./course";

@Injectable({
  providedIn: 'root'
})
export class WatchService {
  readonly serviceApi = "/api/v1/users/1/watch"
  constructor(private http: HttpClient) { }

  Create(courseId: number, entryId: number) {
    return this.http.post(this.serviceApi, { courseId, entryId });
  }

  Delete(entryId: number) {
    return this.http.delete(`${this.serviceApi}/${entryId}`);
  }

  Get(courseId: number) {
    return this.http.get<CourseWatchInfo>(`${this.serviceApi}/${courseId}`)
  }
}
