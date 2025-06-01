import { Component } from '@angular/core';
import { SearchService } from '../search/search.service';

interface SearchResult {
  id?: number;
  icon: string;
  title: string;
  link: string;
}

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent {
  newEntry: SearchResult = { icon: '', title: '', link: '' };
  icons = [
    { class: 'fa-laptop', name: 'Computadora o Laptop' },
    { class: 'fa-code', name: 'Código' },
    { class: 'fa-lock', name: 'Candado (Seguridad)' },
    { class: 'fa-brain', name: 'Cerebro' },
    { class: 'fa-desktop', name: 'Monitor con Código' },
    { class: 'fa-mobile-alt', name: 'Teléfono Inteligente' },
    { class: 'fa-gamepad', name: 'Control de Videojuego' },
    { class: 'fa-home', name: 'Casa Conectada' },
    { class: 'fa-vr-cardboard', name: 'Gafas VR' },
    { class: 'fa-headphones', name: 'Audífonos' },
    { class: 'fa-chart-line', name: 'Gráfico de Crecimiento' },
    { class: 'fa-cogs', name: 'Engranajes o Rueda Dentada' },
    { class: 'fa-shield-alt', name: 'Escudo' },
    { class: 'fa-cloud-upload-alt', name: 'Nube con Flecha de Descarga/Subida' },
    { class: 'fa-coins', name: 'Moneda Digital' },
    { class: 'fa-seedling', name: 'Planta Creciendo de un Dispositivo' },
  ];
  selectedIcon: { class: string, name: string } | null = null;
  dropdownOpen: boolean = false;
  results: SearchResult[] = [];
  errorMessage: string = '';

  constructor(private searchService: SearchService) {
    this.loadEntries();
  }

  loadEntries(): void {
    this.searchService.getEntries().subscribe(entries => {
      this.results = entries;
    });
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectIcon(icon: { class: string, name: string }): void {
    this.selectedIcon = icon;
    this.newEntry.icon = icon.class;
    this.dropdownOpen = false;
  }

  restrictTextLength(event: any): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.replace(/[^a-zA-Z\s]/g, '');
  }

  addEntry(): void {
    const urlPattern = /^https?:\/\/.+/;
    const duplicate = this.results.some(result =>
      (result.title.toLowerCase() === this.newEntry.title.toLowerCase()) ||
      (result.link.toLowerCase() === this.newEntry.link.toLowerCase()) ||
      (result.icon === this.newEntry.icon)
    );

    if (duplicate) {
      this.errorMessage = 'Ya tienes registrado con el mismo enlace, nombre o icono';
      return;
    }

    if (
      this.newEntry.title.length <= 50 &&
      this.newEntry.icon &&
      this.newEntry.link &&
      urlPattern.test(this.newEntry.link)
    ) {
      this.searchService.addEntry(this.newEntry).subscribe(entry => {
        this.loadEntries(); // Recargar entradas después de agregar una nueva
        this.newEntry = { icon: '', title: '', link: '' }; // Resetear el formulario
        this.selectedIcon = null; // Resetear ícono seleccionado
        this.errorMessage = ''; // Limpiar mensaje de error
        alert('Entrada guardada exitosamente!');
      });
    } else {
      this.errorMessage = 'Por favor completa todos los campos correctamente.';
    }
  }
}
