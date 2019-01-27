export default class HomeModel {
  id;

  isSpec;

  lat;

  lng;

  constructor(data) {
    this.id = data.HomeId;
    this.isSpec = data.IsSpec;
    this.lat = data.Lat;
    this.lng = data.Lng;
    this.address = data.Addr;
    this.name = data.PlanName;
    this.image = data.Thumb1 || data.Thumb2;
    this.bedRooms = data.Br;
    this.bathRooms = data.Ba;
    this.price = data.Price;
    this.opts = { ...data };
  }
}
