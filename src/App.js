import { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      search: "",
    };
  }

  componentDidMount() {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
      .then((result) => result.json())
      .then((json) => {
        this.setState({ pokemons: json.results });
      });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  filterPokemons = () => {
    const search = this.state.search.toLowerCase();
    return this.state.pokemons.filter((pokemon) =>
      pokemon.name.startsWith(search)
    );
  };

  render() {
    const data = this.filterPokemons();
    return (
      <div>
        <NavBar onChange={this.handleChange} value={this.state.search} />
        <Pokemons data={data} />
      </div>
    );
  }
}

function NavBar({ onChange, value }) {
  return (
    <div id="nav" className="bg-blue-500 p-5 flex justify-between">
      <h1 className="text-white font-bold text-xl">Pokédex</h1>
      <form>
        <input
          name="search"
          value={value}
          onChange={onChange}
          type="text"
          placeholder="Ejemplo: Pikachu"
          className="p-1"
        />
        <button className="bg-blue-500 text-white py-1 px-3 font-semibold">
          Buscar
        </button>
      </form>
    </div>
  );
}

function Pokemons({ data }) {
  return (
    <div className="flex flex-wrap my-4">
      {data.map((pokemon) => (
        <Pokemon key={pokemon.url} {...pokemon} />
      ))}
    </div>
  );
}

class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: {
        sprites: {},
        types: [],
      },
    };
  }

  componentDidMount() {
    fetch(this.props.url)
      .then((result) => result.json())
      .then((json) => {
        this.setState({ pokemon: json });
      });
  }

  render() {
    const { pokemon } = this.state;

    return (
      <div className="w-1/2 md:w-1/5 lg:3/12 xl:w-2/12 p-3">
        <div className="bg-gray-200 h-64 rounded">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="block mx-auto py-5 w-32"
          />
          <h2 className="text-center capitalize">{pokemon.name}</h2>
          <div className="flex justify-center mt-1">
            {pokemon.types.map((type) => {
              return (
                <span className={`bg-yellow-500 rounded p-1 text-white mx-1`}>
                  {type.type.name}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
