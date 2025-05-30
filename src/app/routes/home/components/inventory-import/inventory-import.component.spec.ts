import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InventoryImportComponent} from './inventory-import.component';
import {provideHttpClient} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

describe('InventoryImportComponent', () => {
  let component: InventoryImportComponent;
  let fixture: ComponentFixture<InventoryImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryImportComponent],
      providers: [
        provideHttpClient(),
        provideAnimationsAsync()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InventoryImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
