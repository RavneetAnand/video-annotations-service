'use strict';

module.exports.get_books = `
    SELECT id, Location location, Title_DistinctivetitlebookCovertitle_TitleText title, Contributor1_PersonName contributor, Cover_File coverfile, Unique_URL uniqueUrl
    FROM dbo.assessment2;`;