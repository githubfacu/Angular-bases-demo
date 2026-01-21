import { Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryList } from "../../components/country-list/country-list";
import type { Region } from '../../interfaces/region.interface';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
  
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

  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? ''
  isRegionType(){
    return this.regions.includes(this.queryParam as Region)
  }

  selectedRegion = linkedSignal<Region | null>(() => {
    if (this.isRegionType()) {
      return this.queryParam as Region
    }
    return null
  })

  countryResource = rxResource({
    params: () => ({ r: this.selectedRegion() }),
    stream: ({ params }) => {
      if(!params.r) return of([])
      this.router.navigate(['/country/by-region'],{
        queryParams: {
          query: params.r,
        }
      })
      return this.countryService.searchByRegion(params.r)
    }
  })

}
