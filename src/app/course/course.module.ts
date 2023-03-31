import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CourseListComponent} from './course-list/course-list.component';
import {CourseViewComponent} from './course-view/course-view.component';
import {RouterModule} from "@angular/router";
import {CourseListResolver} from "./course-list.resolver";
import {CourseResolver} from "./course.resolver";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CourseEntryListComponent } from './course-entry-list/course-entry-list.component';
import { CourseEntryNotesComponent } from './course-entry-notes/course-entry-notes.component';


@NgModule({
  declarations: [
    CourseListComponent,
    CourseViewComponent,
    CourseEntryListComponent,
    CourseEntryNotesComponent
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
        path: ':id', component: CourseViewComponent
      },
      {
        path: ':id/:entryId/notes', component: CourseEntryNotesComponent
      }
    ]),
    FormsModule,
    ReactiveFormsModule
  ],
})
export class CourseModule {
}
