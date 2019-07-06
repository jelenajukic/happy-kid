import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div style={{color:"red", fontWeight:"bold"}}>{text}</div>;

class FindUs extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    console.log(process.env.key)
    return (

      <div style={{ height: '50vh', width: '50%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBOKG2gf34JUOyAbRwm7e85EtuHCqN5FdA" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="Happy-Kid"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default FindUs;