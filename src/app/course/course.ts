// export interface Course {
//   id: number;
//   name: string;
//   duration: string;
//   categories?: string[];
//   isHighDefinition: boolean;
//   path: string;
//   host: string;
//   entries: CourseEntry[];
// }


export interface CourseEntry {
  id: number;
  name: string;
  readableDuration: string;
  isHighDefinition: boolean;
  watched: boolean
  section: string
  hasNotes: boolean
  videoId?: string
}

export type CourseListPageData = {
  completed: Course[]
  inProgress: Course[]
  notStarted: Course[]
}


export type Course = {
  id: number;
  name: string;
  readableDuration: string;
  categories?: string[];
  isHighDefinition: boolean;
  // author?: string;
  // platform?: string;
  playlistId?: string
  entries?: CourseEntry[]
}


export type CourseWatchInfo = {
  watchedDuration: string,
  progress: number,
  watchedIdList: number[],
  durationLeft: string
}


export type CourseViewRouteData = {
  course: Course // & { durationLeft: string }
  courseWatchInfo: CourseWatchInfo
}
