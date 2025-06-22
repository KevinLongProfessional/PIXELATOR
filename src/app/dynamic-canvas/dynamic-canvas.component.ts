import { Component, ElementRef, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'dynamic-canvas',
  standalone: true,
  imports: [],
  templateUrl: './dynamic-canvas.component.html',
  styleUrl: './dynamic-canvas.component.css'
})
export class DynamicCanvasComponent implements OnChanges {
  image: HTMLImageElement | undefined;
  resizedImage: HTMLImageElement | undefined;
  @Input() pixelation: number = 100;

  @ViewChild('dynamicCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

   ngOnInit() {
      this.image = undefined;     // May it a plain boolean or an Observable that you need to subscribe
      this.SetCanvasSize();
   }

  ngOnChanges(changes: SimpleChanges) {
    this.SetCanvasSize();
    this.Draw();
  }

  onResize(event: Event){
    this.SetCanvasSize();
  }

    onPaste(event: ClipboardEvent) {
    let clipboardData = event.clipboardData;
    if(clipboardData != null){
      const items = clipboardData.items;

      for(let i = 0; i < items.length; i++)
      {
        if(items[i].type.indexOf('image') !== -1)
        {
          const file = items[i].getAsFile();
          if (file) {
            const reader = new FileReader();

            reader.onload = (e: ProgressEvent<FileReader>) => {
              if (e.target && e.target.result) {
                // Sanitize the URL before binding it to an image source
                //this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(e.target.result as string);
              }
            };

            reader.readAsDataURL(file); // Read the image as a base64 data URL

            reader.onloadend = (e) => {
              if(e.target != null){
                let img = new Image();
                //img.onload = imageLoaded;
                img.src = (String)(e.target.result);
                
                this.image = img;
                this.SetCanvasSize();
                this.Draw();
              }
            }
          }
          break; //break out of for loop. The job is done.
        }
      }
    }
  }

    Draw() {
            const canvas = this.canvasRef.nativeElement;

            let context = canvas.getContext('2d')
            if(context != null && this.image != null){
            //context.clearRect(0, 0, props.image.width, props.image.height);
            //context.fillRect(0, 0, canvas.width, canvas.height);

            let sx, sy, sw, sh, dx, dy, dw, dh;
            sx = 0;
            sy = 0;
            sw = this.image.width;
            sh = this.image.height;

            let canvasWidth = this.canvasRef.nativeElement.width;
            let canvasHeight = this.canvasRef.nativeElement.height;

            let sourceAspectRatio = sw / sh; 
            let destinationAspectRatio = canvasWidth / canvasHeight;
            let scale = Math.min(canvasWidth / sw, canvasHeight / sh);

            dw = sw * scale;
            dh = sh * scale;

            dx = (canvasWidth - dw) / 2
            dy = (canvasHeight- dh) / 2

          if(this.image != null){
            context.drawImage(this.image,
                sx, sy,
                sw, sh,
                dx, dy,
                dw, dh);
            }
          }
      }

  SetCanvasSize() {
    try {
        //to do: get rid of these document.getElementsByClassName calls. Use state management to do better.
        const height = window.innerHeight / 2; //to do: replace magic number.
        const width = window.innerWidth / 2;

        var canvas = this.canvasRef.nativeElement;

        let context = canvas.getContext('2d');
        if(context != null){

          context.imageSmoothingEnabled = true;

          var style = canvas.style;
          canvas.width = width * this.pixelation / 100.0;
          canvas.height = height * this.pixelation / 100.0;
        }
    }
    catch {
        console.log("error setting canvas size.")
    }

}


}
