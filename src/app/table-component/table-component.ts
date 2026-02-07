import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Data } from '../data';

@Component({
  selector: 'app-table-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-component.html',
  styleUrls: ['./table-component.css'],
})
export class TableComponent implements OnInit {
  // 1. Initialisiere das Signal mit einem leeren Array
  items = signal<any[]>([]);

  constructor(private dataService: Data) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.dataService.getItems().subscribe({
      next: (data) => {
        // 2. Setze den neuen Wert im Signal
        this.items.set(data);
        console.log('Daten im Signal gespeichert:', data);
      },
      error: (err) => console.error('Fehler beim Laden:', err),
    });
  }

  editUser(user: any): void {
    console.log('Bearbeiten-Modus für:', user);

    // Ein einfacher Prompt zum Testen, ob es geht:
    const newName = prompt('Vorname ändern:', user.first_name);

    if (newName !== null && newName !== user.first_name) {
      // Hier erstellen wir ein Objekt mit den neuen Daten
      const updatedUser = { ...user, first_name: newName };

      // Aufruf an den Data-Service (PUT Request)
      this.dataService.updateItem(user.id, updatedUser).subscribe({
        next: (res) => {
          // Das Signal aktualisieren, damit die Tabelle sofort den neuen Namen zeigt
          this.items.update((currentItems) =>
            currentItems.map((item) => (item.id === user.id ? res : item)),
          );
          console.log('Update erfolgreich!');
        },
        error: (err) => console.error('Fehler beim Update:', err),
      });
    }
  }

  deleteUser(id: number): void {
    if (confirm('Löschen?')) {
      this.dataService.deleteItem(id).subscribe(() => {
        // 3. Signal aktualisieren (Eintrag lokal entfernen)
        this.items.update((currentItems) => currentItems.filter((item) => item.id !== id));
      });
    }
  }
}
