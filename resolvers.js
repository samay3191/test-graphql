const db = require('./db');

const Query = {
    //resolver function with no parameter, returns string
    greeting:() => {
        return "Hello world from test graphQL application by Samay !!!";
    },
    
    //resolver function with no parameter, returns list
    students:() => db.students.list(),

    //resolver funciton with arguments, returns object
    studentById:(root, args, context, info) => {
        return db.students.get(args.id);
    },

    setFavouriteColor:(root, args) => {
        return `Your favourite color is ${args.color}`;
    },

    sayHello:(root,args,context,info) =>  `Hi ${args.name} GraphQL server says Hello to you!!`
};

//for each single student object returned,resolver is invoked

const Student = {
    fullName:(root, args, context, info) => {
       return root.firstName+":"+root.lastName
    },
    college:(root) => {
        return db.colleges.get(root.collegeId);
    }
};

const Mutation = {
    createStudent:(root, args, context, info) => {
        return db.students.create({
            collegeId:args.collegeId,
            firstName:args.firstName,
            lastName:args.lastName
        });
    },
    addStudent:(root, args, context, info) => {
        const newStudentId = db.students.create({
            collegeId:args.collegeId,
            firstName:args.firstName,
            lastName:args.lastName
        });
        return db.students.get(newStudentId);
    },
    signUp:(root, args, context, info) => {
        const { email, password, userName } = args.input;
        
        const emailExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const isValidEmail =  emailExpression.test(String(email).toLowerCase());

        if(!isValidEmail)
        throw new Error("email not in proper format")

        if(userName.length > 15)
        throw new Error("userName should be less than 15 characters")

        if(password.length < 8 )
        throw new Error("password should be minimum 8 characters")
        
        return "success";
    }
};

module.exports = { Query, Student, Mutation };