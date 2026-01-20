import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map, of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { NotFoundComponent } from "../../../shared/components/not-found/not-found";
import { CountryInformation } from './country-information/country-information';

@Component({
  selector: 'country-page',
  imports: [NotFoundComponent, CountryInformation],
  templateUrl: './country-page.html',
})
export class CountryPage {

  countryService = inject(CountryService)
  
  query = toSignal(inject(ActivatedRoute).params.pipe(
    map( params => params['query'])
  ));

  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if(!params.query) return of([])
      return this.countryService.searchCountryByAlphaCode(params.query)
    }
  })

  // countryCode = inject(ActivatedRoute).snapshot.params['query']
}
