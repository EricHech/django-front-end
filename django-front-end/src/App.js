import React, { Component } from 'react';
import './App.css';

// Imports for GraphQL
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import axios from 'axios';

const API_ROOT = 'http://127.0.0.1:3490';
const AUTH_ENDPOINT = '/api-token-auth/';
const NOTE_ENDPOINT = '/api/notes/';

class App extends Component {
  state = {
    notes: [],
  };

  componentDidMount() {
    axios
      .post(`${API_ROOT}${AUTH_ENDPOINT}`, {
        username: 'admin',
        password: 'iamblichus',
      })
      .then((res) => {
        const token = res.data.token;
        axios
          .get(`${API_ROOT}${NOTE_ENDPOINT}`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          })
          .then((res) => {
            this.setState({ notes: res.data });
          })
          .catch((err) => {
            console.log('AXIOS.GET error: ', err);
          });
      })
      .catch((err) => console.log('AXIOS.POST error: ', err));
  }

  render() {
    //   if (this.props.data && this.props.data.loading) {
    //     return <div>Loading</div>;
    //   }

    //   if (this.props.data && this.props.data.error) {
    //     console.log(this.props.data.error);
    //     return <div>Error</div>;
    //   }

    //   const notesToRender = this.props.data.notes;

    //
    //
    // REST
    const notesToRender = this.state.notes;

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
