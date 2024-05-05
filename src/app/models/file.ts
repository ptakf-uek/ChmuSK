export class File {
  filename: string;
  folder: string;
  id: string;
  isPrivate: boolean;
  tag: string;
  type: string;
  lastModified: string;
  size: number;

  constructor(
    filename: string = '',
    folder: string = '',
    id: string = '',
    isPrivate: boolean = true,
    tag: string = '',
    type: string = '',
    lastModified: string = '',
    size: number = 0,
  ) {
    this.filename = filename;
    this.folder = folder;
    this.id = id;
    this.isPrivate = isPrivate;
    this.tag = tag;
    this.type = type;
    this.lastModified = lastModified;
    this.size = size;
  }
}
