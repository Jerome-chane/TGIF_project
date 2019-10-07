let house_table_header = ['Full Name', 'Party', 'State', 'Seniority (years)', 'Percentage'];
let house_members = house_data.results[0].members;

function create_house_table(header) {
    let table_house = document.createElement('table');
    table_house.setAttribute('id', 'house_tab');
    document.body.appendChild(table_house);

    let table_house_header = function () {
        for (var i = 0, e = header.length; i < e; i++) {
            let table_house_header = document.createElement('th');
            table_house_header.setAttribute('id', 'house_tab_header');
            table_house_header.setAttribute('class', 'tab');
            table_house_header.innerHTML = header[i];
            document.getElementById('house_tab').appendChild(table_house_header);
            table_house.appendChild(table_house_header);
        }

    };
    table_house_header();

}
create_house_table(house_table_header);

function tab_house_members(arg) {
    let body = document.getElementById('house_tab');
    for (var i = 0, e = arg.length; i < e; i++) {
        let row = document.createElement('tr');
        let name = document.createElement('td');
        let party = document.createElement('td');
        let state = document.createElement('td');
        let years = document.createElement('td');
        let votes = document.createElement('td');


        name.innerHTML = arg[i].last_name + ' ' + arg[i].first_name + ' ' + (arg[i].middle_name || ' ');
        party.innerHTML = arg[i].party;
        state.innerHTML = arg[i].state;
        years.innerHTML = arg[i].seignority || '';
        votes.innerHTML = arg[i].votes_with_party_pct + '%';

        row.append(name, party, state, years, votes);
        body.append(row)
    }
}
tab_house_members(house_members);