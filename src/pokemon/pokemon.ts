import fetch from 'node-fetch';
import pokeapi from './pokeapi.js';
export interface IPokemon {
  id: number;
  weight: number;
  height: number;
  moves: string[];
}

export interface IResponse {
  id: number;
  weight: number;
  height: number;
  moves: {
    move: {
      name: string;
    };
  };
}
export interface PokemonListItem {
  name: String;
  url: string;
}

export interface ResponsePokemonList {
  count: number;
  next: String;
  previous: String;
  results: PokemonListItem[]
}



export class Pokemon {
  url = 'https://pokeapi.co/api/v2/pokemon';

  /**
   * Gets the list of Pokemon info objects
   * @param names list of names
   */
  public async getPokemonsByNameList(names: string[]): Promise<IPokemon[]> {

    let finalList: IPokemon[] = [];
    for (let i = 0; i < names.length; i++) {
      if (this.checkNameValid) {
        let pokemonName = names[i]
        const res = await fetch(this.url+'/'+pokemonName);
        const pokemonInfo = await res.json();
        finalList[i] = {
          id: pokemonInfo.id,
          weight: pokemonInfo.weight,
          height: pokemonInfo.height,
          moves: pokemonInfo.moves,
        }
      } else {
        throw new Error('Name Invalid')
      }

    }



    return finalList;
  }

  /**
   * Gets a Pokemon info object
   * @param name
   */
  public async getPokemonByName(name: string): Promise<IResponse> {
    if (this.checkNameValid(name)) {
      const res = await fetch(`${this.url}/${name}`);
      const json: IResponse = await res.json();
      return json;
    } else {
      throw new Error('Name Invalid');
    }
  }

  /**
   * Checks the name parameter is valid
   * @param name string
   */
  checkNameValid(name: string) {
    
    
   
  
    return name.length > 0;
  }
}
