import {TestBed} from '@angular/core/testing';
import {beforeEach, describe, expect, it} from 'vitest';

import {SpecimenMapperService} from './specimen-mapper.service';
import {ColumnsMapping} from './columns-mapping';

describe('SpecimenMapperService', () => {
  let service: SpecimenMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecimenMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe("Should map generics values", () => {

    it('should map generics values', () => {
      // Given
      const mappings: ColumnsMapping = {
        number: {index: 0},
        phylum: {index: 1},
        class: {index: 2},
        order: {index: 3},
        family: {index: 4},
        genus: {index: 5},
        species: {index: 6},
        country: {index: 7},
        region: {index: 8},
        location: {index: 9},
        age: {index: 10},
        lithostratigraphy: {index: 11}
      };

      //When
      const specimen = service.toSpecimen(
        [
          "LTG-001",
          "Mollusca",
          "Cephalopoda",
          "Ammonoidea",
          "Hildoceratidae",
          'Hildoceras',
          'bifrons',
          "France",
          "Véndée",
          "Chantonnay",
          "Toarcien",
          "Zone à bifrons"
        ],
        0,
        mappings
      );

      // Then
      expect(specimen.number).toBe("LTG-001");
      expect(specimen.phylum).toBe("Mollusca");
      expect(specimen.class).toBe("Cephalopoda");
      expect(specimen.order).toBe("Ammonoidea");
      expect(specimen.family).toBe("Hildoceratidae");
      expect(specimen.genus).toBe('Hildoceras');
      expect(specimen.species).toBe('bifrons');
      expect(specimen.country).toBe("France");
      expect(specimen.region).toBe("Véndée");
      expect(specimen.location).toBe("Chantonnay");
      expect(specimen.age).toBe("Toarcien");
      expect(specimen.lithostratigraphy).toBe("Zone à bifrons");
    });

  });

  describe("Should map author", () => {

    it('should map author when author and year together', () => {
      // Given
      const mappings: ColumnsMapping = {authorAndYear: {index: 0, name: "Author"}};

      //When
      const specimen = service.toSpecimen(["Martin, 1950"], 0, mappings);

      // Then
      expect(specimen.author).toBe("Martin, 1950");
    });

    it.each([
      ['Martin', '1950', 'Martin, 1950'],
      ["(d'Orbigny)", '1840', "(d'Orbigny, 1840)"],
      ["Smith", "", "Smith"],
      ["(Smith)", "", "(Smith)"],
      ["2012", "", "2012"],
      ["", "", ""]
    ])('should map author when author and year separated - case $2 ', (author: string, year: string, expected: string) => {
      // Given
      const mappings: ColumnsMapping = {
        authorOnly: {index: 0, name: "Author"},
        yearOnly: {index: 1, name: "Year"}
      };

      //When
      const specimen = service.toSpecimen([author, year], 0, mappings);

      // Then
      expect(specimen.author).toBe(expected);
    });

    it('should map author when empty', () => {
      // Given
      const mappings: ColumnsMapping = {};

      //When
      const specimen = service.toSpecimen([], 0, mappings);

      // Then
      expect(specimen.author).toBe("");
    });

  });
});
