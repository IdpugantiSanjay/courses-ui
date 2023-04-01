import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CourseEntry} from "../contracts";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-course-entry-list',
  templateUrl: './course-entry-list.component.html',
  styleUrls: ['./course-entry-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CourseEntryListComponent {
  @Input() entries!: CourseEntry[];
  @Output() toggleWatched = new EventEmitter<{ entryId: number, watched: boolean }>()
  @Output() notes = new EventEmitter<{ entryId: number }>()
}
