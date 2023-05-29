require("dotenv").config();
const mongoose = require("mongoose");

const argvl = process.argv.length;
const actions = ["test", "showAll", "showOne", "remove", "create", "update"];

const checkAction = argvl < 3 || !actions.some((a) => a === process.argv[2]);
if (checkAction) {
  console.log(`3rd argument should be "${actions.toString()}"`);
  process.exit(1);
}
const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "'{VALUE}' is shorter than the minimum allowed length (3)"],
    required: [true, "Name is required"],
  },
  number: {
    type: String,
    minLength: [8, "'{VALUE}' is shorter than the minimum allowed length (8)"],
    validate: {
      validator: function (n) {
        return /^\d{2,3}-\d{5,}$/.test(n);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "Number is required"],
  },
});

const Person = mongoose.model("Person", personSchema);
const type = process.argv[2];

//showAll
if (type === actions[0]) {
  Person.aggregate([{ $count: "Person" }])
    .then((result) => {
      console.log(JSON.stringify(result));
    })
    .catch(() => console.log("404"))
    .finally(() => mongoose.connection.close());
} else if (type === actions[1]) {
  Person.find({})
    .then((result) => {
      result.forEach((person) => {
        console.log(person);
      });
    })
    .catch(() => console.log("404"))
    .finally(() => mongoose.connection.close());
} else {
  if (argvl < 4) {
    console.log(`Give 4th argument as a stringify object`);
    process.exit(1);
  }

  let object = {};

  try {
    object = JSON.parse(process.argv[3]);
  } catch (error) {
    console.log(`4th argument is not a stringify object`);
    process.exit(1);
  }

  //showOne
  if (type === actions[2]) {
    if (!("id" in object)) {
      console.log("Add to the object 'id'");
      process.exit(1);
    }

    Person.findById(object.id)
      .then((person) => {
        console.log(JSON.stringify(person));
      })
      .catch(() => console.log("404"))
      .finally(() => mongoose.connection.close());
  }

  //remove
  if (type === actions[3]) {
    if (!("id" in object)) {
      console.log("Add in object 'id'");
      process.exit(1);
    }

    Person.findByIdAndRemove(object.id)
      .then((result) =>
        console.log(`remove ${result?.name} ${result?.number} from phonebook`)
      )
      .catch(() => console.log("404"))
      .finally(() => mongoose.connection.close());
  }

  //create
  if (type === actions[4]) {
    if (!("name" in object) || !("number" in object)) {
      console.log("Add to the object 'name' and/or 'number'");
      process.exit(1);
    }

    const person = new Person({
      name: object.name,
      number: object.number,
    });

    person
      .save()
      .then((result) =>
        console.log(`added ${result?.name} ${result?.number} to phonebook`)
      )
      .catch(() => console.log("404"))
      .finally(() => mongoose.connection.close());
  }

  //update
  if (type === actions[5]) {
    if (!("id" in object) || !("name" in object) || !("number" in object)) {
      console.log("Add to the object 'id', 'name' and/or 'number'");
      process.exit(1);
    }

    const person = {
      name: object.name,
      number: object.number,
    };

    Person.findByIdAndUpdate(object.id, person, { new: true })
      .then((result) =>
        console.log(`updated ${result?.name} ${result?.number} into phonebook`)
      )
      .catch((error) => console.log("404"))
      .finally(() => mongoose.connection.close());
  }
}

//node mongoTest.js test
//node mongoTest.js showAll
//node mongoTest.js showOne '{ \"id\": \"646e38d05857cd8c6a8f6247\" }'
//node mongoTest.js remove '{ \"id\": \"64706409d16fae927eba1d31\" }'
//node mongoTest.js create '{ \"name\": \"Name\", \"number\": \"123-321-123\" }'
//node mongoTest.js update '{ \"id\": \"647066443f6c46da5111a677\", \"name\": \"New\", \"number\": \"000-000-000\" }'
