import {ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
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
  course!: GetCourseView
  watchedInfo: GetWatchedResponse | undefined
  search = new FormControl('')

  tags = [
    {id: 1, name: ".NET"},
    {id: 2, name: "JavaScript"},
    {id: 3, name: "Web"},
    {id: 4, name: "CSS"},
    {id: 5, name: "Database"},
    {id: 6, name: "AWS"},
    {id: 7, name: "Security"},
    {id: 8, name: "Git"},
    {id: 9, name: "GitHub"},
    {id: 10, name: "Docker"},
  ]

  tag: string = ''
  addedTags: string[] = []

  @ViewChild('chips') chips!: ElementRef<HTMLDivElement>;


  addTagIfExist() {
    if (this.addedTags.length < 3 && [...this.tags.values()].map(t => t.name.toLowerCase()).includes(this.tag.toLowerCase()) && !this.addedTags.includes(this.tag)) {
      this.addedTags.push(this.tag)
      this.tag = ''
      this.updateCourseTags()
    }
  }


  updateCourseTags() {
    this.service.UpdateTags(this.course.id, this.addedTags.map(x => this.tags.find(t => t.name === x)!.id)).subscribe()
  }


  removeTag(tagName: string) {
    this.addedTags.splice(this.addedTags.findIndex(t => t.toLowerCase() == tagName.toLowerCase()), 1)
    this.updateCourseTags()
  }

  get tagsPlaceholder() {
    if (this.addedTags.length == 3) return 'Tags limit reached'
    return ''
  }

  get filteredCourseEntries() {
    const search = this.search.value
    if (search) {
      return this.course?.entries?.filter(c => c.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    }
    return this.course?.entries
  }

  get hasSections(): boolean {
    if (this.course?.entries?.length) {
      return !!this.course!.entries[0].section
    }
    return false
  }

  get sections() {
    const sections = [...this.course.entries?.map(c => c.section)!]
    return new Set([...sections.filter(s => this.filteredCourseEntries!.filter(e => e.section == s).length > 0)])
  }

  constructor(private readonly route: ActivatedRoute, private readonly service: CourseService, private readonly titleService: Title, public readonly router: Router) {
  }

  get formattedProgress() {
    return Math.round(this.watchedInfo?.progress || 0)
  }

  ngOnInit(): void {
    this.route.data.subscribe(({vm}) => {
      const {course, watchedInfo} = vm;
      this.course = course
      this.watchedInfo = watchedInfo
      this.titleService.setTitle(this.course!.name)
      this.addedTags = this.course.tags || []
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


  sectionEntries(section: string) {
    return this.filteredCourseEntries?.filter(c => c.section === section)
  }
}
