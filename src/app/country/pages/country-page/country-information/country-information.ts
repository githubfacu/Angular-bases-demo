import { Component, computed, input } from '@angular/core';
import type { Country } from '../../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';

function isCountry(value: Country | never[]): value is Country {
  return !Array.isArray(value);
}

@Component({
  selector: 'country-information',
  imports: [DecimalPipe],
  templateUrl: './country-information.html',
})
export class CountryInformation {
  
  country = input.required<Country | never[]>()

  isCountry = computed(() => {
    return isCountry(this.country());
  });

  countryData = computed(() => {
    const value = this.country();
    return isCountry(value) ? value : null;
  });

  currentYear = computed(() => {
    return new Date().getFullYear();
  });
}
