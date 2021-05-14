const tuningtype = document.getElementById('tuningtype');
const notes = document.querySelector('.notes');
const capoField = document.getElementById('capoPlacement');
let capoChoice = 0;
const transposeBtn = document.querySelector('.transpose');
const hidden = document.querySelector('.hidden ');
const openNotes = document.querySelector('.opennotes');
const firstFret = document.querySelector('.fret1');
const secondFret = document.querySelector('.fret2');
const thirdFret = document.querySelector('.fret3');
const fourthFret = document.querySelector('.fret4');
const fifthFret = document.querySelector('.fret5');
let nutNotes = [];
let first = [];
let second = [];
let third = [];
let fourth = [];
let fifth = [];

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
// function capoCalc(capoPlacement, tuning) {
//   let capoedNotes = [];
//   let tuningName = tuning.name;
//   let firstFret = [];


//   tuning.notes.forEach((note) => {
//     let noteIndex = notesSharp.indexOf(note) + capoPlacement;
//     let firstIndex = notesSharp.indexOf(note + 1)
//     noteIndex = noteLoop(noteIndex);
//     firstIndex = noteLoop(firstIndex)
//     capoedNotes.push(notesSharp[noteIndex]);
//     firstFret.push(notesSharp[firstIndex])
//   });



//   let suffix = 'th';
//   if (capoPlacement === 1) {
//     suffix = 'st'
//   } else if (capoPlacement === 2) {
//     suffix = 'nd';
//   } else if (capoPlacement === 3) {
//     suffix = 'rd';
//   }

//   if (capoPlacement > 12) {
//     notes.innerHTML = "Please choose a lower fret. Going above this is crazy and you'll likely have intonation issues brah... 🎸"
//   } else {
//     let statement = '';
//     if (capoPlacement === 0) {
//       statement = `If you had an open guitar neck, `
//     } else {
//       statement = `If you put your capo on the ${capoPlacement}${suffix} fret, `
//     }

//   };
//   //Return an array of notes
//   nutNotes = capoedNotes;
//   return capoedNotes;
//   return firstFret;

// };

function capoCalc(capoPlacement, tuning) {
  let capoedNotes = [];
  let firstFret = [];
  let secondFret = [];
  let thirdFret = [];
  let fourthFret = [];
  let fifthFret = [];


  tuning.notes.forEach((note) => {
    let noteIndex = notesSharp.indexOf(note) + capoPlacement;
    let firstIndex = noteIndex + 1;
    let secondIndex = noteIndex + 2;
    let thirdIndex = noteIndex + 3;
    let fourthIndex = noteIndex + 4;
    let fifthIndex = noteIndex + 5;
    noteIndex = noteLoop(noteIndex);
    firstIndex = noteLoop(firstIndex);
    secondIndex = noteLoop(secondIndex);
    thirdIndex = noteLoop(thirdIndex);
    fourthIndex = noteLoop(fourthIndex);
    fifthIndex = noteLoop(fifthIndex);
    capoedNotes.push(notesSharp[noteIndex]);
    firstFret.push(notesSharp[firstIndex])
    secondFret.push(notesSharp[secondIndex])
    thirdFret.push(notesSharp[thirdIndex])
    fourthFret.push(notesSharp[fourthIndex])
    fifthFret.push(notesSharp[fifthIndex])
  });

  //Return an array of notes
  nutNotes = capoedNotes;
  first = firstFret;
  second = secondFret;
  third = thirdFret;
  fourth = fourthFret;
  fifth = fifthFret;

  // return `${capoedNotes}, ${firstFret}, ${secondFret}, ${thirdFret}, ${fourthFret}, ${fifthFret}`;

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
      statement = `If you had an open guitar neck: `
    } else {
      statement = `If you put a capo on the ${capoPlacement}${suffix} fret:  `
    }
    notes.innerHTML = statement;
  };
}



function noteLayout(notearr) {
  let fretnotes = '';
  notearr.forEach(note => {
    fretnotes += `<li>${note}</li>`;
  });
  return fretnotes;
}

function fretRep() {
  let fret = '<ul>';
  fret += `<li>Hello there</li></ul>`

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
  capoCalc(capoChoice, tuneChoice);
  hidden.classList.remove('hidden');
  openNotes.innerHTML = `<ul>
    ${noteLayout(nutNotes)}
  </ul>`
  firstFret.innerHTML = `<ul>
    ${noteLayout(first)}
  </ul>`
  secondFret.innerHTML = `<ul>
    ${noteLayout(second)}
  </ul>`
  thirdFret.innerHTML = `<ul>
    ${noteLayout(third)}
  </ul>`
  fourthFret.innerHTML = `<ul>
    ${noteLayout(fourth)}
  </ul>`
  fifthFret.innerHTML = `<ul>
    ${noteLayout(fifth)}
  </ul>`
  document.getElementById('guitarneck').style.visibility = 'visible'
});



// console.log(`Notes at nut: ${nutNotes}`)
// console.log(`Notes at first: ${first}`)
// console.log(`Notes at second: ${second}`)
// console.log(`Notes at third: ${third}`)
// console.log(`Notes at fourth: ${fourth}`)
// console.log(`Notes at fifth: ${fifth}`)