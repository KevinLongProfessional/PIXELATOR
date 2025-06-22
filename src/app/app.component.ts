import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DynamicCanvasComponent } from './dynamic-canvas/dynamic-canvas.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DynamicCanvasComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})



export class AppComponent {
  title = 'Pixelator';
  pixelation: number = 100;

      onRangeChange(value: string): void {
        // Convert the string value to a number if needed
        this.pixelation = parseFloat(value);
      }

}
