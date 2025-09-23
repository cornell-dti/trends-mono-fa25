const trends = {
    code: "INFO1998",
    location: "Upson 206",
    instructors: ["Simon", "Jacqueline", "Chris"],
    "ugly property name": "pretty_result",
    schedule: {
        day: "Monday",
        start_time: "7:30PM",
        end_time: "8:45PM",
    },
    get class_representation() {
        return `${this.location} (${this.schedule.day} ${this.schedule.start_time} - ${this.schedule.end_time})`;
    },
};

console.log(trends);
console.log(trends.code);
console.log(trends["code"]);
console.log(trends["ugly property name"]);
// console.log(trends.class_representation); // we'll see this in the later demo

// trends = {}; // eslint is warning!
