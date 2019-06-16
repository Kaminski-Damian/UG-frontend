import React from 'react';
 
const Trucks = ({ trucks }) => {
    
  const truckList = trucks.map(truck => {
     return (
      <div className="truck" key={ truck.id }>
        <h2>Truck Data</h2>
          <ul>
            <li>Registration Number: {truck.regNumber}</li>
            <li>Route In Kilometers: {truck.routeInKilometers}</li>
            <li>International Freight: {truck.internationalFreight ? 'Yes' : 'No'}</li>
              <ul>
                <li>Driver Name: {truck.driver.name}</li>
                <li>Driver Year Of Birth: {truck.driver.yearOfBirth}</li>
              </ul>
          </ul>
      </div>
    )
  });

  return (
    <div className="trucks-list">
      { truckList }
    </div>
  )
}

export default Trucks;