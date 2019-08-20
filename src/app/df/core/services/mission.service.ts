import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable()
export class MissionService {
  // Observable string sources
  private missionAnnouncedSource = new Subject<string>();

  private _locked = false;

  // Observable string streams
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();

  constructor() {
  }

  // Service message commands
  announceMission(mission: string) {
    this.missionAnnouncedSource.next(mission);
  }

  getLockStatus(): boolean {
    return this._locked;
  }
  setLockStatus(status: boolean) {
    this._locked = status;
  }


}
