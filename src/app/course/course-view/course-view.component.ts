import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GetCourseView, GetWatchedResponse} from "../course";
import {CourseService} from "../course.service";
import {FormControl} from "@angular/forms";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseViewComponent implements OnInit {
  course: GetCourseView | undefined
  watchedInfo: GetWatchedResponse | undefined
  search = new FormControl('')

  get filteredCourseEntries() {
    const search = this.search.value
    if (search) {
      return this.course?.entries?.filter(c => c.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    }
    return this.course?.entries
  }

  constructor(private readonly route: ActivatedRoute, private readonly service: CourseService, private readonly titleService: Title) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(({vm}) => {
      const { course, watchedInfo } = vm;
      this.course = course
      this.watchedInfo = watchedInfo

      this.titleService.setTitle(this.course!.name)
    })
  }


  toggleWatched(entryId: number) {
    const entry = this.course?.entries?.find(e => e.id === entryId)
    if (entry) {
      entry.watched = !entry.watched
      if (entry.watched) {
        this.service.SetWatched(this.course!.id, entryId).subscribe()
      } else {
        this.service.RemoveWatched(this.course!.id, entryId).subscribe()
      }
    }
  }
}
