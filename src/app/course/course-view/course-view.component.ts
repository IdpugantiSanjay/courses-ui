import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {CourseService} from "../course.service";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {CommonModule, DOCUMENT} from "@angular/common";
import {WatchService} from "../watch.service";
import {CourseViewStore} from "./course-view.store";
import {filter, takeUntil, tap} from "rxjs";
import {CourseEntryListComponent} from "../course-entry-list/course-entry-list.component";

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CourseViewStore],
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, CourseEntryListComponent]
})
export class CourseViewComponent implements OnInit {
  search = new FormControl('')

  constructor(private readonly route: ActivatedRoute, private readonly courseService: CourseService, private readonly watchService: WatchService, private readonly titleService: Title, public readonly router: Router, @Inject(DOCUMENT) private document: Document, readonly store: CourseViewStore) {
  }

  ngOnInit(): void {
    const courseId = +this.route.snapshot.params['id']
    this.store.fetchCourse({courseId})
    this.store.fetchWatchInfo({courseId})
    this.search.valueChanges.pipe(takeUntil(this.store.destroy$), tap(search => this.store.setSearch(search || ''))).subscribe()

    this.store.course$.pipe(takeUntil(this.store.destroy$), filter(Boolean)).subscribe(
      course => this.titleService.setTitle(course!.name)
    )
  }
}
