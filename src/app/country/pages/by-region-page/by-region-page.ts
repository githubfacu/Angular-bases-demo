import { Component, inject, signal } from '@angular/core';
import { CountryList } from "../../components/country-list/country-list";
import type { Region } from '../../interfaces/region.interface';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
  
@Component({
  selector: 'by-region-page',
  imports: [CountryList],
  templateUrl: './by-region-page.html',
})
export class ByRegionPage {

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  countryService = inject(CountryService)  

  selectedRegion = signal<Region | null>(null);

  countryResource = rxResource({
    params: () => ({ r: this.selectedRegion() }),
    stream: ({ params }) => {
      if(!params.r) return of([])
      return this.countryService.searchByRegion(params.r)
    }
  })

}
