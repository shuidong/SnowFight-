
var Rectangle = function(x, y, width, height) {
    this.set(x, y, width, height);
}

Rectangle.prototype.set = function(x, y, width, height){
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || this.width || 0;
    this.height = height || this.height || 0;
}

// returns x coordinate or where the left side of this rectangle is
Rectangle.prototype.leftSide = function() {
    return this.x;
}

// returns y coordinate or where the top side of this rectangle is
Rectangle.prototype.topSide = function() {
    return this.y;
}

// returns (x + width) coordinate or where the right side of this rectangle is
Rectangle.prototype.rightSide = function() {
    return this.x + this.width;
}

// returns (y + height) coordinate or where the bottom side of this rectangle is
Rectangle.prototype.bottomSide = function() {
    return this.y + this.height;
}

Rectangle.prototype.centerX = function() {
    return this.x + this.width / 2;
}

Rectangle.prototype.centerY = function() {
    return this.y + this.height / 2;
}

// returns whether or not the given rectangle r completely encompasses this rectangle
Rectangle.prototype.within = function(r) {
    return !this.notWithin();
}

// returns 0 if this is within the given rectangle, else the closest x or y difference that would put this in the given rectangle
Rectangle.prototype.notWithin = function(r) {
    if ( r )
    {
        if (r.leftSide()   > this.leftSide())   return this.leftSide()   - r.leftSide(); 
        if (r.rightSide()  < this.rightSide())  return this.rightSide()  - r.rightSide();
        if (r.topSide()    > this.topSide())    return this.topSide()    - r.topSide();
        if (r.bottomSide() < this.bottomSide()) return this.bottomSide() - r.bottomSide();
    }
    return 0;
}

// returns whether or not this rectangle overlaps the given rectangle r
Rectangle.prototype.overlaps = function(r) {
    return (this.leftSide() < r.rightSide() && 
            r.leftSide() < this.rightSide() && 
            this.topSide() < r.bottomSide() &&
            r.topSide() < this.bottomSide());
}

Rectangle.prototype.outside = function(r) {
    return !this.overlaps(r);
}

// should change to image support though this class should not be managing drawing at all
Rectangle.prototype.draw = function(canvas) {
    Rectangle.fill(canvas,this,this.fillStyle);
    if ( this.strokeStyle )
    {
        Rectangle.stroke(canvas,this,this.strokeStyle,this.strokeWidth);
    }
}

Rectangle.prototype.drawText = function(canvas,text,x,y,textColor) {
    if ( text )
    {
        //text options
        canvas.fillStyle = textColor || this.textColor;
        canvas.font = this.fontSize + "px " + this.fontFamily;
     
        //text position
        canvas.textAlign = this.textAlign;
        canvas.textBaseline = this.textBaseline;
        //draw the text
        canvas.fillText(text, x, y);
    }
}

Rectangle.fill = function(canvas,r,style) {
    if ( style ) canvas.fillStyle = style;
    canvas.fillRect(r.leftSide(),r.topSide(),r.rightSide() - r.leftSide(),r.bottomSide() - r.topSide());
}

Rectangle.stroke = function(canvas,r,style,width) {
    if ( style ) canvas.strokeStyle = style;
    if ( width ) canvas.lineWidth = width;
    canvas.strokeRect(r.leftSide(),r.topSide(),r.rightSide() - r.leftSide(),r.bottomSide() - r.topSide());
}