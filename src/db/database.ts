import { Album } from 'src/modules/album/entities/album.entity';
import { Artist } from 'src/modules/artist/entities/artist.entity';
import { Favorite } from 'src/modules/favorite/entities/favorite.entity';
import { Track } from 'src/modules/track/entities/track.entity';
import { User } from 'src/modules/user/entities/user.entity';

interface DataBase {
  users: Map<string, User[]>;
  tracks: Map<string, Track[]>;
  albums: Map<string, Album[]>;
  artists: Map<string, Artist[]>;
  favorites: Map<string, Favorite[]>;
}

export class DATA_BASE implements DataBase {
  users: Map<string, User[]>;
  tracks: Map<string, Track[]>;
  favorites: Map<string, Favorite[]>;
  albums: Map<string, Album[]>;
  artists: Map<string, Artist[]>;

  constructor() {
    this.users = new Map();
    this.tracks = new Map();
    this.albums = new Map();
    this.artists = new Map();
    this.favorites = new Map();
  }
}

export const myDbService = {
  user: {
    create: () => {},
    findMany: () => {},
  },
};
