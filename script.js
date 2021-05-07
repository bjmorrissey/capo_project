let tuningtype = document.getElementById('tuningtype');
let notes = document.querySelector('.notes');

//Notes array
const notesSharp = [
  'A',
  'A#',
  'B',
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
];
/*const notesFlat = [
  'A',
  'Bb',
  'B',
  'C',
  'Db',
  'D',
  'Eb',
  'E',
  'F',
  'Gb',
  'G',
  'Ab',
];
*/

//Object of various tunings
const tunings = {
  standard: {
    name: 'Standard tuning',
    notes: ['E', 'A', 'D', 'G', 'B', 'E'],
  },
  dadgad: {
    name: 'DADGAD tuning',
    notes: ['D', 'A', 'D', 'G', 'A', 'D'],
  },
  doubleD: {
    name: 'Double D tuning',
    notes: ['D', 'A', 'D', 'G', 'B', 'D'],
  },
  openD: {
    name: 'Open D tuning',
    notes: ['D', 'A', 'D', 'F#', 'A', 'D'],
  },
  openE: {
    name: 'Open E tuning',
    notes: ['E', 'B', 'E', 'G#', 'B', 'E'],
  },
  openG: {
    name: 'Open G tuning',
    notes: ['D', 'G', 'D', 'G', 'B', 'D'],
  },
  openA: {
    name: 'Open A tuning',
    notes: ['E', 'A', 'E', 'A', 'C#', 'E'],
  },
  rainSong: {
    name: 'Rain Song tuning',
    notes: ['D', 'G', 'C', 'G', 'C', 'D'],
  },
  openCsix: {
    name: 'Open C6 tuning',
    notes: ['C', 'A', 'C', 'G', 'C', 'E'],
  },
  openC: {
    name: 'Open C tuning',
    notes: ['C', 'G', 'C', 'G', 'G', 'E'],
  },
};

//Resets notes so they loop in an octave fashion up guitar neck.
function noteLoop(noteIndex) {
  if (noteIndex > 35) {
    noteIndex -= 36;
  }

  if (noteIndex > 23) {
    noteIndex -= 24;
  }

  if (noteIndex > 11) {
    noteIndex -= 12;
  }
  return noteIndex;
}

//Calcs the note changes if a capo were applied to a guitar neck in a certain tuning
function capoChange(capoPlacement, tuning) {
  let capoedNotes = [];
  let tuningName = tuning.name;
  tuning.notes.forEach((note) => {
    let noteIndex = notesSharp.indexOf(note) + capoPlacement;
    noteIndex = noteLoop(noteIndex);
    capoedNotes.push(notesSharp[noteIndex]);
  });
  // return `If you put the capo on fret ${capoPlacement},<br> the notes from <em>lowest to highest</em> are <br>${capoedNotes}<br> in the ${tuningName}.
  // `;
  return capoedNotes;
}

//Maps string notes out to find base notes
function stringMap(note) {
  let stringNotes = [];

  for (i = 0; i < 6; i++) {
    let strNotes = [];
    let root = note.notes[i];
    let rootIndex = notesSharp.indexOf(root);
    let start = noteLoop(rootIndex);
    for (j = 0; j <= 12; j++) {
      let counter = noteLoop(start + j);
      strNotes.push(notesSharp[counter]);
      strNotes.join(' ');
    }
    stringNotes.push(strNotes);
    stringNotes.push('<br>');
  }
  return stringNotes;
}

// /notes.innerHTML = stringMap(tunings.standard);
//console.log(stringMap(tunings.dadgad));

//Maps out all six strings of guitar.
let noteMap = (tuning) =>
  tuning.notes.forEach((note) => {
    console.log(stringMap(note));
  });

let chordProg = ['G', 'C', 'D', 'G'];

function guitarNeckMap(tuning) {
  let str = '';
  for (let i = 0; i < 20; i++) {
    str += noteMap(tuning);
  }
  return str;
}

//Event listener for tuning type

document.querySelector('#tuningtype').addEventListener('click', (e) => {
  console.log(document.querySelector('#tuningtype').value);
});
