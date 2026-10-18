import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { KonvaService } from '../services';
import Konva from 'konva';
import { BehaviorSubject, Subject } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-whiteboard',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.scss'],
})
export class WhiteboardComponent implements OnInit, AfterViewInit {
  public stage!: Konva.Stage;
  public layer!: Konva.Layer;
  public width: any;
  public height: any;
  public transformer: Konva.Transformer = new Konva.Transformer();
  private isPaint: boolean = false;
  private mode = 'brush';
  private lastLine!: Konva.Line;
  public isDrawing: Boolean = false;
  public selectedTool: string = '';
  public isShapeDisplay: boolean = false;
  public isImageDisplay: boolean = false;
  public selectionRectangle: any;
  public contextMenuPosition: any;
  public color: string = '#ffffff';
  public x1: any;
  public y1: any;
  public x2: any;
  public y2: any;
  public currentShape: any;
  public menuNode: any;
  public color$ = new Subject<string>();
  public images: any;
  public selectedImage: any;
  public emojis: any;
  public shapes: any;
  public io = io(environment.apiUrl, {
    withCredentials: true
  });
  public data$: BehaviorSubject<any> = new BehaviorSubject('');
  public isChatClosed: boolean; 
  @ViewChild('tool') tool: ElementRef<any>;
  public savedStage: any;

  public constructor(
    private elementRef: ElementRef,
    private shapeService: KonvaService
  ) {
    this.tool = this.elementRef.nativeElement;
    // set the stage with the width and height 
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.images = [
      {
        name: 'Appreciation',
        image: './assets/images/appreciate.png',
      },
      {
        name: 'Audio Conversation',
        image: './assets/images/audio_conversation.png',
      },
      {
        name: 'Basketball',
        image: './assets/images/basketball.png',
      },
      {
        name: 'Stand By Car',
        image: './assets/images/by_my_car.png',
      },
      {
        name: 'Compose Music',
        image: './assets/images/compose_music.png',
      },
      {
        name: 'Delivery Truck',
        image: './assets/images/delivery_truck.png',
      },
      {
        name: 'Educator',
        image: './assets/images/educator.png',
      },
      {
        name: 'Family',
        image: './assets/images/family.png',
      },
      {
        name: 'Female',
        image: './assets/images/female.png',
      },
      {
        name: 'Flying',
        image: './assets/images/flying.png',
      },
      {
        name: 'Gaming',
        image: './assets/images/gaming.png',
      },
      {
        name: 'Halloween',
        image: './assets/images/halloween.png',
      },
      {
        name: 'Learning',
        image: './assets/images/learning_sketching.png',
      },
      {
        name: 'Male',
        image: './assets/images/male.png',
      },
      {
        name: 'Mindfulness',
        image: './assets/images/mindfulness.png',
      },
      {
        name: 'Multitasking',
        image: './assets/images/multitasking.png',
      },
      {
        name: 'Newspaper',
        image: './assets/images/newspaper.png',
      },
      {
        name: 'Scientist',
        image: './assets/images/scientist.png',
      },
      {
        name: 'Sharing Knowledge',
        image: './assets/images/sharing_knowledge.png',
      },
      {
        name: 'Shopping',
        image: './assets/images/shopping_bags.png',
      },
      {
        name: 'Traveling',
        image: './assets/images/traveling.png',
      },
      {
        name: 'Website',
        image: './assets/images/website_builder.png',
      },
      {
        name: 'Well done',
        image: './assets/images/well_done.png',
      },
      {
        name: 'Working',
        image: './assets/images/working.png',
      },
    ];
    this.emojis = [
      {
        name: 'Anger',
        image: './assets/emojis/anger.png',
      },
      {
        name: 'Crying',
        image: './assets/emojis/crying.png',
      },
      {
        name: 'Gamer',
        image: './assets/emojis/gamer.png',
      },
      {
        name: 'Hush',
        image: './assets/emojis/hush.png',
      },
      {
        name: 'Lover',
        image: './assets/emojis/in_love.png',
      },
      {
        name: 'Love',
        image: './assets/emojis/love.png',
      },
      {
        name: 'Kiss',
        image: './assets/emojis/kiss.png',
      },
      {
        name: 'Mute',
        image: './assets/emojis/mute.png',
      },
      {
        name: 'Laugh',
        image: './assets/emojis/laugh.png',
      },
      {
        name: 'Naughty',
        image: './assets/emojis/naughty.png',
      },
      {
        name: 'Partying',
        image: './assets/emojis/partying.png',
      },
      {
        name: 'Happy',
        image: './assets/emojis/happy.png',
      },
      {
        name: 'Sad',
        image: './assets/emojis/sad.png',
      },
      {
        name: 'Sick',
        image: './assets/emojis/sick.png',
      },
      {
        name: 'Singing',
        image: './assets/emojis/singing.png',
      },
      {
        name: 'Smile',
        image: './assets/emojis/smile.png',
      },
      {
        name: 'Sleep',
        image: './assets/emojis/sleep.png',
      },
      {
        name: 'Tongue',
        image: './assets/emojis/tongue.png',
      },
      {
        name: 'Wink',
        image: './assets/emojis/wink.png',
      },
      {
        name: 'Tear',
        image: './assets/emojis/tear.png',
      },
    ];
    this.shapes = [
      {
        name: 'circle',
        image: './assets/icons/circle.png',
      },
      {
        name: 'rectangle',
        image: './assets/icons/rectangle.png',
      },
      {
        name: 'square',
        image: './assets/icons/square.png',
      },
      {
        name: 'line',
        image: './assets/icons/line.png',
      },
      {
        name: 'arrow',
        image: './assets/icons/arrow.png',
      },
    ];
    this.isChatClosed = true;
  }

  public ngOnInit(): void {

    this.stage = new Konva.Stage({
      container: '#container',
      width: this.width,
      height: this.height,
      drawBorder: true
    });

    this.fitStageIntoParentContainer();
    // adapt the stage on any window resize
    window.addEventListener('resize', () => {
      this.fitStageIntoParentContainer();
    });
    this.stage.clearCache();
    this.layer = new Konva.Layer();
    this.layer.add(this.transformer);

    // check if there is a saved staged in localStorage, if yes, load it to the stage
    this.savedStage = localStorage.getItem('stage');
    // if (savedStage) {
    //   this.stage = Konva.Node.create(savedStage, '#container');
    //   this.layer?.draw();
    // }
    
    // setup menu
    this.menuNode = document.getElementById('menu');

    this.layer.on('contextmenu', (e) => {
      e.evt.preventDefault();
      e.evt.stopPropagation();
      e.target.draggable(false);
      this.currentShape = e.target.name();
      this.menuNode?.classList.remove('hidden');
      this.menuNode.style.top = e.evt.clientY + 'px';
      this.menuNode.style.left = e.evt.clientX + 'px';
    });

    this.layer.on('click', (e) => {
      e.evt.preventDefault();
      this.currentShape = e.target;

      if (!this.currentShape?.attrs.isSelected) {
        return;
      }

      if (this.currentShape.attrs.isSelected) {
        this.currentShape.getLayer()?.batchDraw();
        // This is a subscription to the color$ subject. It is used to update the color of the shapes.
        this.color$.subscribe((color) => {
          const shape = this.currentShape.attrs;
          shape.fill = color;
          shape.isSelected = false;
          shape.id = 'selected';
          shape.stroke = 10;
        });
      }
      // Show the transformer around the selected shape
      this.color = '#ffffff';
    });

    // connecting to socket.io for pen
    this.io.on('draw', (draw) => {
      const newLine = new Konva.Line({
        stroke: '#000000',
        strokeWidth: 5,
        globalCompositeOperation: 'source-over',
        lineCap: 'round',
        lineJoin: 'round',
        points: draw.points,
      });
      this.layer.add(newLine);
      this.stage.add(this.layer);
      this.layer.draw();
    });

    this.io.on('erase', (erase) => {
      const newLine = new Konva.Line({
        stroke: '#ffffff',
        strokeWidth: 10,
        globalCompositeOperation: 'destination-out',
        lineCap: 'round',
        lineJoin: 'round',
        points: erase.points,
      });
      this.layer.add(newLine);
      this.stage.add(this.layer);
      this.layer.draw();
    });
  }

  public findShapeById(shapeId: string): any {
    const shapes = this.layer.find('.' + shapeId);
    const shape = shapes.find((shape) => shape.attrs.name === shapeId);
    return shape || null;
  }

  public ngAfterViewInit(): void {
    const shapes: Record<
      string,
      | Konva.Circle
      | Konva.Rect
      | Konva.Line
      | Konva.Arrow
      | Konva.Text
      | Konva.Image
    > = {};
    const shapeItems: Record<string, any> = {
      Circle: Konva.Circle,
      Rect: Konva.Rect,
      Line: Konva.Line,
      Arrow: Konva.Arrow,
      Text: Konva.Text,
    };

    const createShapes = async (shapeData: any, shapeType: string) => {
      const shapeItem = await shapeItems[shapeType];
      // return if the shapeItem isn't defined
      if (!shapeItem) {
        return;
      }
      const shape = new shapeItem(shapeData);
      shapes[shapeData.name] = shape;

      shape.on('mouseover', () => {
        this.transformer.nodes([shape]);
      });

      // check if the shapeType is Text then add dblclick / dbltab event
      if (shapeType === 'Text') {
        const io = this.io;
        const transformer = this.transformer;
        shape.on('dblclick dbltap', () => {
          shape.hide();
          this.transformer.hide();
          const textPosition = shape.getAbsolutePosition();

          const stageBox = this.stage.container().getBoundingClientRect();
          const areaPosition = {
            x: stageBox.left + textPosition.x,
            y: stageBox.top + textPosition.y,
          };
          const textarea = document.createElement('textarea');
          document.body.appendChild(textarea);
          textarea.value = shape.text();
          textarea.style.position = 'absolute';
          textarea.style.top = areaPosition.y + 'px';
          textarea.style.left = areaPosition.x + 'px';
          textarea.style.width = shape.width() - shape.padding() * 2 + 'px';
          textarea.style.height = shape.height() - shape.padding() * 2 + 5 + 'px';
          textarea.style.fontSize = shape.fontSize() + 'px';
          textarea.style.border = 'none';
          textarea.style.padding = '0px';
          textarea.style.margin = '0px';
          textarea.style.overflow = 'hidden';
          textarea.style.background = 'none';
          textarea.style.outline = 'none';
          textarea.style.resize = 'none';
          //textarea.style.lineHeight = shape.lineHeight();
          textarea.style.fontFamily = shape.fontFamily();
          textarea.style.transformOrigin = 'left top';
          textarea.style.textAlign = shape.align();
          textarea.style.color = shape.fill();
          const rotation = shape.rotation();
          let transform = '';
          if (rotation) {
            transform += 'rotateZ(' + rotation + 'deg)';
          }
          textarea.style.transform = transform;
          textarea.style.height = 'auto';
          textarea.focus();
          // emit textarea value to the server as user is typing
          textarea.addEventListener('keyup', () => {
            io.emit('updateText', {
              text: textarea.value,
              name: shape.attrs.name,
            });
          });

          textarea.addEventListener('keydown', (e) => {
            // hide on enter key
            if (e.key === 'Enter') {
              shape.show();
              shape.text(textarea.value);
              io.emit('textUpdate', {
                text: textarea.value,
                name: shape.attrs.name,
              });
              transformer.show();
              document.body.removeChild(textarea);
            }
          });

          // Emit the text update to the server

          textarea.addEventListener('input', function () {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
          });

          textarea.addEventListener('mouseleave', () => { });
        });
      }

      // click on to remove transform and 
      this.stage.on('click', (e) => {     
        this.isImageDisplay = false;
        this.isShapeDisplay = false;
          const clickPos = {
            x: e.evt.clientX,
            y: e.evt.clientY
          };
      
          if (!shape?.intersects(clickPos)) {
            this.transformer.nodes([]);
            this.menuNode?.classList.add('hidden');
            return;
          }
          if(shape.intersects(clickPos)) {
            e.evt.preventDefault();
          }
      });

      shape.on('dragmove transform', () => {
        const updateData: any = {
          name: shape.attrs.name,
          x: shape.attrs.x,
          y: shape.attrs.y,
          fill: shape.attrs.fill,
          scaleX: shape.attrs.scaleX,
          scaleY: shape.attrs.scaleY,
          rotation: shape.attrs.rotation,
        };
        // Emit the update event based on the shape type
        this.io.emit(`update${shapeType}`, updateData);
      });

      // 
      this.layer.add(shape);
      this.stage.add(this.layer);
      this.layer.draw();
    };

    
    // Listen for text updates from the server
    this.io.on('textUpdate', (data) => {
      const text = shapes[data.name];
      if (text) {
        text.setAttrs({
          text: data.text,
        });
      }
    });

    this.io.on('updateText', (data) => {
      const text = shapes[data.name];
      if (text) {
        text.setAttrs({
          text: data.text,
        });
      }
    });

    const registerShapeListener = (eventType: string, shapeType: string) => {
      this.io.on(eventType, (shapeData: any) => {
        createShapes(shapeData, shapeType);
      });
    };

    // Register shape listeners for each shape type
    registerShapeListener('createCircle', 'Circle');
    registerShapeListener('createRect', 'Rect');
    registerShapeListener('createSquare', 'Rect');
    registerShapeListener('createLine', 'Line');
    registerShapeListener('createArrow', 'Arrow');
    registerShapeListener('createText', 'Text');

    const updateShape = (shapeType: string) => {
      this.io.on(`update${shapeType}`, (shapeData: any) => {
        const shape = shapes[shapeData.name];
        if (shape) {
          // Update the shape attributes
          Object.keys(shapeData).forEach((key) => {
            shape.setAttr(key, shapeData[key]);
          });
          this.layer.draw();
        }
      });
    };
    // Register update listeners for each shape type
    updateShape('Circle');
    updateShape('Rect');
    updateShape('Line');
    updateShape('Arrow');
    updateShape('Text');

    // Listen for the 'bringToFront' event from the server
    this.io.on('bringToFront', (data) => {
      const shape = shapes[data.currentShape];
      shape.moveToTop();
      shape.draggable(true);
      this.menuNode?.classList.add('hidden');
    });

    // Listen for the 'sendToBack' event from the server
    this.io.on('sendToBack', (data) => {
      const shape = shapes[data.currentShape];
      shape.moveToBottom();
      shape.draggable(true);
      this.menuNode?.classList.add('hidden');
    });

    // Listen for the deleteShape event from the server
    this.io.on('deleteShape', (data) => {
      const shape = shapes[data.currentShape];
      shape.destroy();
      this.transformer.nodes([]);
      this.layer.draw();
      this.menuNode?.classList.add('hidden');
    });

    // Receive existing shapes from the server
    this.io.on('existingShapes', (shapeList) => {
      shapeList.forEach((shapeData: any) => {
        const shapeType = shapeData.type;
        createShapes(shapeData, shapeType);
      });
    });

    // Listen for 'imageData' event and update Konva layer
    this.io.on('newImage', (imageData) => {
      const imageObj = new Image();

      imageObj.onload = () => {
        const imageNode = new Konva.Image({
          x: 240,
          y: 20,
          width: 120,
          height: 120,
          stroke: '#6e6e6e',
          strokeWidth: 1,
          image: imageObj,
          name: imageData.name,
        });

        imageNode.draggable(true);
        imageNode.on('mouseover', () => {
          this.transformer.nodes([imageNode]);
        });

        imageNode.on('dragmove transform', () => {
          const updateData: any = {
            name: imageNode.attrs.name,
            x: imageNode.attrs.x,
            y: imageNode.attrs.y,
            width: imageNode.attrs.width,
            height: imageNode.attrs.height,
            image: imageNode.attrs.image,
            scaleX: imageNode.attrs.scaleX,
            scaleY: imageNode.attrs.scaleY,
            rotation: imageNode.attrs.rotation,
          };
          // Emit the update event based on the shape type
          this.io.emit('updateImage', updateData);
        });

        this.layer.add(imageNode);
        this.stage.add(this.layer);
        this.layer.draw();
      };

      imageObj.src = imageData.dataUrl;
    });

    // Listen for 'updateImage' event and update Konva layer
    this.io.on('updateImage', (data) => {
      // Find the image node by its name or ID
      const imageNode = this.layer.findOne('.' + data.name);
      if (imageNode) {
        // Update the image node properties based on the received data
        imageNode.setAttrs({
          x: data.x,
          y: data.y,
          width: data.width,
          height: data.height,
          scaleX: data.scaleX,
          scaleY: data.scaleY,
          rotation: data.rotation,
        });

        this.layer.draw();
      }
    });
  }

  public createShape(shape: string): void {
    this.menuNode?.classList.add('hidden');
    switch (shape) {
      case 'circle':
        this.endPen();
        this.shapeService.createCircle(
          this.stage,
          this.layer,
          this.transformer,
          this.menuNode,
          this.color,
          this.io
        );
        break;
      case 'rectangle':
        this.endPen();
        this.shapeService.createRectangle(
          this.stage,
          this.layer,
          this.transformer,
          this.color,
          this.io
        );
        break;
      case 'square':
        this.endPen();
        this.shapeService.createSquare(
          this.stage,
          this.layer,
          this.transformer,
          this.color,
          this.io
        );
        break;
      case 'line':
        this.endPen();
        this.shapeService.createLine(
          this.stage,
          this.layer,
          this.transformer,
          this.color,
          this.io
        );
        break;
      case 'arrow':
        this.endPen();
        this.shapeService.createArrow(
          this.stage,
          this.layer,
          this.transformer,
          this.color,
          this.io
        );
        break;
      case 'text':
        this.endPen();
        this.shapeService.createText(
          this.stage,
          this.layer,
          this.transformer,
          this.io
        );
        break;
      case 'pen':
        this.shapeService.createPen(
          this.stage,
          this.layer,
          this.lastLine,
          this.mode,
          this.isPaint,
          this.io
        );
        break;
      case 'erase':
        this.shapeService.createErase(
          this.stage,
          this.layer,
          this.lastLine,
          this.mode,
          this.isPaint,
          this.io
        );
        break;
    }

    this.selectedTool = shape;
  }

  public endPen() {
    this.stage.off('mousedown');
    this.stage.off('mousemove');
    this.stage.off('mouseup');
  }

  // Images
  public createImage(index: number, image: any): void {
    if (!image) {
      return;
    }

    const imageObj = new Image();
    this.selectedImage = image[index];
    imageObj.onload = () => {
      const imageNode = new Konva.Image({
        x: 240,
        y: 20,
        width: 120,
        height: 120,
        stroke: '#6e6e6e',
        strokeWidth: 1,
        image: imageObj,
        name: this.selectedImage.name.replace(/\s/g, ''),
      });

      imageNode.draggable(true);
      imageNode.on('mouseover', () => {
        this.transformer.nodes([imageNode]);
      });

      this.io.emit('newImage', {
        dataUrl: imageNode.toDataURL(),
        name: imageNode.name(), // Include the imageNode name in the emit data
      });
    };

    imageObj.src = this.selectedImage.image;
  }

  public toggle(): void {
    this.isShapeDisplay = !this.isShapeDisplay;
    // if the isImageDisplay is true, set it to false
    this.isImageDisplay = false;
  }

  public toggleImage(): void {
    this.isImageDisplay = !this.isImageDisplay;
    this.isShapeDisplay = false;
  }

  public bringToFront(): void {
    const shape = this.findShapeById(this.currentShape);
    //this.layer.findOne('.' + this.currentShape);
    shape?.moveToTop();
    shape?.draggable(true);
    this.menuNode?.classList.add('hidden');
    // Emit the action to the server
    this.io.emit('bringToFront', { currentShape: this.currentShape });
  }

  public sendToBack(): void {
    const shape = this.findShapeById(this.currentShape);

    shape?.moveToBottom();
    shape?.draggable(true);
    this.menuNode?.classList.add('hidden');
    // Emit the action to the server
    this.io.emit('sendToBack', { currentShape: this.currentShape });
  }

  public deleteShape(): void {
    const shape = this.findShapeById(this.currentShape);
    // remove the transform after deleting 
    shape?.destroy();
    this.transformer.nodes([]);
    this.layer.draw();
    this.menuNode?.classList.add('hidden');
    this.io.emit('deleteShape', { currentShape: this.currentShape})
  }

  public refreshStage() {
    this.stage.destroyChildren()
  }

  public closeChat(): void { 
    this.isChatClosed = !this.isChatClosed;
  }

  public fitStageIntoParentContainer(): void {
    const container = document.querySelector('#stage-parent');
    const containerWidth = container ? container?.clientWidth : this.width;
    const scale = containerWidth / this.width;

    this.stage.width(this.width * scale);
    this.stage.height(this.height * scale);
    this.stage.scale({ x: scale, y: scale });
  }

  public saveToImage(): void {
    const dataUrl = this.stage.toDataURL({
      pixelRatio: 3 
    });

    const link = document.createElement('a');
    link.download = 'my-image.png';
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  }

  public saveToLocalStorage(): void {
    localStorage.setItem('stage', this.stage.toJSON());
  }

  public handleConfirm(confirmed: boolean): void {
    if (confirmed) {
      this.stage = Konva.Node.create(this.savedStage, '#container');
      this.layer?.draw();
    }
  }
}
