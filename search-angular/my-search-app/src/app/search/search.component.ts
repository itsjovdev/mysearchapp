import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';

interface SearchResult {
  id?: number;
  icon: string;
  title: string;
  link: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTerm: string = '';
  selectedResult: SearchResult | null = null;
  results: SearchResult[] = [];
  filteredResults: SearchResult[] = [];

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.loadEntries();
  }

  loadEntries(): void {
    this.searchService.getEntries().subscribe(entries => {
      this.results = entries;
    });
  }

  filterResults(): void {
    if (this.searchTerm.trim() === '') {
      // Si el término de búsqueda está vacío, no mostrar resultados
      this.filteredResults = [];
    } else {
      // Filtrar los resultados basados en el término de búsqueda
      this.filteredResults = this.results.filter(result =>
        result.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  selectResult(result: SearchResult): void {
    this.selectedResult = result;
    // Aquí puedes añadir lógica para manejar la selección
  }
}
