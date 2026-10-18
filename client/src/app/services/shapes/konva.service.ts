import {  Injectable } from '@angular/core';
import Konva from 'konva';

@Injectable({
  providedIn: 'root'
})
export class KonvaService {
  
  public constructor(){}

  public createCircle(stage: any, layer: any, transformer: any, menuNode: any, color: any, io: any): void {
    const circle = new Konva.Circle({
      x: 250,
      y: 250,
      radius: 45,
      fill: color,
      stroke: 'black',
      strokeWidth: 1,
      draggable: true,
      name: 'circle' + Math.random(),
      isSelected: true
    });
  
    circle.on('mouseover', () => {
      transformer.nodes([circle]);
      layer.draw();
    });
  
    circle.on('click', (e) => {
      e.target.draggable(true);
      menuNode?.classList.add('hidden');
      layer.draw();
    });
        
    // Emit the initial state of the circle to all clients
    io.emit('createCircle', {
      name: circle.attrs.name,
      x: circle.attrs.x,
      y: circle.attrs.y,
      radius: circle.attrs.radius,
      fill: circle.attrs.fill,
      stroke: circle.attrs.stroke,
      strokeWidth: circle.attrs.strokeWidth,
      draggable: circle.attrs.draggable,
      isSelected: circle.attrs.isSelected,
      scaleX: circle.attrs.scaleX,
      scaleY: circle.attrs.scaleY,
      rotation: circle.attrs.rotation,
    });

  }

  public createRectangle(stage: any, layer: any, transformer: any, color: any, io: any): void {
    const rect = new Konva.Rect({
        x: 250,
        y: 250,
        width: 120,
        height: 60,
        fill: color,
        stroke: 'black',
        strokeWidth: 1,
        draggable: true,
        name: 'rectangle' + Math.random(),
        isSelected: true
    }); 
   
    
    rect.on('mouseover ', () => {
        transformer.nodes([rect]);
    });


    rect.on('dblclick dbltab', (e) => {
      const textNode = new Konva.Text({
        text: 'Some text here',
        x: e.evt.clientX,
        y: e.evt.clientY,
        fontSize: 20,
        draggable: true,
        width: 200,
        name: 'text' + Math.random()
      });

    });

    // Emit the initial state of the rect
     io.emit('createRect', {
        name: rect.attrs.name,
        x: rect.attrs.x,
        y: rect.attrs.y,
        width: rect.attrs.width,
        height: rect.attrs.height,
        fill: rect.attrs.fill,
        stroke: rect.attrs.stroke,
        strokeWidth: rect.attrs.strokeWidth,
        draggable: rect.attrs.draggable,
        isSelected: rect.attrs.isSelected,
        scaleX: rect.attrs.scaleX,
        scaleY: rect.attrs.scaleY,
        rotation: rect.attrs.rotation
    });
  }

  public createSquare(stage: any, layer: any, transformer: any, color: any, io: any): void {
    const square = new Konva.Rect({
        x: 250,
        y: 250,
        width: 75,
        height: 75,
        fill: color,
        stroke: 'black',
        strokeWidth: 1,
        draggable: true,
        name: 'square' + Math.random(),
        isSelected: true
    }); 

    square.on('mouseover ', () => {
        transformer.nodes([square]);;
    });

  
    // Emit the initial state of the rect
    io.emit('createRect', {
        name: square.attrs.name,
        x: square.attrs.x,
        y: square.attrs.y,
        width: square.attrs.width,
        height: square.attrs.height,
        fill: square.attrs.fill,
        stroke: square.attrs.stroke,
        strokeWidth: square.attrs.strokeWidth,
        draggable: square.attrs.draggable,
        isSelected: square.attrs.isSelected,
        scaleX: square.attrs.scaleX,
        scaleY: square.attrs.scaleY,
        rotation: square.attrs.rotation
  });
   
  }

  public createLine(stage: any, layer: any, transformer: any, color: any, io: any): void {
    const line = new Konva.Line({
        points: [100, 0, 100, 100],
        stroke: 'black',
        strokeWidth: 3,
        draggable: true,
        name: 'line' + Math.random(), 
        isSelected: true
    }); 

    transformer.enabledAnchors(['top-left', 'top-right', 'bottom-left', 'bottom-right']);
    line.on('mouseover ', () => {
      const isVertical = line.points()[1] !== line.points()[3]; // Check if line is vertical

      if (isVertical) {
        transformer.enabledAnchors(['top-center', 'bottom-center']);
      } else {
        transformer.enabledAnchors(['middle-left', 'middle-right']);
      }
        transformer.nodes([line]);
        
    });
 
    io.emit('createLine', {
        name: line.attrs.name,
        points: line.attrs.points,
        fill: line.attrs.fill,
        stroke: line.attrs.stroke,
        strokeWidth: line.attrs.strokeWidth,
        draggable: line.attrs.draggable,
        isSelected: line.attrs.isSelected,
        scaleX: line.attrs.scaleX,
        scaleY: line.attrs.scaleY,
        rotation: line.attrs.rotation
    });
  
  }
 
  public createArrow(stage: any, layer: any, transformer: any, color: any, io: any): void {
    const arrow = new Konva.Arrow({
      x: 200,
      y: 100,
      points: [0, 0,  100,  100],
      pointerLength: 20,
      pointerWidth: 18,
      fill: color,
      stroke: 'black',
      strokeWidth: 2,
      draggable: true,
      name: 'arrow' + Math.random(),
      isSelected: true
    });

    arrow.on('mouseover ', () => {
      transformer.nodes([arrow]);

    });

    io.emit('createArrow', {
        name: arrow.attrs.name,
        points: arrow.attrs.points,
        pointerWidth: arrow.attrs.pointerWidth,
        pointerLength: arrow.attrs.pointerLength,
        fill: arrow.attrs.fill,
        stroke: arrow.attrs.stroke,
        strokeWidth: arrow.attrs.strokeWidth,
        draggable: arrow.attrs.draggable,
        isSelected: arrow.attrs.isSelected,
        scaleX: arrow.attrs.scaleX,
        scaleY: arrow.attrs.scaleY,
        rotation: arrow.attrs.rotation
    });

  }

  public createText(stage: any, layer: any, transformer: any, io: any): void {
    const textNode = new Konva.Text({
      text: 'Add some text here',
      x: 50,
      y: 80,
      fontSize: 20,
      draggable: true,
      width: 200,
      name: 'text' + Math.random()
    });


    textNode.on('transform', function () {
      // reset scale, so only with is changing by transformer
      textNode.setAttrs({
        width: textNode.width() * textNode.scaleX(),
        scaleX: 1,
      });
    });


    layer.add(transformer);

    io.emit('createText', {
      name: textNode.attrs.name,
      x: textNode.attrs.x,
      y: textNode.attrs.y,
      fontSize: textNode.attrs.fontSize,
      text: textNode.attrs.text,
      width: textNode.attrs.width,
      draggable: textNode.attrs.draggable,
      isSelected: textNode.attrs.isSelected,
      scaleX: textNode.attrs.scaleX,
      scaleY: textNode.attrs.scaleY,
      rotation: textNode.attrs.rotation
    });
    
  }

  public createPen(stage: any, layer: any, lastLine: any, mode: any, isPaint: any, io: any): void {
    mode = 'rectangle'; 
      stage.on('mousedown touchstart', (e: any) => {
        isPaint = true;
        const pos = stage.getPointerPosition();
        lastLine = new Konva.Line({
          stroke: '#000000',
          strokeWidth: 5,
          globalCompositeOperation:
             'source-over',
          lineCap: 'round',
          lineJoin: 'round',
          points: [pos!.x, pos!.y, pos!.x, pos!.y],
        });
        layer.add(lastLine);
        stage.container().style.cursor = 'pointer';
      });
  
      stage.on('mouseup touchend', () => {
        isPaint = false;
      });
  
      stage.on('mousemove touchmove', (e: any) => {
        if (!isPaint) {
          return;
        }
  
        e.evt.preventDefault();
  
        const pos = stage.getPointerPosition();
        const newPoints = lastLine.points().concat([pos!.x, pos!.y]);
        lastLine.points(newPoints);

        io.emit('draw', { points: newPoints});
      });

  }

  public createErase(stage: any, layer: any, lastLine: any, mode: any, isPaint: any, io: any): void { 
    mode = 'rectangle'; 
      stage.on('mousedown touchstart', (e: any) => {
        isPaint = true;
        const pos = stage.getPointerPosition();
        lastLine = new Konva.Line({
          stroke: '#000000',
          strokeWidth: 5,
          globalCompositeOperation: 'destination-out',
          lineCap: 'round',
          lineJoin: 'round',
          points: [pos!.x, pos!.y, pos!.x, pos!.y],
        });
        //layer.add(lastLine);
      });
  
      stage.on('mouseup touchend', () => {
        isPaint = false;
      });
  
      stage.on('mousemove touchmove', (e: any) => {
        if (!isPaint) {
          return;
        }
  
        e.evt.preventDefault();
  
        const pos = stage.getPointerPosition();
        const newPoints = lastLine.points().concat([pos!.x, pos!.y]);
        lastLine.points(newPoints);
        io.emit('erase', { points: newPoints});
      });
  
      stage.on('click', (e: any) => {
        if (mode === 'erase') {
          stage.container().classList.add('eraser-cursor');
          const shape = e.target;
          shape.destroy();
          layer.draw();
        } else {
          stage.container().style.cursor = 'auto';
        }
      });
    
  }

}