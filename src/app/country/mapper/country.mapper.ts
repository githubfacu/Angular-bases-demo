import type { Country } from "../interfaces/country.interface";
import type { RESTCountry } from "../interfaces/rest-countries.interfaces";

export class CountryMapper{

    static mapRestCountryToCountry(item: RESTCountry): Country{
        return{
            cca2: item.cca2,
            flag: item.flag,
            flagPng: item.flags.png,
            flagAlt: item.flags.alt,
            name: item.translations['spa'].common ?? item.name.common,
            officialName: item.translations['spa'].official ?? item.name.official,
            capital: item.capital ? item.capital.join(',') : '',
            population: item.population,
            region: item.region,
            subRegion: item.subregion
        }
    }

    static mapRestCountryArrayToCountryArray(items: RESTCountry[]): Country[]{
        return items.map(this.mapRestCountryToCountry)
    }
}