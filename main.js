let link;
let members;

if (window.location.pathname == "/senate_loyalty.html" || window.location.pathname == "/senate_attendence.html" || window.location.pathname == "/senate.html") { // loyal_n_attendence IF
    link = "https://api.propublica.org/congress/v1/113/senate/members.json";
} else if (window.location.pathname == "/house_loyalty.html" || window.location.pathname == "/house_attendance.html" || window.location.pathname == "/house.html") {
    link = "https://api.propublica.org/congress/v1/113/house/members.json";
};

fetch(link, {
        headers: {
            "X-API-Key": "kwpzZtXi0XIKTNGLteY8NHvhMzNgxETsg9Lw0SAH"
        },
    })
    .then(function (response) {
        return response.json();
    })
    .then((newData) => {
        members = newData.results[0].members;
        init()
    })
    .catch((error) => console.log(`Oops, Error`, error.message));


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






function init() {


    if (window.location.pathname == "/senate.html" || window.location.pathname == "/house.html") {
        let senate = new Vue({
            el: '#table',
            data: {
                senators: [],
                filtered: [],
                states: [],
                selectState: "",
                checkBox: ["D", "R", "I"],
            },
            methods: {
                filter() {
                    chapuza()
                    this.senators = members;
                    this.filtered = []; // automatically empty the array of members sent to the table
                    let allStates = [];
                    let rep = document.getElementById("Republican");
                    let dem = document.getElementById("Democrat");
                    let ind = document.getElementById("Independent");
                    for (let i = 0; i < this.senators.length; i++) {
                        allStates.push(this.senators[i].state)
                        let setStates = new Set(allStates);
                        this.states = [...setStates]; // this part fill up the filter dropdown menu

                        if (this.selectState === this.senators[i].state || this.selectState === '' || this.selectState === 'all') {
                            if (rep.checked && this.senators[i].party == 'R') {
                                this.filtered.push(this.senators[i]);
                            } else if (dem.checked && this.senators[i].party == 'D') { // this part filters the members
                                this.filtered.push(this.senators[i]);
                            } else if (ind.checked && this.senators[i].party == 'I') {
                                this.filtered.push(this.senators[i]);
                            }
                        }
                    };
                },

            },
            created: function () {
                this.filter()

            }
        });

    };




    if (window.location.pathname == "/senate_attendence.html" || window.location.pathname == "/house_attendance.html") {
        let attendence = new Vue({
            el: "#attendence",
            data: {
                members: [],
                topTen: [], // used to fill up the bottom tables
                reverseTen: [],
                vote: [],
                republicans: [],
                democrats: [],
                independents: [],
                repVotes: 0,
                demVotes: 0,
                indVotes: 0,
                totVotes: 0,
            },
            methods: {

                countMembers() {
                    this.vote = this.members.sort((a, b) => a.missed_votes_pct - b.missed_votes_pct)
                    console.log(this.vote)
                    return this.vote

                },
                filter() {

                    return this.members.filter(() => this.members.party === 'R')

                },
                count() { //fills up the first table

                    document.getElementById('chap').classList.remove('chapuza');
                    document.getElementById('tab1').classList.remove('chapuza');
                    document.getElementById('tab2').classList.remove('chapuza');
                    this.members = members;
                    let reverseMembers = members.sort((a, b) => (b.missed_votes_pct - a.missed_votes_pct))
                    members.sort((a, b) => (a.missed_votes_pct - b.missed_votes_pct))
                    // this.reverseTen = members.sort((a, b) => (b.missed_votes_pct - a.missed_votes_pct)).reverse()

                    let ten = (this.members.length * 10 / 100) // count the 10% of the members
                    for (var i = 0; i < ten; i++) {
                        this.topTen.push(members[i]) // push the 10% of members in new array
                        this.reverseTen.push(reverseMembers[i])
                    }
                    for (var i = 0, e = this.members.length; i < e; i++) {
                        if (this.members[i].party === 'R') {
                            this.republicans.push(this.members[i]);
                            this.repVotes += this.members[i].votes_with_party_pct;
                        } else if (this.members[i].party === 'D') { // count all different parties and their % votes
                            this.democrats.push(this.members[i]);
                            this.demVotes += this.members[i].votes_with_party_pct;
                        } else {
                            this.independents.push(this.members[i]);
                            this.indVotes += this.members[i].votes_with_party_pct;
                        };
                        this.totVotes = (this.repVotes + this.demVotes + this.indVotes) / this.members.length
                        this.topTen.sort((a, b) => (a.missed_votes_pct - b.missed_votes_pct))
                        this.reverseTen.sort((a, b) => (b.missed_votes_pct - a.missed_votes_pct))
                    }
                    this.reverseTen.reverse()
                },
                // fiter() {
                //     this.topTen.sort((a,b)=>(a.missed_votes_pct - b.missed_votes_pct))
                // },

            },
            created: function () {
                this.count()

            },

        })
    }
    if (window.location.pathname == "/senate_loyalty.html" || window.location.pathname == "/house_loyalty.html") {

        let loyalty = new Vue({
            el: '#loyalty',
            data: {
                members: [],
                vote: [],
                republicans: [],
                democrats: [],
                independents: [],
                repVotes: 0,
                demVotes: 0,
                indVotes: 0,
                totVotes: 0,
            },
            methods: {

                count() { // fills up the first table
                    document.getElementById('chap').classList.remove('chapuza');
                    document.getElementById('tab1').classList.remove('chapuza');
                    document.getElementById('tab2').classList.remove('chapuza');
                    this.members = members
                    for (var i = 0, e = this.members.length; i < e; i++) {
                        if (this.members[i].party === 'R') {
                            this.republicans.push(this.members[i]);
                            this.repVotes += this.members[i].votes_with_party_pct;
                        } else if (this.members[i].party === 'D') {
                            this.democrats.push(this.members[i]);
                            this.demVotes += this.members[i].votes_with_party_pct;
                        } else {
                            this.independents.push(this.members[i]);
                            this.indVotes += this.members[i].votes_with_party_pct;
                        };
                        this.totVotes = (this.repVotes + this.demVotes + this.indVotes) / this.members.length
                    }
                },
            },
            created: function () {
                this.count()
            },

        });

    }


} // init function end // TEST //


function chapuza() {
    document.getElementById('chap').classList.remove('chapuza');
    document.getElementById('msg1').classList.remove('chapuza');
    document.getElementById('msg2').classList.remove('chapuza');
}