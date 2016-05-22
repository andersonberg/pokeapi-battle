var Pokemon = React.createClass({
  render: function() {
    return (
      <div className="pokemon">
        <p>Name: <a href={this.props.url}>{this.props.name}</a></p>
      </div>
    );
  }
});

var PokemonBox = React.createClass({
  loadPokemonsFromServer: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadPokemonsFromServer();
  },
  render: function() {
    return (
      <div className="pokemonBox">
        <h1>Pokemons</h1>
        <PokemonList data={this.state.data} />
      </div>
    );
  }
});

var PokemonList = React.createClass({
  render: function(){
    if(this.props.data.results != undefined){
      var pokemonNodes = this.props.data.results.map(function(pokemon) {
        return (
          <Pokemon name={pokemon.name} url={pokemon.url} key={pokemon.name}>
          </Pokemon>
        );
      });
    }
    return (
      <div className="pokemonList">
        {pokemonNodes}
      </div>
    );
  }
});

ReactDOM.render(
  <PokemonBox url="http://pokeapi.co/api/v2/pokemon/" />,
  document.getElementById('content')
);