import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mapper/country.mapper';

const API_URL = 'https://restcountries.com/v3.1'

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient)

  searchByCapital(query: string): Observable<Country[]>{
    query = query.toLocaleLowerCase()
    return this.http.get<RESTCountry[]>(`${ API_URL }/capital/${ query }`)
    .pipe(
      map(countries => CountryMapper.mapRestCountryArrayToCountryArray(countries)),
      catchError(error =>{
        if (error.status === 404) {
          return of([]);
        }
        console.log('fetching error', error);
        return throwError(() => new Error ('No se obtuvieron resultados de búsqueda'))
      })
    )
  }

  searchByCountry(query: string): Observable<Country[]>{
    query = query.toLocaleLowerCase()
    return this.http.get<RESTCountry[]>(`${ API_URL }/name/${ query }`)
    .pipe(
      map(countries => CountryMapper.mapRestCountryArrayToCountryArray(countries)),
      catchError(error =>{
        if (error.status === 404) {
          return of([]);
        }
        console.log('fetching error', error);
        return throwError(() => new Error ('No se obtuvieron resultados de búsqueda'))
      })
    )
  }

  searchCountryByAlphaCode(code: string){
    return this.http.get<RESTCountry[]>(`${ API_URL }/alpha/${ code }`)
    .pipe(
      map(countries => CountryMapper.mapRestCountryArrayToCountryArray(countries)),
      map(c => c.at(0)),
      catchError(error =>{
        if (error.status === 404) {
          return of([]);
        }
        console.log('fetching error', error);
        return throwError(() => new Error ('No se obtuvieron resultados de búsqueda'))
      })
    )
  }
}
