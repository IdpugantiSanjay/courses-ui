import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CourseListComponent} from './course-list/course-list.component';
import {CourseViewComponent} from './course-view/course-view.component';
import {RouterModule} from "@angular/router";
import {CourseListResolver} from "./course-list.resolver";
import {CourseResolver} from "./course.resolver";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CourseListComponent,
    CourseViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: CourseListComponent, resolve: {
          courses: CourseListResolver
        }, pathMatch: 'prefix', title: 'Courses List'
      },
      {
        path: ':id', component: CourseViewComponent, resolve: {
          vm: CourseResolver
        }
      },
    ]),
    FormsModule,
    ReactiveFormsModule
  ],
})
export class CourseModule {
}
