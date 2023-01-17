import { useEffect } from 'react'
import './style.css'

export default function MapComponent(location: any) {
return (<>{
  location?(<><div className="map-component">
  <h2>地理位置 location:{location}</h2>
  <div id="map-container" className="map"></div>
</div></>):(<><h1>Map Component</h1></>)
}</>)
}
