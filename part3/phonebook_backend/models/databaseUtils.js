const Entry = require("./entry.js");

const persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const addEntries = () => {
  return new Promise((resolve) => {
    for (const person of persons) {
      const personEntry = new Entry({
        id: person.id,
        name: person.name,
        number: person.number,
      });
      console.log(`Adding ${person.name}...`);
      personEntry.save().then((r) => console.log(`Added ${r}`));
    }
    resolve("All saves complete");
  });
};

const main = () => {
  Entry.deleteMany({}, () => {
    console.log("Dropping all documents in Entry collection...");
    console.log("Delete complete!");
    addEntries().then((r) => {
      console.log(r);
    });
  });
};

main();
