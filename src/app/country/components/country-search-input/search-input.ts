import { Component, input, linkedSignal, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.html',
})
export class CountrySearchInput {

  placeholder = input('Buscar')
  initialValue = input<string>('')
  value = output<string>()

  inputValue = linkedSignal<string>(() => this.initialValue() ?? '')

  search(value: string) {
    this.value.emit(value)
  }
}
