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
  items = signal<any[]>([]);

  // Für das Formular
  isEditing = signal<boolean>(false);
  editingId = signal<number | null>(null);
  formData = signal<any>({
    first_name: '',
    last_name: '',
    email: '',
    // ... weitere Felder aus deinem Django Model
  });

  constructor(private dataService: Data) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.dataService.getItems().subscribe({
      next: (data) => {
        this.items.set(data);
        console.log('Daten im Signal gespeichert:', data);
      },
      error: (err) => console.error('Fehler beim Laden:', err),
    });
  }

  // NEU: Hinzufügen
  addUser(): void {
    this.dataService.addItem(this.formData()).subscribe({
      next: (newUser) => {
        // Signal aktualisieren: neuen User hinzufügen
        this.items.update((currentItems) => [...currentItems, newUser]);
        this.resetForm();
        console.log('User erfolgreich hinzugefügt!');
      },
      error: (err) => console.error('Fehler beim Hinzufügen:', err),
    });
  }

  // Verbesserte Edit-Funktion
  startEdit(user: any): void {
    this.isEditing.set(true);
    this.editingId.set(user.id);
    this.formData.set({ ...user }); // Kopiere die Daten ins Formular
  }

  updateUser(): void {
    const id = this.editingId();
    if (id !== null) {
      this.dataService.updateItem(id, this.formData()).subscribe({
        next: (updatedUser) => {
          this.items.update((currentItems) =>
            currentItems.map((item) => (item.id === id ? updatedUser : item)),
          );
          this.resetForm();
          console.log('Update erfolgreich!');
        },
        error: (err) => console.error('Fehler beim Update:', err),
      });
    }
  }

  deleteUser(id: number): void {
    if (confirm('Möchtest du diesen User wirklich löschen?')) {
      this.dataService.deleteItem(id).subscribe({
        next: () => {
          this.items.update((currentItems) => currentItems.filter((item) => item.id !== id));
          console.log('User erfolgreich gelöscht!');
        },
        error: (err) => console.error('Fehler beim Löschen:', err),
      });
    }
  }

  // Helper-Methoden
  onSubmit(): void {
    if (this.isEditing()) {
      this.updateUser();
    } else {
      this.addUser();
    }
  }

  resetForm(): void {
    this.isEditing.set(false);
    this.editingId.set(null);
    this.formData.set({
      first_name: '',
      last_name: '',
      email: '',
    });
  }

  updateFormField(field: string, value: any): void {
    this.formData.update((current) => ({ ...current, [field]: value }));
  }
}
