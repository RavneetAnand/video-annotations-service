import sqlite from 'sqlite3';

// SQL statements to create tables
const createUserTableStmt = `CREATE TABLE IF NOT EXISTS User (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, userName NVARCHAR(100) NOT NULL)`;

const createVideoTableStmt = `
  CREATE TABLE IF NOT EXISTS Video (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    title TEXT,
    description TEXT,
    url TEXT,
    duration INTEGER,
    dateCreated TEXT,
    createdBy TEXT,
    dateLastUpdated TEXT,
    lastUpdatedBy TEXT,
    FOREIGN KEY (createdBy) REFERENCES User(id),
    FOREIGN KEY (lastUpdatedBy) REFERENCES User(id)
  )`;

const createAnnotationTableStmt = `
  CREATE TABLE IF NOT EXISTS Annotation (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    videoId INTEGER,
    startTime INTEGER,
    endTime INTEGER,
    annotationTypeId INTEGER,
    notes TEXT,
    dateCreated TEXT,
    createdBy TEXT,
    dateLastUpdated TEXT,
    lastUpdatedBy TEXT,
    FOREIGN KEY (videoId) REFERENCES Video(id),
    FOREIGN KEY (annotationTypeId) REFERENCES AnnotationType(id),
    FOREIGN KEY (createdBy) REFERENCES User(id),
    FOREIGN KEY (lastUpdatedBy) REFERENCES User(id)
  )`;

const createAnnotationTypeTableStmt = `
  CREATE TABLE IF NOT EXISTS AnnotationType (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name TEXT,
    description TEXT
  )`;

// Function to insert dummy data
const createUserTable = (db: sqlite.Database) => {
  db.run(createUserTableStmt, (err) => {
    if (err) {
      console.log('Table already exists.');
    }

    db.get(
      `SELECT count(*) as count FROM User`,
      (err, row: { count: number }) => {
        if (err) {
          console.error(err.message);
          return;
        }
        `Data count in ${JSON.stringify(row.count)}`;

        if (row.count > 0) {
          return;
        }

        const users = [
          { userName: 'test' },
          { userName: 'Bob' },
          { userName: 'Charlie' },
          { userName: 'David' },
          { userName: 'Eve' },
        ];

        users.forEach((user) => {
          db.run(`INSERT INTO User (userName) VALUES (?)`, [user.userName]);
        });
      },
    );
  });
};

const createVideoTable = (db: sqlite.Database) => {
  db.run(createVideoTableStmt, (err) => {
    if (err) {
      console.log('Table already exists.');
    }

    db.get(
      `SELECT count(*) as count FROM Video`,
      (err, row: { count: number }) => {
        if (err) {
          console.error(err.message);
          return;
        }
        `Data count in ${JSON.stringify(row.count)}`;

        if (row.count > 0) {
          return;
        }
        // Insert dummy videos
        const videos = [
          {
            id: 1,
            title: 'Introduction to SQLite',
            description: 'A basic introduction to SQLite',
            url: 'http://example.com/video1',
            duration: 300,
            dateCreated: '2020-01-01',
            createdBy: 1,
            dateLastUpdated: '2020-01-02',
            lastUpdatedBy: 2,
          },
          {
            id: 2,
            title: 'Node.js Tutorial',
            description: 'A complete guide to Node.js',
            url: 'http://example.com/video2',
            duration: 500,
            dateCreated: '2020-01-01',
            createdBy: 2,
            dateLastUpdated: '2020-01-02',
            lastUpdatedBy: 3,
          },
          {
            id: 3,
            title: 'Express Basics',
            description: 'Learn the basics of Express.js',
            url: 'http://example.com/video3',
            duration: 200,
            dateCreated: '2020-01-01',
            createdBy: 3,
            dateLastUpdated: '2020-01-02',
            lastUpdatedBy: 4,
          },
          {
            id: 4,
            title: 'Advanced SQLite',
            description: 'Diving deeper into SQLite',
            url: 'http://example.com/video4',
            duration: 400,
            dateCreated: '2020-01-01',
            createdBy: 4,
            dateLastUpdated: '2020-01-02',
            lastUpdatedBy: 5,
          },
          {
            id: 5,
            title: 'JavaScript Tips',
            description: 'Useful JavaScript tips and tricks',
            url: 'http://example.com/video5',
            duration: 600,
            dateCreated: '2020-01-01',
            createdBy: 5,
            dateLastUpdated: '2020-01-02',
            lastUpdatedBy: 1,
          },
        ];
        videos.forEach((video) => {
          db.run(
            `INSERT INTO Video (title, description, url, duration, dateCreated, createdBy, dateLastUpdated, lastUpdatedBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              video.title,
              video.description,
              video.url,
              video.duration,
              video.dateCreated,
              video.createdBy,
              video.dateLastUpdated,
              video.lastUpdatedBy,
            ],
          );
        });
      },
    );
  });
};

const createAnnotationTypeTable = (db: sqlite.Database) => {
  db.run(createAnnotationTypeTableStmt, (err) => {
    if (err) {
      console.log('Table already exists.');
    }

    db.get(
      `SELECT count(*) as count FROM AnnotationType`,
      (err, row: { count: number }) => {
        if (err) {
          console.error(err.message);
          return;
        }
        `Data count in ${JSON.stringify(row.count)}`;

        if (row.count > 0) {
          return;
        }

        // Insert dummy annotation types
        const annotationTypes = [
          { name: 'Comment', description: 'A simple comment' },
          { name: 'Highlight', description: 'A highlight in the video' },
          { name: 'Bookmark', description: 'A bookmark in the video' },
        ];
        annotationTypes.forEach((type) => {
          db.run(
            `INSERT INTO AnnotationType (name, description) VALUES (?, ?)`,
            [type.name, type.description],
          );
        });
      },
    );
  });
};

const createAnnotationTable = (db: sqlite.Database) => {
  db.run(createAnnotationTableStmt, (err) => {
    if (err) {
      console.log('Table already exists.');
    }

    db.get(
      `SELECT count(*) as count FROM Annotation`,
      (err, row: { count: number }) => {
        if (err) {
          console.error(err.message);
          return;
        }
        `Data count in ${JSON.stringify(row.count)}`;

        if (row.count > 0) {
          return;
        }

        // Insert dummy annotations
        const annotations = [
          {
            id: 1,
            videoId: 1,
            startTime: 10,
            endTime: 20,
            annotationTypeId: 1,
            notes: 'First comment',
            dateCreated: '2020-01-01',
            createdBy: 1,
            dateLastUpdated: '2020-01-02',
            lastUpdatedBy: 2,
          },
          {
            id: 2,
            videoId: 2,
            startTime: 30,
            endTime: 40,
            annotationTypeId: 2,
            notes: 'Second comment',
            dateCreated: '2020-01-03',
            createdBy: 2,
            dateLastUpdated: '2020-01-04',
            lastUpdatedBy: 3,
          },
          {
            id: 3,
            videoId: 3,
            startTime: 50,
            endTime: 60,
            annotationTypeId: 3,
            notes: 'Third comment',
            dateCreated: '2020-01-05',
            createdBy: 3,
            dateLastUpdated: '2020-01-06',
            lastUpdatedBy: 4,
          },
          {
            id: 4,
            videoId: 4,
            startTime: 70,
            endTime: 80,
            annotationTypeId: 1,
            notes: 'Fourth comment',
            dateCreated: '2020-01-07',
            createdBy: 4,
            dateLastUpdated: '2020-01-08',
            lastUpdatedBy: 5,
          },
          {
            id: 5,
            videoId: 5,
            startTime: 90,
            endTime: 100,
            annotationTypeId: 2,
            notes: 'Fifth comment',
            dateCreated: '2020-01-09',
            createdBy: 5,
            dateLastUpdated: '2020-01-10',
            lastUpdatedBy: 1,
          },
        ];
        annotations.forEach((anno) => {
          db.run(
            `INSERT INTO Annotation (videoId, startTime, endTime, annotationTypeId, notes, dateCreated, createdBy, dateLastUpdated, lastUpdatedBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              anno.videoId,
              anno.startTime,
              anno.endTime,
              anno.annotationTypeId,
              anno.notes,
              anno.dateCreated,
              anno.createdBy,
              anno.dateLastUpdated,
              anno.lastUpdatedBy,
            ],
          );
        });
      },
    );
  });
};

// Function to create tables
export const createTables = (db: sqlite.Database) => {
  createUserTable(db);

  createVideoTable(db);

  createAnnotationTypeTable(db);

  createAnnotationTable(db);
};
