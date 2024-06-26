import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileElementComponent } from './file-element.component';

describe('FileElementComponent', () => {
  let component: FileElementComponent;
  let fixture: ComponentFixture<FileElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileElementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FileElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
