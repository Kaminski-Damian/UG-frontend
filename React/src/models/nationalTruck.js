import Truck from './truck';

class NationalTruck extends Truck {
  constructor (reg, km, driver) {
    super(reg, km, driver);
    this.internationalFreight = false;
  }
}

export default NationalTruck;