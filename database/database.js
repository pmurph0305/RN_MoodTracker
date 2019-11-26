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
    this.db.transaction(tx => {
      tx.executeSql(
        "INSERT OR IGNORE INTO tags(IconType, IconName, DisplayName) VALUES (?, ?, ?);",
        [iconType, iconData.iconName, iconData.displayName],
        null,
        null
        // success => console.log("succesfully added " + iconType + " icons"),
        // err => console.log("error adding FA icons", err)
      );
    });
  };

  seedTags = () => {
    // this.db.transaction(tx => {
    //   tx.executeSql("drop table if exists tags");
    // });
    this.db.transaction(tx => {
      tx.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='tags';",
        [],
        (trx, res) => {
          // will have 1 if table exists already.
          if (res.rows.length === 0) {
            this.db.transaction(
              tx => {
                tx.executeSql(
                  "CREATE TABLE IF NOT EXISTS tags(id INTEGER PRIMARY KEY NOT NULL, IconType TEXT, IconName TEXT, DisplayName TEXT NOT NULL UNIQUE);",
                  [],
                  () => {
                    // table could have been created.
                    fontAwesomeIcons.forEach(icon => {
                      this.insertTag("FontAwesome", icon);
                    });
                    materialIcons.forEach(icon => {
                      this.insertTag("MaterialIcons", icon);
                    });
                    featherIcons.forEach(icon => {
                      this.insertTag("Feather", icon);
                    });
                  }
                );
              },
              error => console.log("Error seeding icons", error),
              () => console.log("TX to create tags successful")
            );
          }
        }
      );
    });
  };

  seedDatabase = () => {
    this.seedTags();
  };

  executeSql = async (sql, params = []) => {
    return new Promise((resolve, reject) =>
      this.db.transaction(tx => {
        tx.executeSql(
          sql,
          params,
          (_, { rows }) => {
            // console.log(rows);
            resolve(rows._array);
          },
          reject
        );
      })
    );
  };

  getTags = () => {
    return this.executeSql("SELECT * FROM tags;");
  };
}
