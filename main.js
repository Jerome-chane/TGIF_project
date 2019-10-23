const stats = {
    'total_members': 0,
    'totalAvg': 0,
    'democrats': [],
    'republicans': [],
    'independents': [],
    'sumDemVotes': 0,
    'sumRepVotes': 0,
    'sumIndVotes': 0,
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
let link;
let data;
let members;
// let sorted;
// let topTen = function () {
//     let a = []
//     for (var i = 0; i < (sorted.length * 10 / 100); i++) {
//         a.push(sorted[i]);
//     }
//     return a;
// };
//---------------------//

if (window.location.pathname == "/senate_loyalty.html" || window.location.pathname == "/senate_attendence.html" || window.location.pathname == "/senate.html") { // loyal_n_attendence IF
    link = "https://api.propublica.org/congress/v1/113/senate/members.json";
} else if (window.location.pathname == "/house_loyalty.html" || window.location.pathname == "/house_attendance.html" || window.location.pathname == "/house.html") {
    link = "https://api.propublica.org/congress/v1/113/house/members.json";
};
// if (window.location.pathname == "/house.html" || window.location.pathname == "/senate.html") {

// } else if (window.location.pathname == "/house_loyalty.html" || window.location.pathname == "/senate_loyalty.html" || window.location.pathname == "/house_attendance.html" || window.location.pathname == "/senate_attendence.html") {}
// loyal_n_attendence fetch

// fetch(link, {
//         headers: {
//             "X-API-Key": "kwpzZtXi0XIKTNGLteY8NHvhMzNgxETsg9Lw0SAH"
//         },
//     })
//     .then(function (response) {
//         return response.json();
//     })
//     .then((newData) => {
//         data = newData;
//         members = data.results[0].members;
//     })
//     .catch((error) => console.log(`Oops, Error`, error.message));

// function count(obj) {
//     for (var i = 0, e = obj.length; i < e; i++) {

//         if (obj[i].party === 'R') {
//             stats['republicans'].push(obj[i]);
//             stats['sumRepVotes'] += obj[i].votes_with_party_pct;
//         } else if (obj[i].party === 'D') {
//             stats['democrats'].push(obj[i]);
//             stats['sumDemVotes'] += obj[i].votes_with_party_pct;
//         } else {
//             stats['independents'].push(obj[i]);
//             stats['sumIndVotes'] += obj[i].votes_with_party_pct;
//         };
//     }
//     stats["Number of Democrats"] = stats['democrats'].length;
//     stats["Number of Republicans"] = stats['republicans'].length;
//     stats["Number of Independents"] = stats['independents'].length;
//     stats["Democrats average votes with their party"] = stats['sumDemVotes'] / stats['democrats'].length;
//     stats["Republicans average votes with their party"] = stats['sumRepVotes'] / stats['republicans'].length;
//     stats['totalAvg'] = (stats['sumDemVotes'] + stats['sumIndVotes'] + stats['sumRepVotes']) / members.length;
//     stats["Independents average votes with their party"] = stats['sumIndVotes'] / stats['independents'].length;
//     stats['total_members'] = stats["Number of Democrats"] + stats["Number of Republicans"] + stats["Number of Independents"];
// }





// function filter(obj) {
//     let checkboxFilter = [];
//     let listVal = document.getElementById("mylist").value
//     for (let i = 0; i < obj.length; i++) {

//         if (listVal === obj[i].state || listVal === "all") {
//             if (rep.checked && obj[i].party == 'R') {
//                 checkboxFilter.push(obj[i]);
//             } else if (dem.checked && obj[i].party == 'D') {
//                 checkboxFilter.push(obj[i]);
//             } else if (ind.checked && obj[i].party == 'I') {
//                 checkboxFilter.push(obj[i]);
//             };
//         }
//     };
//     if (rep.checked != true && dem.checked != true && ind.checked != true) {
//         msg(noResult, cl1);
//     } else if (checkboxFilter.length === 0) {
//         msg(noMatch, cl2);
//     } else {
//         deleteMsg();
//     }
//     fill_table(checkboxFilter, header)
// }


if (window.location.pathname == "/index.html") {
    let index = new Vue({
        el: '#button',
        data: {
            text: 'More',
        },
        methods: {
            changeText: function () {
                if (this.text == 'More') {
                    this.text = 'Less'
                } else this.text = 'More'
            }
        }

    })
}


if (window.location.pathname == "/senate.html" || window.location.pathname == "/house.html") {

    let senate = new Vue({
        el: '#table',
        data: {
            senators: [],
            filtered: [],
            states: [],
            selectState: "",
        },

        methods: {
            getData() {
                fetch(link, {
                        headers: {
                            "X-API-Key": "kwpzZtXi0XIKTNGLteY8NHvhMzNgxETsg9Lw0SAH"
                        },
                    })
                    .then(function (response) {
                        return response.json();
                    })
                    .then((newData) => {
                        this.senators = newData.results[0].members;
                        this.filter()
                        this.stateFilter()
                    })
                    .catch((error) => console.log(`Oops, Error`, error.message));
            },
            filter() {
                console.log(this.selectState)
                this.filtered = [];
                let rep = document.getElementById("Republican");
                let dem = document.getElementById("Democrat");
                let ind = document.getElementById("Independent");
                for (let i = 0; i < this.senators.length; i++) {
                    if (this.selectState === this.senators[i].state || this.selectState === '' || this.selectState === 'all') {
                        if (rep.checked && this.senators[i].party == 'R') {
                            this.filtered.push(this.senators[i]);
                        } else if (dem.checked && this.senators[i].party == 'D') {
                            this.filtered.push(this.senators[i]);
                        } else if (ind.checked && this.senators[i].party == 'I') {
                            this.filtered.push(this.senators[i]);
                        }
                    }
                };

            },
            stateFilter() {
                let allStates = [];
                for (let i = 0; i < this.senators.length; i++) {
                    allStates.push(this.senators[i].state)
                }
                let setStates = new Set(allStates);
                this.states = [...setStates];
                return this.states;

            },


        },


        created: function () {
            this.getData()

        }


    });
}