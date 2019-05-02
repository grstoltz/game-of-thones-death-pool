import React, { Component } from 'react';
import API from '../utils/API';

import { Table, Layout, Menu } from 'antd';

class Board extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    this.getPool();
  }

  getPool() {
    API.getPool(this.props.match.params.id)
      .then(res => {
        console.log(res);
        res.data.sort((a, b) => b.score - a.score);
        this.setState({ data: res.data });
      })
      .catch(err => console.log(err));
  }

  renderResults(data) {
    return data.map((element, index) => {
      const obj = {
        name: <a href={`/user/${element._id}`}>{element.ownerName}</a>,
        score: element.score
      };
      return obj;
    });
  }

  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
        // render: (name, row, index) => {
        //   return <a href={`/user/${name}`}>{name}</a>;
        // }
      },
      {
        title: 'Score',
        dataIndex: 'score',
        key: 'score'
      }
    ];

    console.log(this.renderResults(this.state.data));
    return (
      <Layout>
        <Layout.Header>
          <h1 style={{ color: 'white' }}>Game of Thrones Death Pool</h1>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          />
        </Layout.Header>
        <Layout.Content style={{ padding: '25px 50px' }}>
          <Table
            dataSource={this.renderResults(this.state.data)}
            columns={columns}
            pagination={{ pageSize: 50, hideOnSinglePage: true }}
          />
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }} />
      </Layout>
    );
  }
}

export default Board;
