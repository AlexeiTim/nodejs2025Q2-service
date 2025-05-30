import { TrackStore } from '../track-store/track-store.interface';
import { UserStore } from '../user-store/user-store.interface';

export interface Database {
  users: UserStore;
  tracks: TrackStore;
}
