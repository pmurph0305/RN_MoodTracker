import * as SQLite from "expo-sqlite";

const moodData = [
  {
    date: "2019-11-28T14:48:00.000Z",
    tags: [8, 1, 2],
    rating: 45.5,
    note: "good day"
  },
  {
    date: "2019-11-26T12:00:00.000Z",
    tags: [3, 12, 5],
    rating: 55
  },
  {
    date: "2019-11-23T09:43:00.000Z",
    tags: [1, 4, 3],
    rating: 75
  },
  {
    date: "2019-11-01T01:02:00.000Z",
    tags: [3, 13, 8, 9],
    rating: 21,
    note: "bad day"
  },
  {
    date: "2019-11-28T23:59:59.000Z",
    tags: [2, 5, 8, 4],
    rating: 43
  },
  {
    date: "2019-11-28T23:58:50.000Z",
    tags: [5, 14, 3, 1, 2, 4, 6, 7],
    rating: 65
  },
  {
    date: "2019-11-29T00:01:00.000Z",
    tags: [11, 2, 10],
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
      "INSERT OR IGNORE INTO tags(iconType, iconName, displayName) VALUES (?, ?, ?);",
      [iconType, iconData.iconName, iconData.displayName]
    );
  };

  seedTags = () => {
    console.log("Seeding tags...");
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
    return Promise.all(promises)
      .then(() => {
        return Promise.resolve("All reinserting of tags completed");
      })
      .catch(error => {
        console.log("Error with all seed promises", error);
      });
  };

  seedMoods = () => {
    console.log("Seeding moods...");
    let promises = [];
    moodData.forEach(mood => {
      promises.push(this.insertMood(mood));
    });
    return Promise.all(promises).then(() => {
      return Promise.resolve("Succesfully reseeded moods");
    });
  };

  insertMood = mood => {
    return this.executeFullSql(
      "INSERT INTO moods (rating, date, note) VALUES (?, ?, ?);",
      [mood.rating, mood.date, mood.note]
    )
      .then(result => {
        let promises = [];
        mood.tags.forEach(tag => {
          promises.push(
            this.executeSql(
              "INSERT INTO tagmap (moodId, tagId) VALUES (?, ?);",
              [result.insertId, tag]
            )
          );
        });
        return Promise.all(promises).then(() => {
          return Promise.resolve(
            "Successfully inserted mood " + result.insertId
          );
        });
      })
      .catch(error => {
        console.log("ERROR", error);
        reject(error);
      });
  };

  insertTagMap = (moodId, tagId) => {
    return this.executeFullSql(
      "INSERT INTO tagmap (moodId, tagId) VALUES(?,?);",
      [moodId, tagId]
    );
  };

  deleteAllTables = () => {
    return this.executeSql("drop table if exists moods;").then(() => {
      return this.executeSql("drop table if exists tags;").then(() => {
        return this.executeSql("drop table if exists tagmap;");
      });
    });
  };

  createAllTables = () => {
    return this.executeSql(
      "CREATE TABLE IF NOT EXISTS moods (id INTEGER PRIMARY KEY NOT NULL, rating REAL, date TEXT, note TEXT);"
    ).then(() => {
      return this.executeSql(
        "CREATE TABLE IF NOT EXISTS tags(id INTEGER PRIMARY KEY NOT NULL, iconType TEXT, iconName TEXT, displayName TEXT NOT NULL UNIQUE);"
      ).then(() => {
        return this.executeSql(
          "CREATE TABLE IF NOT EXISTS tagmap(id INTEGER PRIMARY KEY NOT NULL, moodId INTEGER, tagId INTEGER, FOREIGN KEY(moodId) REFERENCES moods(id), FOREIGN KEY(tagId) REFERENCES tags(id));"
        );
      });
    });
  };

  reseedDatabase = () => {
    console.log("Reseeding database...");
    return this.deleteAllTables()
      .then(() => {
        console.log("Deleted all tables");
        return this.createAllTables().then(() => {
          console.log("Recreated all tables");
          return this.seedTags().then(() => {
            console.log("Reseeded Tags");
            return this.seedMoods().then(() => {
              console.log("Reseeded Moods");
              return Promise.resolve("Done reseeding Database");
            });
          });
        });
      })
      .catch(error => {
        console.log("Error reseeding", error);
      });
  };

  executeFullSql = (sql, params = []) => {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          sql,
          params,
          (tx, result) => {
            resolve(result);
          },
          error => reject(error)
        );
      });
    });
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

  getMoodsWithTags = () => {
    // Group concat then build tag data afterwards?
    // return this.executeFullSql(
    //   "SELECT M.*, GROUP_CONCAT(T.id) as tIDs, GROUP_CONCAT(T.iconType) as tITs, GROUP_CONCAT(T.iconName) as tINs, GROUP_CONCAT(T.displayName) as tDNs FROM moods M INNER JOIN tagmap TM ON M.id = TM.moodId INNER JOIN tags T on TM.tagId = T.id GROUP BY M.id;"
    // ).then(result => {
    //   console.log(result);
    //   // can i somehow do this in the query itself in sqlite?
    //   // group concat returns a string with a seperator
    //   // no array in sqlite
    //   // would it be faster to query for each mood,
    //   // then use it's id to query for an inner join of tagmap and tags,
    //   // then using that result array as tags?
    //   result.rows._array.forEach(mood => {
    //     mood.tDNs = mood.tDNs.split(",");
    //     mood.tIDs = mood.tIDs.split(",");
    //     mood.tITs = mood.tITs.split(",");
    //     mood.tINs = mood.tINs.split(",");
    //     mood.tags = mood.tIDs.map((id, index) => {
    //       return {
    //         id: id,
    //         iconName: mood.tINs[index],
    //         iconType: mood.tITs[index],
    //         displayName: mood.tDNs[index]
    //       };
    //     });
    //   });
    //   return Promise.resolve(true);
    // });

    // query all moods, then subquery for each mood id, matching tag.id in tagmap.moodId = mood.id
    return this.executeFullSql(
      "SELECT * FROM moods ORDER BY moods.date DESC"
    ).then(result => {
      let promises = [];
      // have all moods, do a promise for each subquery for each mood matching mood id and tag id in tag map.
      result.rows._array.forEach(mood => {
        promises.push(
          this.executeFullSql(
            "SELECT * FROM tags t WHERE t.id IN (SELECT tagmap.tagId FROM tagmap WHERE moodId = ?);",
            [mood.id]
          ).then(result => {
            mood.tags = [...result.rows._array];
          })
        );
      });
      return Promise.all(promises).then(r => {
        return Promise.resolve(result.rows);
      });
    });
  };

  getTags = () => {
    return this.executeSql("SELECT * FROM tags;");
  };

  getMoods = () => {
    return this.executeSql("SELECT * FROM moods;");
  };
}
