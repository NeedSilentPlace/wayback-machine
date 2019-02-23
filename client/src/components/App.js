import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import TextBox from './TextBox';
import SearchResult from './SearchResult';
import ArchiveVisualizer from './ArchiveVisualizer';
import ArchivePostResult from './ArchivePostResult';

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Header />
          {this.props.onLoading ? null : <TextBox />}
          <Switch>
            <Route
              exact path='/request/result'
              render={props => <ArchivePostResult {...props}
                onLoading={this.props.onLoading}
                error={this.props.error}
                message={this.props.message}
              />}
            />
            <Route 
              exact path='/frame/:url/:date'
              render={props => <ArchiveVisualizer {...props}
                onMount={this.props.getArchive}
                onLoading={this.props.onLoading}
                content={this.props.html}
              />}
            />
            <Route 
              path='/:url'
              render={props => <SearchResult {...props}
                onMount={this.props.checkArchive}
                onLoading={this.props.onLoading}
                dates={this.props.dates}
                similarUrls={this.props.similarUrls}
                onClickArchiveFirstTime={this.props.archiveFirstTime}
                onClickArchive={this.props.archiveNotFirstTime}
              />}
            />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

export default App;
