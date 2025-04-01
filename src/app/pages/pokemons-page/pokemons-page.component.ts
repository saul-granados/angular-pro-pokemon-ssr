import {ApplicationRef, Component, effect, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {PokemonListComponent} from '../../pokemons/components/pokemon-list/pokemon-list.component';
import {PokemonListSkeletonComponent} from './ui/pokemon-list-skeleton/pokemon-list-skeleton.component';
import {PokemonService} from '../../pokemons/services/pokemon.service';
import {SimplePokemon} from '../../pokemons/interfaces/simple-pokemon.interface';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import {map, tap} from 'rxjs';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [PokemonListComponent, PokemonListSkeletonComponent, RouterLink],
  templateUrl: './pokemons-page.component.html',
  styleUrl: './pokemons-page.component.css'
})
export default class PokemonsPageComponent {

  private pokemonService = inject(PokemonService);
  public pokemons = signal<SimplePokemon[]>([]);


  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map( params => params['page'] ?? '1' ),
      map( page => ( isNaN(+page) ? 1 : +page )),
      map( page => Math.max(1, page))
    )
  );

  public loadOnPageChanged = effect(() => {
    this.loadPokemons(this.currentPage());
  },{
    allowSignalWrites: true
  });


  // public isLoading = signal(true);
  //
  // private appRef = inject(ApplicationRef);
  // private $appState = this.appRef.isStable.subscribe(isStable => {
  //   console.log(isStable);
  // });

  // ngOnInit(): void {
  //
  //   this.route.queryParamMap.subscribe()
  //
  //   this.loadPokemons();
  //   // setTimeout(() => {
  //   //   this.isLoading.set(false);
  //   // },5000);
  // }

  // ngOnDestroy(): void {
  //   this.$appState.unsubscribe();
  // }


  loadPokemons( page = 0) {

    const pageToLoad = this.currentPage()! + page;

     this.pokemonService.loadPage( pageToLoad )
       .pipe(
         //tap(() => this.router.navigate([],{ queryParams: { page: pageToLoad } })),
         tap(() => this.title.setTitle(`Pokemons SSR - Page ${pageToLoad}`))

       )
       .subscribe({
       next: (pokemons) => {
         this.pokemons.set(pokemons);
       }
     })
  }


}
