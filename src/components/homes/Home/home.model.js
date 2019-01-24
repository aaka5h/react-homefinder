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
    this.opts = { ...data };
  }
}
