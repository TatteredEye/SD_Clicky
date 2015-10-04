var symbols = ["0", "1", "2", "3", "4", "5", "6", "7", "8",
    "9", "a", "b", "c", "d", "e", "f", "g",
    "h", "i", "j", "k", "l", "m", "n", "o",
    "p", "q", "r", "s", "t", "u", "v,", "w",
    "x", "y", "z"
]

var classes = {
    1: {
        "name": "Biology",
        "teacher": "Ms.Smith",
        "pupils": ["Swashbuckler"],
        "lectures": [{
            "time": "MWF 1-2PM",
            "questions": [{
                "question": "How do you get swole?",
                "a": "Be Siraj",
                "b": "Be Joe",
                "c": "Do nothing",
                "d": "Really do nothing",
                "e": "Eat sushi",
                "correct": "b"
            }]
        }]
    }
}
}

var nextClassNumber = 2;

module.exports = {
    createClass: function(name, teacher) {
        classes[nextClassNumber++] = {
            "name": name,
            "teacher": teacher,
            "pupils": [],
            "lectures": {}
        }
    },
    randomGenerator: function(passLength) {

        var classPass = "";

        for (i = 0; i < passLength; i++) {
            classPass += symbols[Math.rand() * 36];
        }

        return classPass;

    },
    classCreate: function(className, classSize, lectureTimes, user, callback) {
        if (user.type != "teacher") {
            var error = new Error("Sorry, only teachers can create classes.");
            return callback(error);
        }
        if (!user.classes) {
            user.classes = {};
        }
        if (!user.classes[className]) {
            var error = new Error("Sorry, a class with this name has already been created.");
            return callback(error);
        }
        if (classSize < 1) {
            var error = new Error("You need at least one student in your class.");
            return callback(error);
        }
        if (lectureNumber < 1) {
            var error = new Error("You need at least one lecture in your class.");
            return callback(error);
        }
        user.classes[className] = {
            "classSize": classSize,
            "lectures": {},
            "lectureTimes": lectureTimes
        };
    },
    addClass: function(className, classSize, lectureTimes, user, callback) {
        if (user.type != "teacher") {
            var error = new Error("Sorry, only teachers can create classes.");
            return callback(error);
        }
        if (!user.classes) {
            user.classes = {};
        }
        if (!user.classes[className]) {
            var error = new Error("Sorry, a class with this name has already been created.");
            return callback(error);
        }
        if (classSize < 1) {
            var error = new Error("You need at least one student in your class.");
            return callback(error);
        }
        if (lectureNumber < 1) {
            var error = new Error("You need at least one lecture in your class.");
            return callback(error);
        }
        user.classes[className] = {
            "classSize": classSize,
            "lectures": {},
            "lectureTimes": lectureTimes
        };


    },
    getClass: function(classID) {
        return classes[classID];
    },
    lectureCreate: function(classID, lectureName, lectureTime) {
        if (!classes[classID]) {
            var error = new Error("Pick one of the classes you've already created");
            return callback(error);
        }
        if (classes[classID].lectures[lectureName]) {
            var error = new Error("You've already created a lecture with that name");
            return callback(error);
        }
        classes[className].lectures[lectureName] = {
            "questions": {},
            "time": lectureTime
        }
    },
    questionAdd: function(user, className, lectureName, questionName, question, a, b, c, d, e, answer) {
        if (!classes[classID]) {
            var error = new Error("Pick one of the classes you've already created");
            return callback(error);
        }
        if (!classes[classID].lectures[lectureName]) {
            var error = new Error("Pick one of the lectures you've already created");
            return callback(error);
        }
        if (classes[classID].lectures[lectureName].questions[questionName]) {
            var error = new Error("You've already created a question with this name");
            return callback(error);
        }
        classes[classID].lectures[lectureName].questions[questionName] = {
            "question": question,
            "a": a,
            "b": b,
            "c": c,
            "d": d,
            "e": e,
            "correct": answer
        };
    }
}
