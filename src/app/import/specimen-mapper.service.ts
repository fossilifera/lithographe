import {Injectable} from '@angular/core';
import {Specimen} from '../inventory/specimen';
import {ColumnsMapping} from './columns-mapping';

@Injectable({
  providedIn: 'root'
})
export class SpecimenMapperService {

  public toSpecimen(values: string[], i: number, mappings: ColumnsMapping): Specimen {
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

  private getValue(values: string[], columnIndex: number | undefined): string {
    if (columnIndex !== undefined && values[columnIndex] !== undefined) {
      return this.cleanString(values[columnIndex]);
    }
    return '';
  }

  private getAuthorYear(values: string[], mappings: ColumnsMapping): string {
    if (mappings.authorAndYear !== undefined) {
      return this.cleanString(values[mappings.authorAndYear.index]);
    }

    let author: string | undefined = (mappings.authorOnly !== undefined && values[mappings.authorOnly.index] !== undefined) ?
      this.cleanString(values[mappings.authorOnly.index]) : undefined;
    const year: string | undefined = (mappings.yearOnly !== undefined && values[mappings.yearOnly.index] !== undefined) ?
      this.cleanString(values[mappings.yearOnly.index]) : undefined;
    const withParenthesis: boolean = /^\(.*\)$/.test(author ?? '');

    if (withParenthesis) {
      const regexAuthor = author ? author.match(/\(([^)]+)\)/) : null;
      if (regexAuthor) {
        author = regexAuthor[1];
      }
    }

    return [
      withParenthesis ? "(" : "",
      author ?? "",
      year ? `, ${year}` : "",
      withParenthesis ? ")" : "",
    ].join('');
  }

  private getStatus(values: string[], mappings: ColumnsMapping): string {
    let value: string = this.getValue(values, mappings.status?.index);
    if (mappings.statusToIgnore) {
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
