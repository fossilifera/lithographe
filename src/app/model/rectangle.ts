import {jsPDF} from 'jspdf';
import {Shape} from './shape';

export class Rectangle implements Shape {

  private width: number;
  private height: number;
  private xOffset: number;
  private yOffset: number;
  private lineWidth: number;

  /**
   * Rectangle drawable in lable
   * @param {number} width - Widht of the rectangle
   * @param {number} height - Height of the rectangle
   * @param {number} xOffset - offset against left edge of the tag
   * @param {number} yOffset - offset against upper edge of the tag
   * @param {number} lineWidth - Thickness of the border line
   */
  constructor(width: number, height: number, xOffset: number, yOffset: number, lineWidth: number) {
    this.width = width;
    this.height = height;
    this.xOffset = xOffset;
    this.yOffset = yOffset;
    this.lineWidth = lineWidth;
  }

  draw(doc: jsPDF, x: number, y: number): void {
    console.log("Draw rectangle!")
    doc.setLineWidth(this.lineWidth);
    doc.rect(x + this.xOffset, y + this.yOffset, this.width, this.height);
  }

}
