export class Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
}
