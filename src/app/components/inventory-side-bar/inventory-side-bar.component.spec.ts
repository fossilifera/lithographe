import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorySideBarComponent } from './inventory-side-bar.component';

describe('InventorySideBarComponent', () => {
  let component: InventorySideBarComponent;
  let fixture: ComponentFixture<InventorySideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventorySideBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventorySideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
