import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private inventoryLoadingState = new BehaviorSubject<boolean>(false);

  public isInventoryLoaded(): Observable<boolean> {
      return this.inventoryLoadingState.asObservable();
  }


}
