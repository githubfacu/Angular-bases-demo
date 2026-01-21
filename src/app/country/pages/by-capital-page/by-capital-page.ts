import { Component, computed, inject, linkedSignal, resource, signal } from '@angular/core';
import { CountrySearchInput } from "../../components/country-search-input/search-input";
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'by-capital-page',
  imports: [CountrySearchInput, CountryList],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {

  countryService = inject(CountryService)
  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)
  queryParam =this.activatedRoute.snapshot.queryParamMap.get('query') ?? ''

  query = linkedSignal(() => this.queryParam)

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
      this.router.navigate(['/country/by-capital'],{
        queryParams: {
          query: params.query,
        }
      })
      return this.countryService.searchByCapital(params.query)
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
