export interface Folder {
  name: string;
  path: string;
  tag: string;
}

export interface FolderContent {
  data: Folder[];
  cursor: string;
  hasMore: boolean;
}
