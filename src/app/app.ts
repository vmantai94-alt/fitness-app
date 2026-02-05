import { Component, signal } from '@angular/core';
import { HeaderComponent } from './header-component/header-component';
import { AddMemberComponent } from './add-member-component/add-member-component';
import { TableComponent } from './table-component/table-component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, AddMemberComponent, TableComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('fitness-app');
}
