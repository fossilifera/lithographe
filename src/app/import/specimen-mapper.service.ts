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
      lithostratigraphy: this.getValue(values, mappings.lithostratigraphy?.index),
      status: this.getStatus(values, mappings)
    };
  }

  private getValue(values: Record<string, string>, columnIndex: number | undefined): string {
    if (columnIndex && values[columnIndex]) {
      return this.cleanString(values[columnIndex]);
    }
    return '';
  }

  private getAuthorYear(values: Record<string, string>, mappings: ColumnsMapping): string {
    if (mappings.authorAndYear) {
      return this.cleanString(values[mappings.authorAndYear.index]);
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
          return this.cleanString("(" + regexAuthor[1] + ", " + values[mappings.yearOnly.index] + ")");
        }
      } else {
        return this.cleanString(values[mappings.authorOnly.index] + ", " + values[mappings.yearOnly.index]);
      }
    }
    return '';
  }

  private getStatus(values: Record<string, string>, mappings: ColumnsMapping): string {
    let value: string = this.getValue(values, mappings.status?.index);
    if(mappings.statusToIgnore) {
      mappings.statusToIgnore.split('\n').forEach((strToIgnore: string) => {
          value = value.replace(strToIgnore, '');
      })
    }
    return value;
  }

  private cleanString(str: string): string {
    // remove breaklines
    return str.replace(/\n/g, ' ');
  }

}
