import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {getUsers, deleteUser} from '../../actions/users'

export class User extends Component {
  static propTypes = {
    users: PropTypes.array.isRequired,
    getUsers: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired
  }
  componentDidMount(){
    this.props.getUsers()
  }

  render() {
    return (
      <Fragment>
        <h2>Users</h2>
        <table className="ui celled table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Image</th>
              <th>email</th>
              <th>password</th>
              <th>createdAt</th>
              <th />
            </tr>
          </thead>
          <tbody>
            { this.props.users.map(user => (
              <tr key={user.id}>
                <th className="ui centered" data-label="ID">{user.id}</th>
                <th className="ui centered" data-label="Name">{user.name}</th>
                <th className="ui centered" data-label="Image"><img src={user.image} className="ui centered mini image"/></th>
                <th className="ui centered" data-label="email">{user.email}</th>
                <th className="ui centered" data-label="password">{user.password}</th>
                <th className="ui centered"><button onClick={this.props.deleteUser.bind(this, user.id)} className="ui youtube button">Delete</button></th>
              </tr>
            )) }
          </tbody>
        </table>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users.users
})
export default connect(mapStateToProps, {getUsers, deleteUser})(User)
