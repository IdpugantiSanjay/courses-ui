import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Course} from "./course";

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
}
