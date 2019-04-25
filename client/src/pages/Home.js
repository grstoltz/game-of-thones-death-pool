import React, { Component } from 'react';

import { Layout, Menu } from 'antd';

class Home extends Component {
  state = {
    board: ''
  };

  handleChange = event => {
    this.setState({ board: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    window.location = `/board/${this.state.board}`;
  };
  render() {
    return (
      <Layout className="layout">
        <Layout.Header>
          <h1 style={{ color: 'white' }}>Game of Thrones Death Pool</h1>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          />
        </Layout.Header>
        <Layout.Content style={{ padding: '0 50px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            Enter your death pool ID below:
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="board"
                value={this.state.board}
                onChange={this.handleChange}
              />
              <input type="submit" value="Submit" />
            </form>
          </div>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }} />
      </Layout>
    );
  }
}

export default Home;
