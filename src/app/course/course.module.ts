import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CourseEntryNotesComponent} from './course-entry-notes/course-entry-notes.component';


@NgModule({
  declarations: [
    CourseEntryNotesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadComponent: () => import('./courses-view/courses-view.component').then(m => m.CoursesViewComponent),
        pathMatch: 'prefix',
        title: 'Courses List',
      },
      {
        path: ':id', loadComponent: () => import('./course-view/course-view.component').then(m => m.CourseViewComponent)
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
