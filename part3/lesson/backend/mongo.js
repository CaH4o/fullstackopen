require("dotenv").config();
const mongoose = require("mongoose");

/* 
  if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
} */

const url = process.env.MONGODB_URI;

/* 
const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@cluster0.bqsahnp.mongodb.net/noteApp?retryWrites=true&w=majority`;
console.log(url)
*/

mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

/* const note = new Note({
  content: "GET and POST are the most important methods of HTTP protocol",
  important: true,
});

note.save().then((result) => {
  console.log("note saved!", result);
  mongoose.connection.close();
}); */

/* 
Note.find({
  // important: true
}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
 */

Note.findById("6468df4556001ef6d8032571").then((note) => {
  console.log(note);
  mongoose.connection.close();
});
