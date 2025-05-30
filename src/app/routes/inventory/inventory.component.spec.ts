import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InventoryComponent} from './inventory.component';
import {InventoryService} from '../../services/inventory.service';
import {BehaviorSubject, of} from 'rxjs';
import {provideHttpClient} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';

describe('InventoryViewComponent', () => {
  let component: InventoryComponent;
  let fixture: ComponentFixture<InventoryComponent>;
  let inventoryServiceIsLoadedMock = new BehaviorSubject<boolean>(true);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryComponent],
      providers: [
        provideHttpClient(),
        provideAnimations(),
        {
          provide: InventoryService, useValue: {
            getMetadata: jest.fn().mockReturnValue(of(undefined)),
            getColumns: jest.fn().mockReturnValue(of(["One", "Two", "Three"])),
            getInventorySize: jest.fn().mockReturnValue(100),
            getSpecimens: jest.fn().mockReturnValue([]),
            getSpecimenById: jest.fn().mockReturnValue(undefined),
            getSpeciemenSelectedIds: jest.fn().mockReturnValue(of([])),
            getSpeciemenSelectedIdsSync: jest.fn().mockReturnValue([]),
            loadNewInventory: jest.fn(),
            toggleSpecimenSelection: jest.fn(),
            toggleAllSpecimen: jest.fn()
          } as Partial<InventoryService>
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryComponent);
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
