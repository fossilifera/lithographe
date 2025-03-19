import {jsPDF} from 'jspdf';

export interface Shape {
  draw(doc: jsPDF, x: number, y: number): void
}
