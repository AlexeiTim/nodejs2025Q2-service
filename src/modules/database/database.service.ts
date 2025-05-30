import { Injectable } from '@nestjs/common';
import { Database } from './interfaces/database.interface';
import { InMemoryUserStore } from './user-store/user.store';
import { UserStore } from './user-store/user-store.interface';
import { TrackStore } from './track-store/track-store.interface';
import { InMemoryTrackStore } from './track-store/track.store';

@Injectable()
export class DatabaseService implements Database {
  users: UserStore;
  tracks: TrackStore;

  constructor() {
    this.users = new InMemoryUserStore();
    this.tracks = new InMemoryTrackStore();
  }
}
