import {Injectable} from '@angular/core';
import {Specimen} from '../inventory/specimen';
import {ColumnsMapping} from './columns-mapping';

@Injectable({
  providedIn: 'root'
})
export class SpecimenMapperService {

  public toSpecimen(values: Record<string, string>, i: number, mappings: ColumnsMapping): Specimen {
    return {
      id: i,
      selected: true,
      number: this.getValue(values, mappings.number?.index),
      phylum: this.getValue(values, mappings.phylum?.index),
      class: this.getValue(values, mappings.class?.index),
      order: this.getValue(values, mappings.order?.index),
      family: this.getValue(values, mappings.family?.index),
      genus: this.getValue(values, mappings.genus?.index),
      species: this.getValue(values, mappings.species?.index),
      author: this.getAuthorYear(values, mappings),
      country: this.getValue(values, mappings.country?.index),
      region: this.getValue(values, mappings.region?.index),
      location: this.getValue(values, mappings.location?.index),
      age: this.getValue(values, mappings.age?.index),
      lithostratigraphy: this.getValue(values, mappings.lithostratigraphy?.index)
    };
  }

  private getValue(values: Record<string, string>, columnIndex: number | undefined): string {
    if (columnIndex && values[columnIndex]) {
      return values[columnIndex];
    }
    return '';
  }

  private getAuthorYear(values: Record<string, string>, mappings: ColumnsMapping): string {
    if (mappings.authorAndYear) {
      return values[mappings.authorAndYear.index];
    } else if (
      mappings.authorOnly
      && values[mappings.authorOnly.index]
      && mappings.yearOnly
      && values[mappings.yearOnly.index]
    ) {
      const withParenthesis: boolean = /^\(.*\)$/.test(values[mappings.authorOnly.index]);
      if (withParenthesis) {
        const regexAuthor = values[mappings.authorOnly.index].match(/\(([^)]+)\)/);
        if (regexAuthor) {
          return "(" + regexAuthor[1] + ", " + values[mappings.yearOnly.index] + ")";
        }
      } else {
        return values[mappings.authorOnly.index] + ", " + values[mappings.yearOnly.index];
      }
    }
    return '';
  }

}
