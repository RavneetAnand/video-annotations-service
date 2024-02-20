'use strict';

module.exports.get_players = `
    SELECT id, Location location, Title_DistinctivetitlebookCovertitle_TitleText title, Contributor1_PersonName contributor, Cover_File coverfile, Unique_URL uniqueUrl
    FROM dbo.assessment2;`;