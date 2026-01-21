import { Component, input } from '@angular/core';
import type { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'country-list',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './country-list.html',
  styleUrls: ['./country-list.css'],
})
export class CountryList {
  
  countries = input.required<Country[]>()

  errorMessage = input<string | unknown | null>()
  isLoading = input<boolean>(false)
  notFoundMessage = input<string | null>()

}
