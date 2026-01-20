import { Component, computed, inject, signal } from '@angular/core';
import { CountrySearchInput } from "../../components/country-search-input/search-input";
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'by-country-page',
  imports: [CountrySearchInput, CountryList],
  templateUrl: './by-country-page.html',
})
export class ByCountryPage {
  
  countryService = inject(CountryService)
  query = signal('')

  notFoundMessage = computed(() => {
    if (
      !this.countryResource.isLoading() &&
      !this.countryResource.error() &&
      this.query() &&
      (this.countryResource.value()?.length ?? 0) === 0
    ) {
      return 'No se obtuvieron resultados de búsqueda';
    }
    return null;
  });

  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if(!params.query) return of([])
      return this.countryService.searchByCountry(params.query)
    }
  })



  // countryResource = resource({
  //   params: () => ({ query: this.query() }),
  //   loader: async({ params }) => {
  //     if(!params.query) return []
  //     return await firstValueFrom(
  //       this.countryService.searchByCountry(params.query)
  //     )
  //   }
  // })
}
