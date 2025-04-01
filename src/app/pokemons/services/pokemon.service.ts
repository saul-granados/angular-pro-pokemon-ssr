import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, tap} from 'rxjs';
import {SimplePokemon} from '../interfaces/simple-pokemon.interface';
import {PokeApiResponse} from '../interfaces/pokemon-api.response';
import {Pokemon} from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private http = inject(HttpClient);

  public loadPage( page: number ): Observable<SimplePokemon[]> {

    if( page != 0 ) {
      --page;
    }

    page = Math.max(0, page);

    return this.http.get<PokeApiResponse>(`https://pokeapi.co/api/v2/pokemon?offset=${page * 20}&limit=20`).pipe(
      map( resp => {
        const simplePokemon: SimplePokemon[] = resp.results.map( pokemon => ({
          id: pokemon.url.split('/').at(-2) ?? '',
          name: pokemon.name
        }) )
        return simplePokemon;
      })
    );

  }

  public loadPokemon( id: string ): Observable<Pokemon> {
    return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }


}
