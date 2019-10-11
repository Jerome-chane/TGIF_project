let members = data.results[0].members;
const stats = {
    'Number of Democrats': 0,
    'Number of Republicans': 0,
    'Number of Independents': 0,
    'Democrats average votes with their party': 0,
    'Republicans average votes with their party': 0,
    'Independents average votes with their party': 0,

    'Members who most often vote with their party': 0,
    'Members who most often do not vote with their party': 0,
    'Members who missed the most votes': 0,
    'Members who have missed the least votes': 0,
};
let democrats = [];
let republicans = [];
let independents = [];
let sumDemVotes = 0;
let sumRepVotes = 0;
let sumIndVotes = 0;
let mostVotes = [];
let leastVotes = [];
let missedMostVotes = 0;
let missedLeastVotes = 0;