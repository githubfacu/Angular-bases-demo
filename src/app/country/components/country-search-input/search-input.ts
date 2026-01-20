import { Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.html',
})
export class CountrySearchInput {

  placeholder = input('Buscar')
  value = output<string>();

  search(value: string) {
    this.value.emit(value);
  }
}
