let house_table_header = ['Full Name', 'Party', 'State', 'Seniority (years)', 'Percentage'];
let house_members = data.results[0].members;

function create_house_table() {
    let body = document.getElementById('tab');
    let table_house = document.createElement('table');
    table_house.setAttribute('class', 'table table-bordered table-hover');
    table_house.setAttribute('id', 'house_tab');
    body.appendChild(table_house);

}

function table_house_header(header) {
    let thead = document.createElement('thead');
    let row = document.createElement('tr');
    for (var i = 0, e = header.length; i < e; i++) {
        let table_house_header = document.createElement('th');
        table_house_header.setAttribute('class', 'text-center');
        table_house_header.innerHTML = header[i];
        row.append(table_house_header);
    }

    thead.append(row);
    document.getElementById('house_tab').appendChild(thead);
}
create_house_table();
table_house_header(house_table_header);

function tab_house_members(arg) {
    let body = document.getElementById('house_tab');
    let tbody = document.createElement('tbody');
    for (var i = 0, e = arg.length; i < e; i++) {
        let row = document.createElement('tr');
        let name = document.createElement('td');
        let party = document.createElement('td');
        let state = document.createElement('td');
        let years = document.createElement('td');
        let votes = document.createElement('td');


        name.innerHTML = '<a target="_blank" href="' + arg[i].url + '">' +
            arg[i].last_name + ' ' + arg[i].first_name + ' ' + (arg[i].middle_name || ' ') +
            '</a>';
        party.innerHTML = arg[i].party;
        state.innerHTML = arg[i].state;
        years.innerHTML = arg[i].seniority || '';
        votes.innerHTML = arg[i].votes_with_party_pct + '%';

        row.append(name, party, state, years, votes);
        tbody.append(row)
    }
    body.append(tbody)
}
tab_house_members(house_members);