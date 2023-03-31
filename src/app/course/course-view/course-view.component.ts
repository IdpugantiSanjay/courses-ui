import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CourseService} from "../course.service";
import {FormControl} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {DOCUMENT} from "@angular/common";
import {WatchService} from "../watch.service";
import {CourseViewStore} from "./course-view.store";
import {takeUntil, tap} from "rxjs";

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
  }
}
