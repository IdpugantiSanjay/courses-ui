import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Course} from "../contracts";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class CourseListComponent {
  @Input() courses!: Course[]
}
