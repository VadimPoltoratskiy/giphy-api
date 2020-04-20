import React, { Component } from 'react';
import './App.css';
import { CardList } from './components/card-list/card-list.component';


class App extends Component {
  constructor() {
    super()
    this.state = {
      monsters: [],
      searchField: '',
      searcArr: []
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ monsters: users }))

  }

  render() {
    return (
      <div className="App">
        <input type="search" placeholder="search monsters" onChange={event => {this.setState({ searchField: event.target.value }, () => {
          if (!this.state.searcArr.includes(this.state.searchField)) {
            this.state.searcArr.push(this.state.searchField)
          }
        })

      }} />
        <CardList monsters={this.state.monsters}>
        </CardList>
      </div>
    )
  }
}

// function App() {
//   return (
// <div className="App">
//   <header className="App-header">
//     <img src={logo} className="App-logo" alt="logo" />
//     <p>
//       Edit <code>src/App.js</code> and save to reload.
//     </p>
//     <a
//       className="App-link"
//       href="https://reactjs.org"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       Learn React
//     </a>
//   </header>
// </div>
//   );
// }

export default App;
