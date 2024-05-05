import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-folder-element',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule],
  templateUrl: './folder-element.component.html',
  styleUrl: './folder-element.component.scss',
})
export class FolderElementComponent {
  changeName(): void {
    console.log('Name changed!');
  }

  deleteThing(): void {
    console.log('Thing deleted!');
  }
}
