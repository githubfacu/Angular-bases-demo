import { Component, computed, inject, resource, signal } from '@angular/core';
import { CountrySearchInput } from "../../components/country-search-input/search-input";
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'by-capital-page',
  imports: [CountrySearchInput, CountryList],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {

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

  countryResource = resource({
    params: () => ({ query: this.query() }),
    loader: async({ params }) => {
      if(!params.query) return []
      return await firstValueFrom(
        this.countryService.searchByCapital(params.query)
      )
    }
  })


  // isLoading = signal(false)
  // isError = signal<string | null>(null)
  // countries = signal<Country[]>([])

  // onSearch(query: string){
  //   if (!query) return
  //   if (this.isLoading()) return

  //   this.isLoading.set(true)
  //   this.isError.set(null)

  //   this.countryService.searchByCapital(query)
  //     .subscribe({
  //       next: (countries) => {
  //         this.isLoading.set(false)
  //         this.countries.set(countries)          
  //       },
  //       error: (err) => {
  //         this.isLoading.set(false)
  //         this.countries.set([])
  //         this.isError.set(err)     
  //       }
  //     })
  // }
}
