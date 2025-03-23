import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryTableComponent } from './inventory-table.component';
import {provideAnimations} from '@angular/platform-browser/animations';

describe('InventoryTableComponent', () => {
  let component: InventoryTableComponent;
  let fixture: ComponentFixture<InventoryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryTableComponent],
      providers: [
        provideAnimations()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
