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

interface WithEntriesCourseResponse extends CourseResponse {
  kind: "WithEntries";
  entries: Entry[];
}

type CourseResponseVariant = DefaultCourseResponse | WithEntriesCourseResponse;



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
