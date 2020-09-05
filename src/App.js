import React, { Component } from 'react'
import ListContacts from './ListContacts'
import * as ContactsApi from './utils/ContactsAPI'
import CreateContact from './CreateContact'
import { Route } from 'react-router-dom'

class App extends Component {

  state = {
    contacts: []
  }

  componentDidMount() {
    ContactsApi.getAll()
    .then((contacts) => {
      this.setState(() => ({
        contacts
      }))
    })
  }

  removeContact = (contact) => {
    this.setState((currentState) => ({
      contacts: currentState.contacts.filter((c) => {
        return c.id !== contact.id
      })
    }
    ))

    ContactsApi.remove(contact)
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <ListContacts 
            contacts={ this.state.contacts }
            onRemoveContact={ this.removeContact }
          />
        )} />

        <Route path='/create' component={CreateContact}/>  
      </div>  
    )
  }
}

export default App;
