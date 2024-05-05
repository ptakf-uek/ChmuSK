import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-file-element',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule],
  templateUrl: './file-element.component.html',
  styleUrl: './file-element.component.scss',
})
export class FileElementComponent {
  changeName(): void {
    console.log('Name changed!');
  }

  deleteThing(): void {
    console.log('Thing deleted!');
  }
}
