import Database from "../database/database";

export default class MoodStatistics {
  constructor() {
    this.db = new Database();
    this.test = [1, 2, 3];
    // for now lets just get ALL moods with tags.
    this.moods = [];

    //console.log(this.moods);
  }

  getAllMoods = () => {
    if (this.moods && this.moods.length > 0) {
      return Promise.resolve(this.moods);
    } else {
      return this.db.getMoodsInCurrentDateMonth(new Date()).then(result => {
        this.moods = result._array;
        return Promise.resolve(this.moods);
      });
    }
  };
}
