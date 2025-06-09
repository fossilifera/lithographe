import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InventoryComponent} from './inventory.component';
import {InventoryService} from '../../inventory/inventory.service';
import {provideHttpClient} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {signal} from '@angular/core';
import {Specimen} from '../../inventory/specimen';

describe('InventoryViewComponent', () => {
  let component: InventoryComponent;
  let fixture: ComponentFixture<InventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryComponent],
      providers: [
        provideHttpClient(),
        provideAnimations(),
        {
          provide: InventoryService, useValue: {
            specimens: signal([] as Specimen[]),
            isInventoryLoaded: signal(true),
            isAllSpecimensSelected: signal(true),
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

});
