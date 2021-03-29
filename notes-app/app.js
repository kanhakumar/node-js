// const fs = require('fs');
const os = require('os');
const yargs = require('yargs');

const notes = require('./notes.js');

// fs.appendFile('message.txt', `${os.userInfo().username} is using ${os.version()}! \n`, (err) => {
//   if (err) throw err;
//   console.log('The "data to append" was appended to file!');
// });

// console.log(os.userInfo().username,'is using',os.version());

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

const bodyOptions = {
    describe: 'Description of note',
    demand: true,
    alias: 'b'
}

const argv = yargs
    .command('add', 'add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'show all notes')
    .command('read', 'read a particular note', {
        title: titleOptions
    })
    .command('remove', 'remove a note', {
        title: titleOptions
    })
    .help()
    .argv;
var command = argv._[0];
// console.log('Command: ', command);
// console.log('Yargs',argv);

if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('Note created successfully.');
        notes.logNote(note);
    } else {
        console.log('Note of same title already exists!');
    }
} else if (command === 'list') {
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach(note => notes.logNote(note));
}
else if (command === 'read') {
    var note = notes.getNote(argv.title);
    if (note) {
        console.log('Note found successfully.');
        notes.logNote(note);
    } else {
        console.log('Note not found');
    }
} else if (command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note was removed' : 'Note not found';
    console.log(message);
} else {
    console.log('Command not recognized');
}