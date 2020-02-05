let data;
let link;
if (window.location.pathname == "/senate.html") {
  link = "https://api.propublica.org/congress/v1/113/senate/members.json";
} else if (window.location.pathname == "/house.html") {
  link = "https://api.propublica.org/congress/v1/113/house/members.json";
}

fetch(link, {
  headers: {
    "X-API-Key": "kwpzZtXi0XIKTNGLteY8NHvhMzNgxETsg9Lw0SAH"
  },
  method: "GET"
})
  .then(function(response) {
    return response.json();
  })
  .then(newData => {
    data = newData;

    function init() {
      let members = data.results[0].members;
      let filtered = stateFilter(members);
      create_table();
      filter(members);
      createSelect(filtered);
      rep.addEventListener("click", () => filter(members));
      dem.addEventListener("click", () => filter(members));
      ind.addEventListener("click", () => filter(members));
      dropFilter.addEventListener("change", () => filter(members));
    }
    init();
  })
  .catch(error => console.log(`Oops, Error`, error.message));

loader();

let header = ["Full Name", "Party", "State", "Seniority (years)", "Percentage"];
let rep = document.getElementById("Republican");
let dem = document.getElementById("Democrat");
let ind = document.getElementById("Independent");
let noMatch = "No Match found";
let noResult = "Please Select a Party";
let cl1 = "alert text-center alert-danger";
let cl2 = "alert text-center alert-warning";
let dropFilter = document.getElementById("mylist");

function create_table() {
  let body = document.getElementById("tab");
  let table = document.createElement("table");
  table.setAttribute("class", "table table-bordered table-hover");
  table.setAttribute("id", "new_tab");
  body.appendChild(table);
}

function fill_table(arr, head) {
  deleteLoader();
  header = ["Full Name", "Party", "State", "Seniority (years)", "Percentage"];
  let body = document.getElementById("new_tab");
  body.innerHTML = "";
  let tbody = document.createElement("tbody");
  let thead = document.createElement("thead");
  let row = document.createElement("tr");

  for (var i = 0; i < head.length; i++) {
    let th = document.createElement("th");
    th.setAttribute("class", "text-center");
    th.innerHTML = head[i];
    row.append(th);
  }
  thead.append(row);
  document.getElementById("new_tab").appendChild(thead);

  for (var i = 0; i < arr.length; i++) {
    let row = document.createElement("tr");
    let name = document.createElement("td");
    let party = document.createElement("td");
    let state = document.createElement("td");
    let years = document.createElement("td");
    let votes = document.createElement("td");

    name.innerHTML =
      '<a target="_blank" href="' +
      arr[i].url +
      '">' +
      arr[i].last_name +
      " " +
      arr[i].first_name +
      " " +
      (arr[i].middle_name || " ") +
      "</a>";
    party.innerHTML = arr[i].party;
    state.innerHTML = arr[i].state;
    years.innerHTML = arr[i].seniority;
    votes.innerHTML = arr[i].votes_with_party_pct + "%";
    row.append(name, party, state, years, votes);
    tbody.append(row);
  }
  body.appendChild(tbody);
}

function msg(arg, cl) {
  header = [];
  let empty = document.getElementById("new_tab");
  empty.innerHTML = "";
  let m = document.getElementById("message");
  m.setAttribute("class", cl);
  m.innerHTML = arg;
}

function deleteMsg() {
  let m = document.getElementById("message");
  m.classList.remove("alert-danger");
  m.classList.remove("alert-warning");
  m.innerHTML = "";
}
// create_table();
// filter(members)

function stateFilter(arg) {
  let allStates = [];
  for (let i = 0; i < arg.length; i++) {
    allStates.push(arg[i].state);
  }
  let setStates = new Set(allStates);
  let states = [...setStates];
  return states;
}
// let filtered = stateFilter(members)

function createSelect(arg) {
  let statesNames = {
    AL: "Alabama",
    AS: "American Samoa",
    AK: "Alaska",
    AZ: "Arizona",
    AR: "Arkansas",
    CA: "California",
    CO: "Colorado",
    CT: "Connecticut",
    DC: "Dist. of Columbia",
    DE: "Delaware",
    FL: "Florida",
    GA: "Georgia",
    GU: "Guam",
    HI: "Hawaii",
    ID: "Idaho",
    IL: "Illinois",
    IN: "Indiana",
    IA: "Iowa",
    KS: "Kansas",
    KY: "Kentucky",
    LA: "Louisiana",
    ME: "Maine",
    MD: "Maryland",
    MA: "Massachusetts",
    MI: "Michigan",
    MN: "Minnesota",
    MS: "Mississippi",
    MO: "Missouri",
    MP: "Mariana Islands",
    MT: "Montana",
    NE: "Nebraska",
    NV: "Nevada",
    NH: "New Hampshire",
    NJ: "New Jersey",
    NM: "New Mexico",
    NY: "New York",
    NC: "North Carolina",
    ND: "North Dakota",
    OH: "Ohio",
    OK: "Oklahoma",
    OR: "Oregon",
    PA: "Pennsylvania",
    PR: "Porto Rico",
    RI: "Rhode Island",
    SC: "South Carolina",
    SD: "South Dakota",
    TN: "Tennessee",
    TX: "Texas",
    UT: "Utah",
    VT: "Vermont",
    VI: "Virgin Islands",
    VA: "Virginia",
    WA: "Washington",
    WV: "West Virginia",
    WI: "Wiscosi",
    WY: "Wyoming"
  };
  let select = document.getElementById("mylist");
  for (let i = 0; i < arg.length; i++) {
    let option = document.createElement("option");
    for (let [key, value] of Object.entries(statesNames)) {
      if ([key] == arg[i]) {
        option.innerHTML = [value];
      }
    }
    option.setAttribute("value", arg[i]);
    select.add(option);
  }
}

function filter(obj) {
  let checkboxFilter = [];
  let listVal = document.getElementById("mylist").value;
  for (let i = 0; i < obj.length; i++) {
    if (listVal === obj[i].state || listVal === "all") {
      if (rep.checked && obj[i].party == "R") {
        checkboxFilter.push(obj[i]);
      } else if (dem.checked && obj[i].party == "D") {
        checkboxFilter.push(obj[i]);
      } else if (ind.checked && obj[i].party == "I") {
        checkboxFilter.push(obj[i]);
      }
    }
  }
  if (rep.checked != true && dem.checked != true && ind.checked != true) {
    msg(noResult, cl1);
  } else if (checkboxFilter.length === 0) {
    msg(noMatch, cl2);
  } else {
    deleteMsg();
  }
  fill_table(checkboxFilter, header);
}

function loader() {
  let loader = document.getElementById("load");
  loader.setAttribute("class", "loader");
}

function deleteLoader() {
  let loader = document.getElementById("load");
  loader.classList.remove("loader");
}
