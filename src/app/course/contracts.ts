interface CourseResponse {
  id: number;
  name: string;
  duration: string;
  kind: string;
}

interface DefaultCourseResponse extends CourseResponse {
  isHighDefinition: boolean;
  playlistId?: string;
  kind: "Default";
}

export type Entry = {
  id: number;
  name: string;
  videoId?: string;
  sequenceNumber: number;
  duration: string;
  section?: string
}

// interface WithEntriesCourseResponse extends CourseResponse {
//   kind: "WithEntries";
//   entries: Entry[];
// }

// type CourseResponseVariant = DefaultCourseResponse | WithEntriesCourseResponse;



type CreateRequestBodyCommonProps = {
  name: string;
  duration: string;
};

type Default = CreateRequestBodyCommonProps & {
  categories?: string[];
  isHighDefinition: boolean;
  entries: Entry[];
};


type Playlist = CreateRequestBodyCommonProps & {
  playlistId: string;
  categories?: string[];
  isHighDefinition: boolean;
  entries: PlaylistEntry[];
};

type PlaylistEntry = Entry & {
  videoId: string;
};

export type CreateCourseRequestBody = Default | Playlist

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
  playlistId?: string
  entries?: CourseEntry[]
}


export type CourseWatchInfo = {
  watchedDuration: string,
  progress: number,
  watchedIdList: number[],
  durationLeft: string
}



// export interface IListResponse<TListItem> {
//   readonly items: TListItem[];
//   readonly nextPageToken: string;
// }
//
// export interface WatchResponseBody {
//   readonly courseId: number,
//   readonly entryId: number
// }


// export interface WatchStats {
//   readonly watchedDuration: string,
//   readonly durationLeft: string,
//   readonly watchedIdList: number[]
// }
