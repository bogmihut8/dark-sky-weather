import React, { Component } from 'react';
import WeatherWidget from './components/WeatherWidget'
import { connect } from 'react-redux'
import {fetchData} from './store/actions/dataAction'

class App extends Component {
  componentWillMount(){
    this.props.fetchData(this.state);  
  }

  render() {
    const {data} = this.props;
    
    return (
      <div className="App">
        <h1>Dark Sky API Weather Implementation</h1>
        <p>Please select your desired location and optionally the date</p>
        <input type="text" className="location" placeholder="New York, Bucharest etc" />
        <WeatherWidget data={data}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (data) => dispatch(fetchData(data))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
