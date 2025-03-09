import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InventoryViewComponent} from './inventory-view.component';
import {InventoryService} from '../../services/inventory.service';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {InventoryMetadata} from '../../model/inventory-metadata';

describe('InventoryViewComponent', () => {
  let component: InventoryViewComponent;
  let fixture: ComponentFixture<InventoryViewComponent>;
  let inventoryServiceIsLoadedMock = new BehaviorSubject<boolean>(true);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryViewComponent],
      providers: [
        {
          provide: InventoryService, useValue: {
            isInventoryLoaded: jest.fn().mockReturnValue(inventoryServiceIsLoadedMock.asObservable()),
            getMetadata: jest.fn().mockReturnValue(of(undefined)),
            getColumns: jest.fn().mockReturnValue(of(["One", "Two", "Three"])),
            getSpecimens: jest.fn().mockReturnValue(of([]))
          } as Partial<InventoryService>
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when inventory is loaded', () => {
    beforeEach(() => {
      inventoryServiceIsLoadedMock.next(true);
      fixture.detectChanges();
    });

    it('should display the inventory table', () => {
      expect(fixture.nativeElement.querySelector('#inventory-view-grid')).toBeDefined();
    });

    it('should not display the import component', () => {
      expect(fixture.nativeElement.querySelector('#inventory-import-component')).toBeNull();
    });

  });

  describe('when inventory is not loaded', () => {
    beforeEach(() => {
      inventoryServiceIsLoadedMock.next(false);
      fixture.detectChanges();
    });

    it('should not display the inventory table', () => {
      expect(fixture.nativeElement.querySelector('#inventory-view-grid')).toBeNull();
    });

    it('should display the import component', () => {
      expect(fixture.nativeElement.querySelector('#inventory-import-component')).toBeDefined();
    });

  });
});
