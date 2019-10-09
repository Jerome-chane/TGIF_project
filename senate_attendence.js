// let house_table_header = ['Full Name', 'Party', 'State', 'Seniority (years)', 'Percentage'];
let senat_members = data.results[0].members;
let senate_stats = {
    'Number of Democrats': 0,
    'Number of Republicans': 0,
    'Number of Independents': 0,
    'Democrats average votes with their party': 0,
    'Republicans average votes with their party': 0,
    'Members who most often vote with their party': 0,
    'Members who most often do not vote with their party': 0,
    'Members who missed the most votes': 0,
    'Members who have missed the least votes': 0,
};

let democrats = [];
let republicans = [];
let independents = [];

function count(obj) {
    for (var i = 0, e = obj.length; i < e; i++) {
        if (obj[i].party === 'R') {
            republicans.push(obj[i]);
        } else if (obj[i].party === 'D') {
            democrats.push(obj[i]);
        } else {
            independents.push(obj[i])
        };
    }
}
count(senat_members);
// console.log(independents);
// console.log(democrats);
// console.log(republicans);



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
// create_house_table();
// table_house_header(house_table_header);