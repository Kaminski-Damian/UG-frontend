import Truck from './truck';

class InternationalTruck extends Truck {
  constructor (reg, km, driver) {
    super(reg, km, driver);
    this.internationalFreight = true;
  }
}

export default InternationalTruck;