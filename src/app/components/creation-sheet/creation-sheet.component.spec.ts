import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationSheetComponent } from './creation-sheet.component';

describe('CreationSheetComponent', () => {
  let component: CreationSheetComponent;
  let fixture: ComponentFixture<CreationSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreationSheetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreationSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
