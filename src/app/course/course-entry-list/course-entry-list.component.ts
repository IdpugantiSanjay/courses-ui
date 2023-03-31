import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Course} from "../course";

@Component({
  selector: 'app-course-entry-list',
  templateUrl: './course-entry-list.component.html',
  styleUrls: ['./course-entry-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseEntryListComponent {
  @Input() entries!: Course['entries'];
  @Output() toggleWatched = new EventEmitter<{ entryId: number, watched: boolean }>()
  @Output() notes = new EventEmitter<{ entryId: number }>()
}
