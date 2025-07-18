import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {InventoryService} from '../../inventory/inventory.service';
import {Checkbox} from 'primeng/checkbox';
import {TableModule} from 'primeng/table';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {Logger} from '../../shared/logger/logger';

@Component({
  selector: 'ltg-inventory-view',
  imports: [
    Checkbox,
    FormsModule,
    TableModule,
  ],
  templateUrl: './inventory.component.html',
  host: {'class': 'view'},
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventoryComponent implements OnInit {

  protected readonly inventoryService: InventoryService = inject(InventoryService);
  private logger: Logger = new Logger("InventoryComponent");
  private readonly router = inject(Router);

  ngOnInit(): void {
    if (!this.inventoryService.isInventoryLoaded()) {
      if (this.inventoryService.isImportInventoryAvailableInStorage()) {
        // Open the inventory available in local storage
        if (!this.inventoryService.loadInventoryFromStorage()) {
          this.router.navigate(['/']);
        }
      } else {
        this.logger.info("No inventory available in storage, redirection to home page");
        this.router.navigate(['/']);
      }
    }
  }

}
