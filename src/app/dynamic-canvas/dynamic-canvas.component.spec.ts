import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicCanvasComponent } from './dynamic-canvas.component';

describe('DynamicCanvasComponent', () => {
  let component: DynamicCanvasComponent;
  let fixture: ComponentFixture<DynamicCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicCanvasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DynamicCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
