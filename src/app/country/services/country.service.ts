import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mapper/country.mapper';
import type { Region } from '../interfaces/region.interface';

const API_URL = 'https://restcountries.com/v3.1'

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient)
  queryCacheCapital = new Map<string, Country[]>()
  queryCacheCountry = new Map<string, Country[]>()
  queryCacheRegion = new Map<string, Country[]>()

  searchByCapital(query: string): Observable<Country[]>{
    query = query.toLocaleLowerCase()
    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? [])
    }
    return this.http.get<RESTCountry[]>(`${ API_URL }/capital/${ query }`)
    .pipe(
      map(c => CountryMapper.mapRestCountryArrayToCountryArray(c)),
      tap(c => this.queryCacheCapital.set(query, c)),
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
      if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? [])
    }
    return this.http.get<RESTCountry[]>(`${ API_URL }/name/${ query }`)
    .pipe(
      map(countries => CountryMapper.mapRestCountryArrayToCountryArray(countries)),
      tap(c => this.queryCacheCountry.set(query, c)),
      catchError(error =>{
        if (error.status === 404) {
          return of([]);
        }
        console.log('fetching error', error);
        return throwError(() => new Error ('No se obtuvieron resultados de búsqueda'))
      })
    )
  }

  searchByRegion(region: Region): Observable<Country[]>{
    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region) ?? [])
    }
    return this.http.get<RESTCountry[]>(`${ API_URL }/region/${ region }`)
    .pipe(
      map(countries => CountryMapper.mapRestCountryArrayToCountryArray(countries)),
      tap(c => this.queryCacheRegion.set(region, c)),
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
