import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';



// const AnyReactComponent = ({ text }) => <div style={this.marker}><img style={this.markerIMG} src="../../logo.jpg" alt="marker" /></div>;
const AnyReactComponent = ({ text }) => <div>{text}</div>;

class FindUs extends Component {
  
  static defaultProps = {
    center: {
      lat: 52.3580,
      lng: 4.8686
    },
    zoom: 11
  };

  marker = {
    width: "50px",
    height: "50px",
  }

  markerIMG = {
    height: "100%",
    width: "auto",
    oveflow: "hidden"
  }

  contactDetails = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-start",
    padding: "20px",
    width: "30%",
    height: "50vh",
    backgroundColor: "#7BCB56",
    color: "#54008B"
  }

  render() {
    console.log(process.env.key)
    return (

      <div style={{ height: '50vh', width: '50%', display: "flex" }}>
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
        <div style={this.contactDetails}>
          <span><b>Address:</b> Amsterdamweg 1 </span>
          <span><b>e-mail:</b> happykid@gmail.com </span>
          <span><b>Phone:</b> xxx-xx-xxx</span>
        </div>
      </div>
    );
  }
}

export default FindUs;