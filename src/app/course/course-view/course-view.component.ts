import {AfterViewInit, ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GetCourseView, GetWatchedResponse} from "../course";
import {CourseService} from "../course.service";
import {FormControl} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseViewComponent implements OnInit, AfterViewInit {

  course!: GetCourseView
  watchedInfo: GetWatchedResponse | undefined
  search = new FormControl('')

  hideCompleted = false

  get filteredCourseEntries() {
    const search = this.search.value
    let entries = this.course?.entries ?? []

    if (search) {
      entries = entries.filter(c => c.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) ?? []
    }

    if (this.hideCompleted) {
      entries = entries.filter(e => !e.watched)
    }

    return entries
  }

  get hasSections(): boolean {
    if (this.course.entries?.length) {
      return !!this.course.entries[0].section
    }
    return false
  }

  get sections() {
    const sections = [...(this.course.entries || []).map(c => c.section)]
    return new Set([...sections.filter(s => this.filteredCourseEntries.filter(e => e.section == s).length > 0)])
  }

  constructor(private readonly route: ActivatedRoute, private readonly service: CourseService, private readonly titleService: Title, public readonly router: Router, @Inject(DOCUMENT) private document: Document) {
  }

  get formattedProgress() {
    return Math.round(this.watchedInfo?.progress || 0)
  }

  ngOnInit(): void {
    this.route.data.subscribe(({vm}) => {
      const {course, watchedInfo} = vm;
      this.course = course
      this.watchedInfo = watchedInfo
      this.titleService.setTitle(this.course.name)
    })
  }

  ngAfterViewInit(): void {
    this.#scrollToNextEntryToWatch()
  }

  #scrollToNextEntryToWatch() {
    const firstNonWatchedEntrySelector = '.course__entries .course__entries__entry:first-child:not(.course__entries__entry__watched)'
    const firstNonWatchedEntry = this.document.querySelector(firstNonWatchedEntrySelector)
    firstNonWatchedEntry?.scrollIntoView({behavior: 'smooth', block: 'start' })
  }


  toggleWatched(entryId: number) {
    const entry = this.course?.entries?.find(e => e.id === entryId)
    if (entry) {
      entry.watched = !entry.watched
      if (entry.watched) {
        this.service.SetWatched(this.course.id, entryId).subscribe()
      } else {
        this.service.RemoveWatched(this.course.id, entryId).subscribe()
      }
    }
  }


  sectionEntries(section: string) {
    return this.filteredCourseEntries?.filter(c => c.section === section)
  }

  toggleCompletedStrategy() {
    if (this.hideCompleted) this.hideCompleted = false
    else if (!this.hideCompleted) this.hideCompleted = true
  }

  disableClearFiltersButton(): boolean {
    return this.course.entries?.length === this.filteredCourseEntries.length
  }

  clearFilters() {
    this.search.setValue('')
    this.hideCompleted = false
  }
}
