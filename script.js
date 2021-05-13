let tuningtype = document.getElementById('tuningtype');
let notes = document.querySelector('.notes');


let capoField = document.getElementById('capoPlacement');
let capoChoice = 0;
let transposeBtn = document.querySelector('.transpose');

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

//Object of various tunings
const tunings = {
  standard: {
    name: 'standard tuning',
    notes: ['E', 'A', 'D', 'G', 'B', 'E'],
  },
  dadgad: {
    name: 'DADGAD tuning',
    notes: ['D', 'A', 'D', 'G', 'A', 'D'],
  },
  doubleD: {
    name: 'double D tuning',
    notes: ['D', 'A', 'D', 'G', 'B', 'D'],
  },
  openD: {
    name: 'open D tuning',
    notes: ['D', 'A', 'D', 'F#', 'A', 'D'],
  },
  openE: {
    name: 'open E tuning',
    notes: ['E', 'B', 'E', 'G#', 'B', 'E'],
  },
  openG: {
    name: 'open G tuning',
    notes: ['D', 'G', 'D', 'G', 'B', 'D'],
  },
  openA: {
    name: 'open A tuning',
    notes: ['E', 'A', 'E', 'A', 'C#', 'E'],
  },
  rainSong: {
    name: 'Rain Song tuning',
    notes: ['D', 'G', 'C', 'G', 'C', 'D'],
  },
  openCsix: {
    name: 'open C6 tuning',
    notes: ['C', 'A', 'C', 'G', 'C', 'E'],
  },
  openC: {
    name: 'open C tuning',
    notes: ['C', 'G', 'C', 'G', 'G', 'E'],
  },
};

let tuneChoice = tunings.standard;
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
function capoCalc(capoPlacement, tuning) {
  let capoedNotes = [];
  let tuningName = tuning.name;


  tuning.notes.forEach((note) => {
    let noteIndex = notesSharp.indexOf(note) + capoPlacement;
    noteIndex = noteLoop(noteIndex);
    capoedNotes.push(notesSharp[noteIndex]);
  });

  let suffix = 'th';
  if (capoPlacement === 1) {
    suffix = 'st'
  } else if (capoPlacement === 2) {
    suffix = 'nd';
  } else if (capoPlacement === 3) {
    suffix = 'rd';
  }

  if (capoPlacement > 12) {
    notes.innerHTML = "Please choose a lower fret. Going above this is crazy and you'll likely have intonation issues brah... 🎸"
  } else {
    let statement = '';
    if (capoPlacement === 0) {
      statement = `If you had an open guitar neck, `
    } else {
      statement = `If you put your capo on the ${capoPlacement}${suffix} fret, `
    }

    notes.innerHTML = statement + `the notes from <em>lowest to highest</em> are <br><u>${capoedNotes}</u> in ${tuningName}.`;


  }
  return capoedNotes;
}


//Event listener for tuning type

capoField.addEventListener('change', (e) => {
  capoChoice = Number(capoField.value);

});

tuningtype.addEventListener('click', (e) => {
  tuneChoice = tuningtype.value

  if (tuneChoice === 'openCsix') {
    tuneChoice = tunings.openCsix
  } else if (tuneChoice === 'dadgad') {
    tuneChoice = tunings.dadgad
  } else if (tuneChoice === 'doubleD') {
    tuneChoice = tunings.doubleD
  } else if (tuneChoice === 'openD') {
    tuneChoice = tunings.openD
  } else if (tuneChoice === 'openE') {
    tuneChoice = tunings.openE
  } else if (tuneChoice === 'openG') {
    tuneChoice = tunings.openG
  } else if (tuneChoice === 'openA') {
    tuneChoice = tunings.openA
  } else if (tuneChoice === 'rainSong') {
    tuneChoice = tunings.rainSong
  } else if (tuneChoice === 'openC') {
    tuneChoice = tunings.openC
  } else {
    tuneChoice = tunings.standard
  };
});

transposeBtn.addEventListener('click', (e) => {

  console.log(capoCalc(capoChoice, tuneChoice))

});


//Maps string notes out to find base notes
// function stringMap(note) {
//   let stringNotes = [];

//   for (i = 0; i < 6; i++) {
//     let strNotes = [];
//     let root = note.notes[i];
//     let rootIndex = notesSharp.indexOf(root);
//     let start = noteLoop(rootIndex);
//     for (j = 0; j <= 12; j++) {
//       let counter = noteLoop(start + j);
//       strNotes.push(notesSharp[counter]);
//       strNotes.join(' ');
//     }
//     stringNotes.push(strNotes);
//     stringNotes.push('<br>');
//   }
//   return stringNotes;
// }

// /notes.innerHTML = stringMap(tunings.standard);
//console.log(stringMap(tunings.dadgad));

//Maps out all six strings of guitar.
// let noteMap = (tuning) =>
//   tuning.notes.forEach((note) => {
//     console.log(stringMap(note));
//   });

// function guitarNeckMap(tuning) {
//   let str = '';
//   for (let i = 0; i < 20; i++) {
//     str += noteMap(tuning);
//   }
//   return str;
// }
// 