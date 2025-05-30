import {Specimen} from '../model/specimen';
import {ColumnMetadata} from '../model/column-metadata';

export const DEMO_INVENTORY_NAME: string = 'demoInventory';

export const DEMO_INVENTORY_COLUMNS: ColumnMetadata[] = [
  new ColumnMetadata(0, "Number"),
  new ColumnMetadata(1, "Phyllum"),
  new ColumnMetadata(2, "Class"),
  new ColumnMetadata(3, "Order"),
  new ColumnMetadata(4, "Genus"),
  new ColumnMetadata(5, "Species"),
  new ColumnMetadata(6, "Author"),
  new ColumnMetadata(7, "Age"),
  new ColumnMetadata(8, "Country"),
  new ColumnMetadata(9, "Locality"),
];

export const DEMO_INVENTORY_SPECIMENS: Specimen[] = [
  {id: 0,
    selected: true,
    data: {
      number: 'LTG-001',
      phyllum: 'Mollusca',
      class: 'Cephalopoda',
      order: 'Ammonitida',
      genus: "Hildoceras",
      species: 'bifrons',
      author: '(Bruguière, 1789)',
      age: 'Toarcian',
      country: "France",
      locality: "Pouillenay (Côte d'Or)"
    }
  },

  {id: 1,
    selected: true,
    data: {
      number: 'LTG-002',
      phyllum: 'Cnidaria',
      class: 'Anthozoa',
      order: 'Scleractinia',
      genus: 'Chondrocoenia',
      species: 'clavellata',
      author: 'Terquem and Piette, 1865',
      age: 'Sinemurian',
      country: 'Morocco',
      locality: 'Amellagou'
    }
  },
  {id: 2,
    selected: true,
    data: {
      number: 'LTG-003',
      phyllum: 'Cnidaria',
      class: 'Anthozoa',
      order: 'Hexanthiniaria ?',
      genus: 'Hispaniastraea',
      species: 'muricana',
      author: 'Turnsek and Geyer, 1975',
      age: 'Sinemurian',
      country: 'Morocco',
      locality: 'Amellagou'
    }
  },
  {id: 3,
    selected: true,
    data: {
      number: 'LTG-004',
      phyllum: 'Cnidaria',
      class: 'Anthozoa',
      order: 'Scleractinia',
      genus: 'Coryphyllia',
      species: 'regularis',
      author: 'Cuif, 1975',
      age: 'Pliensbachian',
      country: 'Morocco',
      locality: 'Amellagou'
    }
  },
  {id: 4,
    selected: true,
    data: {
      number: 'LTG-005',
      phyllum: 'Cnidaria',
      class: 'Anthozoa',
      order: 'Hexanthiniaria ?',
      genus: 'Hispaniastraea',
      species: 'muricana',
      author: 'Turnsek and Geyer, 1975',
      age: 'Sinemurian',
      country: 'Morocco',
      locality: 'Amellagou'
    }
  },
  {id: 5,
    selected: true,
    data: {
      number: 'LTG-006',
      phyllum: 'Cnidaria',
      class: 'Anthozoa',
      order: 'Scleractinia',
      genus: 'Phacelostylophyllum',
      species: 'suttonensis',
      author: '(Duncan, 1867)',
      age: 'Sinemurian',
      country: 'Morocco',
      locality: 'Amellagou'
    }
  },
  {id: 6,
    selected: true,
    data: {
      number: 'LTG-007',
      phyllum: 'Cnidaria',
      class: 'Anthozoa',
      order: 'Scleractinia',
      genus: 'Phacelostylophyllum',
      species: 'martini',
      author: '(Fromentel, 1860)',
      age: 'Sinemurian',
      country: 'Morocco',
      locality: 'Amellagou'
    }
  },
  {id: 7,
    selected: true,
    data: {
      number: 'LTG-008',
      phyllum: 'Cnidaria',
      class: 'Anthozoa',
      order: 'Scleractinia',
      genus: 'Vallimeandropsis',
      species: 'lineata',
      author: '(Beauvais, 1986)',
      age: 'Sinemurian / Pliensbachian',
      country: 'Morocco',
      locality: 'Amellagou'
    }
  },
  {id: 8,
    selected: true,
    data: {
      number: 'LTG-009',
      phyllum: 'Cnidaria',
      class: 'Anthozoa',
      order: 'Scleractinia',
      genus: 'Coryphyllia',
      species: 'regularis',
      author: 'Cuif, 1975',
      age: 'Sinemurian / Pliensbachian',
      country: 'Morocco',
      locality: 'Amellagou'
    }
  },
  {id: 9,
    selected: true,
    data: {
      number: 'LTG-010',
      phyllum: 'Cnidaria',
      class: 'Anthozoa',
      order: 'Scleractinia',
      genus: 'Proleptophyllia',
      species: 'granulum',
      author: '(Fromentel & Ferry, 1866)',
      age: 'Pliensbachian',
      country: 'Morocco',
      locality: 'Amellagou'
    }
  },
  {id: 10,
    selected: true,
    data: {
      number: 'LTG-011',
      phyllum: 'Cnidaria',
      class: 'Anthozoa',
      order: 'Scleractinia',
      genus: 'Chondrocoenia',
      species: 'plana',
      author: '(Duncan, 1867)',
      age: 'Pliensbachian',
      country: 'Morocco',
      locality: 'Amellagou'
    }
  },
  {id: 11,
    selected: true,
    data: {
      number: 'LTG-012',
      phyllum: 'Cnidaria',
      class: 'Anthozoa',
      order: 'Scleractinia',
      genus: 'Parastraeomorpha',
      species: 'minuscula',
      author: 'Roniewicz, 1989',
      age: 'Pliensbachian',
      country: 'Morocco',
      locality: 'Amellagou'
    }
  },
];
