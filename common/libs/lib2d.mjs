"use strict";
/**
 * @library lib2d
 * @description A library for classes that manage 2D graphics.
 */

class TPoint {
  x = 0;
  y = 0;
  constructor(aX, aY){
    this.x = aX;
    this.y = aY;
  }
} // End of TPoint class

class TPosition extends TPoint{
  constructor(aX, aY){
    super(aX, aY);
  }

  clone(){
    return new TPosition(this.x, this.y);
  }

  distanceToPoint(aPoint){
    const dx = this.x - aPoint.x;
    const dy = this.y - aPoint.y;
    return Math.hypot(dx, dy);
  }

}// End of TPosition class

class TRectangle extends TPosition{
  constructor(aX, aY, aWidth, aHeight){
    super(aX, aY);
    this.width = aWidth;
    this.height = aHeight;
  }

  get left(){
    return this.x;
  }

  get right(){
    return this.x + this.width;
  }

  get top(){
    return this.y;
  }

  get bottom(){
    return this.y + this.height;
  }

  isInsideRect(aRect){
    if(this.left >= aRect.right) return false;
    if(this.right <= aRect.left) return false;
    if(this.top >= aRect.bottom) return false;
    if(this.bottom <= aRect.top) return false;
    return true;
  }
}

export default {
  /**
   * @class TPoint
   * @description A class representation for x and y point in 2D.
   * @param {number} aX - The x-coordinate.
   * @param {number} aY - The y-coordinate.
   */
  TPoint,
  /**
   * @class TPosition
   * @description A position class for manipulation of point in 2D.
   * @param {number} aX - The x-coordinate.
   * @param {number} aY - The y-coordinate.
   * @extends TPoint
   * @method clone - A method to clone the position object.
   * @method distanceToPoint - A method to calculate the distance to another point.
   */
  TPosition,

  /**
   * @class TRectangle
   * @extends TPosition
   * @description A class representation for a rectangle in 2D.
   * @param {number} aX - The x-coordinate.
   * @param {number} aY - The y-coordinate.
   * @param {number} aWidth - The width of the rectangle.
   * @param {number} aHeight - The height of the rectangle.
   * @property {number} width - The width of the rectangle.
   * @property {number} height - The height of the rectangle.
   * @property {number} left - The left side of the rectangle. 
   * @property {number} right - The right side of the rectangle.
   * @property {number} top - The top side of the rectangle.
   * @property {number} bottom - The bottom side of the rectangle.
   */
  TRectangle
}