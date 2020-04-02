import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import { addUser } from '../../actions/users'
import PropTypes from 'prop-types'


export class Form extends Component {

  state = {
    id:null,
    name: '',
    email: '',
    password: '',
    image: ''
  }

  static propTypes = {
    addUser: PropTypes.func.isRequired
  }


  onChange = e => this.setState({[e.target.name]:e.target.value});
  onSubmit = e => {
    //e.preventDefault();
    const {name, email, image, password} = this.state;
    const user = {name, email, image, password} 
    this.props.addUser(user)
  }

  
  render() {
    const {name, email, image, password} = this.state;
    return (
      <Fragment>
        <h2>Add a user</h2>
        <form className="ui form" onSubmit={this.onSubmit}>
          <div className="field">
            <label>Name</label>
            <input type="text" name="name" placeholder="Name" value={name} onChange={this.onChange}/>
          </div>
          <div className="field">
            <label>image</label>
            <input type="text" name="image" placeholder="Image URL" value={image} onChange={this.onChange}/>
          </div>
          <div className="field">
            <label>Email</label>
            <input type="text" name="email" placeholder="Email" value={email} onChange={this.onChange}/>
          </div>
          <div className="field">
            <label>password</label>
            <input type="text" name="password" placeholder="password" value={password} onChange={this.onChange}/>
          </div>
          <button  className="ui button" type="submit">Submit</button>
        </form>
      </Fragment>
    )
  }
}

export default connect(null, {addUser})(Form)
