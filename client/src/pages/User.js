import React, { Component } from 'react';
import API from '../utils/API';

import { Layout, Menu, Table } from 'antd';

class Board extends Component {
  state = {
    data: [
      {
        _id: 0,
        poolId: 0,
        ownerName: '',
        score: 0,
        questionOneResponse: null,
        questionTwoResponse: null,
        questionThreeResponse: null,
        predictions: []
      }
    ]
  };

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    API.getUser(this.props.match.params.id)
      .then(res => {
        console.log(res);
        this.setState({ data: res.data });
      })
      .catch(err => console.log(err));
  }

  createResults(
    livesPrediction,
    wightWalkerPrediction,
    livesResult,
    wightWalkerResult
  ) {
    let resultsArr = [];
    if (livesResult === null) {
      resultsArr.push(<span>Unknown</span>);
      return resultsArr;
    }

    if (livesPrediction === livesResult) {
      if (livesResult === true) {
        resultsArr.push(<span style={{ color: 'green' }}>Lives</span>);
      } else {
        resultsArr.push(<span style={{ color: 'green' }}>Dies</span>);
      }
      //Checks for Wight Walker prediction
      if (wightWalkerPrediction !== null) {
        if (wightWalkerPrediction === wightWalkerResult) {
          resultsArr.push(
            <span>
              <span>,</span>
              <span style={{ color: 'green' }}> Becomes a Wight</span>
            </span>
          );
        }
        if (
          wightWalkerPrediction !== wightWalkerResult &&
          wightWalkerResult === true
        ) {
          resultsArr.push(
            <span>
              <span>,</span>
              <span style={{ color: 'red' }}> Becomes a Wight</span>
            </span>
          );
        }
      } else if (wightWalkerPrediction === null) {
        if (wightWalkerResult === true) {
          resultsArr.push(
            <span>
              <span>,</span>
              <span style={{ color: 'black' }}> Becomes a Wight</span>
            </span>
          );
        }
      }

      return resultsArr;
    }

    if (livesPrediction !== livesResult) {
      if (livesResult === true) {
        resultsArr.push(<span style={{ color: 'red' }}>Lives</span>);
      } else {
        resultsArr.push(<span style={{ color: 'red' }}>Dies</span>);
      }
      //Checks for Wight Walker prediction
      if (wightWalkerPrediction !== null) {
        if (wightWalkerPrediction === wightWalkerResult) {
          resultsArr.push(
            <span>
              <span>,</span>
              <span style={{ color: 'green' }}> Becomes a Wight</span>
            </span>
          );
        } else {
          resultsArr.push(
            <span>
              <span>,</span>
              <span style={{ color: 'red' }}> Becomes a Wight</span>
            </span>
          );
        }
      } else if (wightWalkerPrediction === null) {
        if (wightWalkerResult === true) {
          resultsArr.push(
            <span>
              <span>,</span>
              <span style={{ color: 'black' }}> Becomes a Wight</span>
            </span>
          );
        }
      }
      return resultsArr;
    }
  }

  renderResults(data) {
    return data[0].predictions.map((element, index) => {
      const lives = element.livesResponse === true ? 'Lives' : 'Dies';
      const wightWalker =
        element.wightWalkerResponse === true ? 'Yes' : 'No Selection';

      const result = this.createResults(
        element.livesResponse,
        element.wightWalkerResponse,
        element.livesResult,
        element.wightWalkerResult
      );

      const obj = {
        characterName: element.characterName,
        lives,
        wightWalker,
        result,
        score: element.score
      };
      return obj;
    });
  }

  render() {
    const columns = [
      {
        title: 'Character Name',
        dataIndex: 'characterName',
        key: 'characterName'
      },
      {
        title: 'Prediction',
        dataIndex: 'lives',
        key: 'lives'
      },
      {
        title: 'Becomes a Wight Walker',
        dataIndex: 'wightWalker',
        key: 'wightWalker'
      },
      {
        title: 'Result',
        dataIndex: 'result',
        key: 'result'
      },
      {
        title: 'Score',
        dataIndex: 'score',
        key: 'score'
      }
    ];

    //console.log(this.renderResults(this.state.data));
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
        <Layout.Content style={{ padding: '20px 50px' }}>
          <div>
            <h1>{this.state.data[0].ownerName}</h1>
            <a href={`/board/${this.state.data[0].poolId}`}>
              {' '}
              Back to the leaderboard
            </a>
          </div>
          <h2>Bonus Questions</h2>
          <h3>
            Is Daenerys pregnant (or will be at some point in the season)? (1
            point)
          </h3>
          <h5>
            {this.state.data[0].questionOneResponse === true ? 'Yes' : 'No'}
          </h5>
          <h3>Who Kills the Night King? (2 points)</h3>
          <h5>{this.state.data[0].questionTwoResponse}</h5>
          <h3>Who holds the Iron Throne at the end? (4 points)</h3>
          <h5>{this.state.data[0].questionThreeResponse}</h5>

          <Table
            dataSource={this.renderResults(this.state.data)}
            columns={columns}
            bordered
            pagination={{ pageSize: 50, hideOnSinglePage: true }}
            footer={() => `Score: ${this.state.data[0].score}`}
          />
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }} />
      </Layout>
    );
  }
}

export default Board;
