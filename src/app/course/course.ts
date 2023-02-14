export interface Course {
  id: number;
  name: string;
  duration: string;
  categories?: string[];
  isHighDefinition: boolean;
  path: string;
  host: string;
  entries: CourseEntry[];
}


export interface CourseEntry {
  id: number;
  name: string;
  duration: string;
  isHighDefinition: boolean;
  watched: boolean
  section: string
  hasNotes: boolean
  videoId?: string
}

export type CourseListPageData = {
  completed: GetCourseView[]

  inProgress: GetCourseView[]

  notStarted: GetCourseView[]
}


export type GetCourseView = {
  id: number;
  name: string;
  duration: string;
  categories?: string[];
  isHighDefinition: boolean;
  author?: string;
  platform?: string;

  progress: number
  playlistId?: string
  entries?: CourseEntry[]
}


export type GetWatchedResponse = {
  watchedCount: number,
  watchedDuration: string,
  progress: number,
  watchedEntries: Array<{ id: number }>,
  durationLeft: string
}


export type CourseViewRouteData = {
  course: GetCourseView & { durationLeft: string }

  watchedInfo: GetWatchedResponse
}
