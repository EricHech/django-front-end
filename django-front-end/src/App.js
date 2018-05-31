import React, { Component } from 'react';
import './App.css';

// Imports for GraphQL
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class App extends Component {
  render() {
    if (this.props.data && this.props.data.loading) {
      return <div>Loading</div>;
    }

    if (this.props.data && this.props.data.error) {
      console.log(this.props.data.error);
      return <div>Error</div>;
    }

    const notesToRender = this.props.data.notes;

    // REST
    // const test = fetch('http://127.0.0.1:8000/api/notes')
    //   .then(res => res.json())
    //   .then((res) => {
    //     console.log('res: ');
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    return (
      <div>
        {notesToRender.map((note, i) => {
          return (
            <div key={i}>
              <div>{note.title}</div>
              <div>{note.content}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

// JavaScript constant that stores the query
const FEED_QUERY = gql`
  query {
    notes {
      title
      content
    }
  }
`;

export default graphql(FEED_QUERY)(App);
