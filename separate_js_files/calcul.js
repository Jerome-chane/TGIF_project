function count(obj) {
  for (var i = 0, e = obj.length; i < e; i++) {
    if (obj[i].party === "R") {
      republicans.push(obj[i]);
      sumRepVotes += obj[i].votes_with_party_pct;
    } else if (obj[i].party === "D") {
      democrats.push(obj[i]);
      sumDemVotes += obj[i].votes_with_party_pct;
    } else {
      independents.push(obj[i]);
      sumIndVotes += obj[i].votes_with_party_pct;
    }
  }
}
count(members);

stats["Number of Democrats"] = democrats.length;
stats["Number of Republicans"] = republicans.length;
stats["Number of Independents"] = independents.length;
stats["Democrats average votes with their party"] =
  sumDemVotes / democrats.length;
stats["Republicans average votes with their party"] =
  sumRepVotes / republicans.length;
stats["Independents average votes with their party"] =
  sumIndVotes / independents.length;
let total_members =
  stats["Number of Democrats"] +
  stats["Number of Republicans"] +
  stats["Number of Independents"];
let totalAvg = (sumDemVotes + sumIndVotes + sumRepVotes) / members.length;
