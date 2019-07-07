import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';



// const AnyReactComponent = ({ text }) => <div style={this.marker}><img style={this.markerIMG} src="../../logo.jpg" alt="marker" /></div>;
const MarkerComponent = ({ text }) => <div>{text}</div>;

class FindUs extends Component {
  
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
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

      <div style={{ height: '50vh', width: '70%', display: "flex", margin:"0 auto"  }}>
        <GoogleMapReact 
          bootstrapURLKeys={{ key: "AIzaSyBOKG2gf34JUOyAbRwm7e85EtuHCqN5FdA" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <MarkerComponent
            lat={59.955413}
            lng={30.337844}
            text="Happy-Kid"
          />
        </GoogleMapReact>
        <div style={this.contactDetails}>
          <span style={{color:'#FFE200'}}><b>Address:</b>Amsterdamweg 1</span>
          <span style={{color:'#FFE200'}}><b>e-mail:</b>happykid@gmail.com</span>
          <span style={{color:'#FFE200'}}><b>Phone:</b><br/>xxx-xx-xxx</span>
        </div>
      </div>
    );
  }
}

export default FindUs;