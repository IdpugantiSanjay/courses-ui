import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {GetCourseView} from "../course";

@Component({
  selector: 'app-course-entry-list',
  templateUrl: './course-entry-list.component.html',
  styleUrls: ['./course-entry-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseEntryListComponent {
  @Input() entries: GetCourseView['entries'];
  @Output() toggleWatched = new EventEmitter<number>()
  @Output() notes = new EventEmitter<{ entryId: number }>()

  sendToggleWatchedEvent(entryId: number) {
    this.toggleWatched.emit(entryId)
  }
}
