let header = ['Full Name', 'Party', 'State', 'Seniority (years)', 'Percentage'];
let members = data.results[0].members;
let checkboxFilter = [];
let rep = document.getElementById("Republican");
let dem = document.getElementById("Democrat");
let ind = document.getElementById("Independent");
let noMatch = "No Match found";
let noResult = "Please Select a Party";
let cl1 = "alert text-center alert-danger";
let cl2 = "alert text-center alert-warning";
rep.addEventListener('click', () => filter(members));
dem.addEventListener('click', () => filter(members));
ind.addEventListener('click', () => filter(members));

function create_table() {
    let body = document.getElementById('tab');
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-bordered table-hover');
    table.setAttribute('id', 'new_tab');
    body.appendChild(table);

}
create_table();

function fill_table(arr, head) {
    headeader = ['Full Name', 'Party', 'State', 'Seniority (years)', 'Percentage'];
    let thead = document.createElement("thead");
    let row = document.createElement("tr");

    for (var i = 0; i < head.length; i++) {
        let th = document.createElement('th');
        th.setAttribute('class', 'text-center');
        th.innerHTML = head[i];
        row.append(th);
    }

    thead.append(row);
    document.getElementById('new_tab').appendChild(thead);
    let body = document.getElementById('new_tab');
    body.innerHTML = "";
    let tbody = document.createElement("tbody");

    for (var i = 0; i < arr.length; i++) {
        let row = document.createElement('tr');
        let name = document.createElement('td');
        let party = document.createElement('td');
        let state = document.createElement('td');
        let years = document.createElement('td');
        let votes = document.createElement('td');

        name.innerHTML = '<a target="_blank" href="' + arr[i].url + '">' +
            arr[i].last_name + ' ' + arr[i].first_name + ' ' + (arr[i].middle_name || ' ') +
            '</a>';
        party.innerHTML = arr[i].party;
        state.innerHTML = arr[i].state;
        years.innerHTML = arr[i].seniority;
        votes.innerHTML = arr[i].votes_with_party_pct + '%';
        row.append(name, party, state, years, votes)
        tbody.append(row);

    }
    body.appendChild(tbody)
};

function filter(obj) {
    checkboxFilter = [];
    for (var i = 0; i < obj.length; i++) {

        if (rep.checked && obj[i].party == 'R') {
            checkboxFilter.push(obj[i]);

        } else if (dem.checked && obj[i].party == 'D') {
            checkboxFilter.push(obj[i]);

        } else if (ind.checked && obj[i].party == 'I') {
            checkboxFilter.push(obj[i]);
        }
    };
    if (rep.checked != true && dem.checked != true && ind.checked != true) {
        msg(noResult, cl1);
    } else if (checkboxFilter.length === 0) {
        msg(noMatch, cl2);
    } else {
        deleteMsg();
    }
    fill_table(checkboxFilter, header)

}
filter(members)

function msg(arg, cl) {
    header = [];
    let empty = document.getElementById('new_tab');
    empty.innerHTML = ""
    let m = document.getElementById('message');
    m.setAttribute("class", cl);
    m.innerHTML = arg;
}

function deleteMsg() {
    let m = document.getElementById('message')
    m.classList.remove("alert-danger");
    m.classList.remove("alert-warning")
    m.innerHTML = "";
}