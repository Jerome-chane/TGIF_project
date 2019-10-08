let senat_table_header = ['Full Name', 'Party', 'State', 'Seniority (years)', 'Percentage'];
let senat_members = data.results[0].members;


function create_senate_table() {
    let body = document.getElementById('tab');
    let table_senat = document.createElement('table');
    table_senat.setAttribute('class', 'table table-bordered table-hover');
    table_senat.setAttribute('id', 'senat_tab');
    body.appendChild(table_senat);
};


function table_senat_header(header) {
    let thead = document.createElement("thead");
    let row = document.createElement("tr");
    for (var i = 0, e = header.length; i < e; i++) {
        let table_senat_header = document.createElement('th');
        table_senat_header.setAttribute('class', 'text-center');
        table_senat_header.innerHTML = header[i];
        row.append(table_senat_header);
    }

    thead.append(row);

    document.getElementById('senat_tab').appendChild(thead);

}

create_senate_table();
table_senat_header(senat_table_header)

function tab_senate_members(arr) {
    let body = document.getElementById('senat_tab');
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

tab_senate_members(senat_members);