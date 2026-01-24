import {ComponentFixture, TestBed} from '@angular/core/testing';
import {beforeEach, describe, expect, it} from 'vitest';

import {InventoryImportPreviewComponent} from './inventory-import-preview.component';

describe('InventoryImportPreviewComponent', () => {
  let component: InventoryImportPreviewComponent;
  let fixture: ComponentFixture<InventoryImportPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryImportPreviewComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InventoryImportPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
