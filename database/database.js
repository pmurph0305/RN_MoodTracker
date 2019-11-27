import * as SQLite from "expo-sqlite";

const moodData = [
  {
    date: "November 24 2019",
    tags: "Relax, Games, Programming",
    rating: 45,
    note: "good day"
  },
  {
    date: "November 25 2019",
    tags: "Relax, Games",
    rating: 55
  },
  {
    date: "November 26 2019",
    tags: "Games, TV",
    rating: 75
  }
];

const fontAwesomeIcons = [
  { iconName: "shopping-cart", displayName: "shopping" },
  { iconName: "book", displayName: "reading" },
  { iconName: "heart", displayName: "date" },
  { iconName: "briefcase", displayName: "work" },
  { iconName: "plane", displayName: "travel" },
  { iconName: "users", displayName: "friends" },
  { iconName: "gamepad", displayName: "gaming" }
];

const featherIcons = [
  { iconName: "tv", displayName: "television" },
  { iconName: "monitor", displayName: "computer" },
  { iconName: "moon", displayName: "good sleep" }
];
const materialIcons = [
  { iconName: "beach-access", displayName: "relax" },
  { iconName: "phone", displayName: "phone" },
  { iconName: "directions-run", displayName: "exercise" },
  { iconName: "restaurant", displayName: "good food" }
];
export default class Database {
  static db = SQLite.openDatabase("MoodDB.db", "0", "Mood Database");
  constructor() {
    this.db = SQLite.openDatabase("MoodDB.db", "0", "Mood Database");
  }

  insertTag = (iconType, iconData) => {
    return this.executeSql(
      "INSERT OR IGNORE INTO tags(IconType, IconName, DisplayName) VALUES (?, ?, ?);",
      [iconType, iconData.iconName, iconData.displayName]
    );
  };

  seedTags = () => {
    return this.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='tags';",
      []
    ).then(result => {
      if (result.length === 0) {
        return this.executeSql(
          "CREATE TABLE IF NOT EXISTS tags(id INTEGER PRIMARY KEY NOT NULL, IconType TEXT, IconName TEXT, DisplayName TEXT NOT NULL UNIQUE);"
        ).then(() => {
          console.log("Successfully recreated tags table");
          let promises = [];
          fontAwesomeIcons.forEach(icon => {
            promises.push(this.insertTag("FontAwesome", icon));
          });
          materialIcons.forEach(icon => {
            promises.push(this.insertTag("MaterialIcons", icon));
          });
          featherIcons.forEach(icon => {
            promises.push(this.insertTag("Feather", icon));
          });
          return Promise.all(promises).then(() => {
            console.log("Successfully reinserted all tags");
            return new Promise.resolve("All reinserting of tags completed");
          });
        });
      } else {
        return new Promise.resolve("No need to reseed tag table.");
      }
    });
  };

  dropThenSeedMoods = () => {
    return this.executeSql("DROP TABLE IF EXISTS moods;").then(() => {
      console.log("Successfully dropped moods table");
      return this.executeSql(
        "CREATE TABLE IF NOT EXISTS moods (id INTEGER PRIMARY KEY NOT NULL, rating INT, date TEXT, tags TEXT, note TEXT);"
      ).then(() => {
        console.log("Successfully created moods table");
        let promises = [];
        moodData.forEach(item => {
          promises.push(
            this.executeSql(
              "insert into moods (rating, date, tags, note) values (?, ?, ?, ?);",
              [item.rating, item.date, item.tags, item.note]
            )
          );
        });
        return Promise.all(promises).then(() => {
          console.log("Successfully reseeded moods table");
          return new Promise.resolve("Succesfully reseeded moods");
        });
      });
    });
  };

  reseedDatabase = () => {
    console.log("Reseeding database...");
    return this.seedTags()
      .then(r => {
        return this.dropThenSeedMoods().then(r => {
          return new Promise.resolve("Succesfully reseeded");
        });
      })
      .catch(error =>
        console.log("reseedDatabase() Error reseeding database", error)
      );
  };

  executeSql = async (sql, params = []) => {
    return new Promise((resolve, reject) =>
      this.db.transaction(tx => {
        tx.executeSql(
          sql,
          params,
          (_, { rows }) => {
            // console.log(rows);
            resolve(rows);
          },
          error => reject(error)
        );
      })
    );
  };

  getTags = () => {
    return this.executeSql("SELECT * FROM tags;");
  };

  getMoods = () => {
    return this.executeSql("SELECT * FROM moods;");
  };
}
