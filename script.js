const tuningtype = document.getElementById('tuningtype');
const notes2 = document.querySelector('.notes');
const capoField = document.getElementById('capoPlacement');
const transposeBtn = document.querySelector('.transpose');
const openNotes = document.querySelector('.opennotes');
const chordBtn = document.getElementById('chordbtn');
const chordProg = document.querySelector('.chords');
const guitarNeck = document.getElementById('guitarneck');
const chordExp = document.querySelector('.chordexp')
const capoChart = document.querySelector('.capoChart')
const capoTitle = document.querySelector('.capotitle')
const chart = document.querySelector('.chart')




// const capoSelection = document.querySelectorAll('.capoSelection')
let fretMap = [];
let capoOneRec;
let capoTwoRec;
let capoThreeRec;



//Notes array
const notesRun = [
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



const notesRunFlat = [
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

//Object of various tunings
const tunings = {
  'standard': {
    name: 'standard tuning',
    notes: ['E', 'A', 'D', 'G', 'B', 'E'],
    freq: [82.41, 110, 146.84, 196, 246.96, 329.64]
  },
  dadgad: {
    name: 'DADGAD tuning',
    notes: ['D', 'A', 'D', 'G', 'A', 'D'],
    freq: [73.42, 110, 146.84, 196, 220, 293.67]
  },
  doubleD: {
    name: 'double D tuning',
    notes: ['D', 'A', 'D', 'G', 'B', 'D'],
    freq: [73.42, 110, 146.84, 196, 246.96, 293.67]
  },
  openD: {
    name: 'open D tuning',
    notes: ['D', 'A', 'D', 'F#', 'A', 'D'],
    freq: [73.42, 110, 146.84, 185, 220, 293.67]
  },
  openE: {
    name: 'open E tuning',
    notes: ['E', 'B', 'E', 'G#', 'B', 'E'],
    freq: [82.41, 123.47, 164.81, 207.65, 246.96, 329.64]
  },
  openG: {
    name: 'open G tuning',
    notes: ['D', 'G', 'D', 'G', 'B', 'D'],
    freq: [73.42, 98, 146.84, 196, 246.95, 293.67]
    
  },
  openA: {
    name: 'open A tuning',
    notes: ['E', 'A', 'E', 'A', 'C#', 'E'],
    freq: [82.41, 110, 164.81, 220, 277.18, 329.64]
  },
  rainSong: {
    name: 'Rain Song tuning',
    notes: ['D', 'G', 'C', 'G', 'C', 'D'],
    freq: [73.42, 98, 130.81, 196, 261.63, 293.67]
  },
  openCsix: {
    name: 'open C6 tuning',
    notes: ['C', 'A', 'C', 'G', 'C', 'E'],
    freq: [65.41, 110, 130.81, 196, 261.63, 329.64]
  },
  openC: {
    name: 'open C tuning',
    notes: ['C', 'G', 'C', 'G', 'C', 'E'],
    freq: [65.41, 98, 130.81, 196, 261.63, 329.64]
  },
};
let tuneChoice = tunings.standard;

const keys = {
  Ab: ['Ab', 'Bbm', 'Cm', 'Db', 'Eb', 'Fm', 'Gdim'],
  A: ['A', 'Bm', 'C#m', 'D', 'E', 'F#m', 'G#dim'],
  Bb: ['Bb', 'Cm', 'Dm', 'Eb', 'F', 'Gm', 'Adim'],
  B: ['B', 'C#m', 'D#m', 'E', 'F#', 'G#m', 'A#dim'],
  Cb: ['Cb', 'Dbm', 'Ebm', 'Fb', 'Gb', 'Abm', 'Bbdim'],
  C: ['C', 'Dm', 'Ebm', 'F', 'G', 'Am', 'Bdim'],
  Db: ['Db', 'Ebm', 'Fm', 'Gb', 'Ab', 'Bbm', 'Cdim'],
  D: ['D', 'Em', 'F#m', 'G', 'A', 'Bm', 'C#dim'],
  Eb: ['Eb', 'Fm', 'Gm', 'Ab', 'Bb', 'Cm', 'Ddim'],
  E: ['E', 'F#m', 'G#m', 'A', 'B', 'C#m', 'D#dim'],
  F: ['F', 'Gm', 'Am', 'Bb', 'C', 'Dm', 'Edim'],
  'F#': ['F#', 'G#m', 'A#m', 'B', 'C#', 'D#m', 'Fdim'],
  Gb: ['Gb', 'Abm', 'Bbm', 'Cb', 'Db', 'Ebm', 'Fdim'],
  G: ['G', 'Am', 'Bm', 'C', 'D', 'Em', 'F#dim'],

};

function indexCheck(num) {
  
  if (num > 35) {
    return num - 36;
  }else if (num > 23) {
    return num - 24;
  }else if (num > 11) {
    return num - 12;
  } else {
    return num;
  }
}

//Take array of notes, transpose to new placement on neck
function capoLayout (tuning, placement) {
  
  const transcribedIndex = tuning.notes.map(note => 
    indexCheck(notesRun.indexOf(note)+placement))

  const transcribedNotes = transcribedIndex.map(index => notesRun[index] )
 return transcribedNotes;
}

let frequencies = []
// take array of frequencies, transpose accdly
function freqCalc (freq, placement, i) {
  let mult = 1;
  let st = 0;
  i > 0 ? mult = 1.059463 ** i : 1;
  placement > 0 ? st = 1.059463 ** placement : st = 1; 
  let start = freq.map(fr => +(fr * st).toFixed(2))
  let tempArr = start.map(fr => +(fr * mult).toFixed(2))
  return tempArr;
}  
  
let neck=[]
function neckRun(tuning, placement, fretCount) {
  neck = []
  for (i=0; i<=fretCount; i++) {
    neck.push(capoLayout(tuning, placement+i))
    frequencies.push(freqCalc(tuning.freq, placement, i))
    
  }
 
}

function fretLayout (arr, freq) {
  let fretList = `<ul> ${arr.map((note, i) => `<li class="note-sound" frequency="${freq[i]}">${note}</li>`)}</ul>`.replaceAll(',', '')
 
  return fretList;
  
}

  
function printNeck() {
  let neckMap = neck.map((fret, i) => `<div class="fret fret${i}">${fretLayout(neck[i], frequencies[i])}</div><div class="fretwire"></div>`).join('')
  guitarNeck.innerHTML = neckMap;
  guitarNeck.style.visibility = 'visible';
  const noteSound = document.querySelectorAll('.note-sound')

  noteSound.forEach(note => {
    let frequency = note.attributes.frequency.value
    let counter = 0;
    note.addEventListener('click', (e) => {
      soundPlay(frequency, 'triangle', .5)
      soundPlay(frequency, 'sine', .5)
    })

  })
    
}

function capoExplanation (capoSpot, notes) {
  let end = '';
  let desc = ``;
  if (capoSpot >= 4) {
    end = 'th'
    desc = `If a capo were placed on the ${capoSpot}${end} fret, the notes would be ${notes}.`;
  } else if (capoSpot === 3) {
    end = 'rd'
    desc = `If a capo were placed on the ${capoSpot}${end} fret, the notes would be ${notes}.`;
  } else if (capoSpot === 2) {
    end = 'nd'
    desc = `If a capo were placed on the ${capoSpot}${end} fret, the notes would be ${notes}.`;
  } else if (capoSpot === 1) {
    end = 'st'
    desc = `If a capo were placed on the ${capoSpot}${end} fret, the notes would be ${notes}.`;
  } else {
    desc = `If no capo were used, the notes would be ${notes}.`
   
  }
  desc += `<p> Click below for an audio reference.</p>`
    notes2.innerHTML = desc;
}

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

function keyLookup(chords) {
  
  let keyarr = []
  let keyobj = {};
  let songkey;
  //check chord for in each key, return keys that specific chord is in
  chords.forEach(chord => {
    for (const [songkey, value, i] of Object.entries(keys)) {
      if (value.includes(chord)) {
        keyarr.push(songkey)
      }
    }
  })
  
  for (i = 0; i < keyarr.length; i++) {
    let key = keyarr[i];
    keyobj[key] = keyobj[key] ? keyobj[key] + 1 : 1;
  }
  songkey = (Object.keys(keyobj).reduce((a, b) => { return keyobj[a] > keyobj[b] ? a : b }))
  return songkey
};

function stringRun(stringIndex, scale) {
  let stringNotes = [];
  for (i = stringIndex; i < 12; i++) {
    stringNotes.push(scale[i])
  }
  for (i = 0; i < stringIndex; i++) {
    stringNotes.push(scale[i])
  }
  return stringNotes;
}

function keycheck(key) {
  if (Object.values(key).includes('b')) {
    return notesRunFlat;
  } else {
    return notesRun;
  }
}

//AudioContext testing

let audioContext;

function soundPlay(freq, waveType, gain) {
  try {
    audioContext = new(window.AudioContext || window.webkitAudioContext)();
  } catch (error) {
    window.alert(
      `Sorry, but your browser doesn't support the Web Audio API!`
    );
  }
  
  if (audioContext !== undefined) {
    const osc = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const CT = audioContext.currentTime;
    const noteLength = 3;
    
    // osc2.connect(osc)
    osc.connect(gainNode)
    
    gainNode.connect(audioContext.destination);
    
    
    gainNode.gain.value = gain;
    
    osc.type = waveType;
    osc.frequency.setValueAtTime(freq, CT)
    // osc.detune.exponentialRampToValueAtTime(-100, CT+.25)
    gainNode.gain.exponentialRampToValueAtTime(0.001, CT + noteLength)
  
    osc.start();
    osc.stop(CT + noteLength);
      
  }


}



//Suggests where to put capo based on key 
function capoSuggest(key, chords, scale) {
  

  //find index in notesRun to calc
  const orgIndex = scale.indexOf(key);
  const openStringSix = tunings.standard.notes[0]
  const openStringFive = tunings.standard.notes[1]
  const openStringFour = tunings.standard.notes[2]
  const openStringSixIndex = scale.indexOf(openStringSix)
  const openStringFiveIndex = scale.indexOf(openStringFive)
  const openStringFourIndex = scale.indexOf(openStringFour)
  const sixthStringNotes = stringRun(openStringSixIndex, scale)
  const fifthStringNotes = stringRun(openStringFiveIndex, scale)
  const fourthStringNotes = stringRun(openStringFourIndex, scale)


  if (sixthStringNotes.indexOf(key) < fifthStringNotes.indexOf(key) && sixthStringNotes.indexOf(key) > 0 ) {
    capoOneRec = sixthStringNotes.indexOf(key)
    capoTwoRec = fifthStringNotes.indexOf(key)-5
    capoThreeRec= fifthStringNotes.indexOf(key) - 3
    capoFourRec = fifthStringNotes.indexOf(key)-1
   } else {
    capoOneRec = fifthStringNotes.indexOf(key)
    capoTwoRec = sixthStringNotes.indexOf(key)- 5
    capoThreeRec= sixthStringNotes.indexOf(key) - 3
    capoFourRec = fourthStringNotes.indexOf(key)-2
   }
  
 let newChords = [];
 function chordChange(capo) {
  const chordIndx = chords.map(chord => {
    if (chord.slice(1,2) === '#' || chord.slice(1,2) === 'b') {
      return scale.indexOf(chord.slice(0,2))
    }else {
    return scale.indexOf(chord[0])
    }
  })

  const newChordIndx = chordIndx.map(indx => {
    return indx - capo
  })

  const comboChordIndx = newChordIndx.map(indx => {
    if (indx < 0) {
      return 12 + indx
    } else {
      return indx
    }
  })

  const newChords = chords.map((chord, i) => {
    return notesRun[comboChordIndx[i]]+(chord.slice(1,2) && chord.slice(1,2) !== '#' && chord.slice(1,2) !== 'b' ? chord.slice(1) : '')
  })

  return newChords
  }

let capoObj = {
  [capoOneRec]: chordChange(capoOneRec),
  [capoTwoRec]: chordChange(capoTwoRec),
  [capoThreeRec]: chordChange(capoThreeRec),
  [capoFourRec]: chordChange(capoFourRec)
  }


  
chart.innerHTML = ''
Object.entries(capoObj).forEach(entry => {
  const [key, value] = entry;
  
  if ((key > 0) && !value.includes('G#m')){
    const position = document.createElement('div');
  position.classList.add('capoSelection');
  const chordstruct = value.join(' ').split(' ')
  const chord = chordstruct.map(chord => {
   return `<div class="chord">${chord}</div>`
  })


  position.innerHTML = `<div class="fretnumber">${key}</div><div class="chordchart">${chord.join(' ')}</div>`

  chart.appendChild(position)
  } else {
    console.log('sorry')
  }
 
})
}

function chordValidate(chords) {
  //break up input into array
  let validator = chords.replaceAll(',', '').replaceAll(',','').split(' ')
  let capValidator = [];

  //check array items to remove anything not in notesRun
  validator.forEach(chord => {
    if (chord[0]) {
      if (chord[0] === chord[0].toUpperCase()) {
        capValidator.push(chord)
      } else {
        capValidator.push(chord[0].toUpperCase()+chord.slice(1))
      }
    }
    
  })
  const checkedChords = capValidator.filter(chord => notesRun.includes(chord[0]))

  const completeChords = checkedChords.filter(chord => chord.length === 1 || chord.slice(1).includes('m') || chord.slice(1).includes('dim') || chord.slice(1).includes('7') || chord.slice(1).includes('#') || chord.slice(1).includes('b'))

  let sharpCount = 0;
  let flatCount = 0;

  completeChords.forEach(chord => {
    if (chord.includes('#')) {
      sharpCount++
    } if (chord.includes('b')) {
      flatCount++
    }
  })

  if (sharpCount > 0 && flatCount > 0) {
    return ''
  } else {
    return completeChords;
  }
}




// Transpose Button event listener
transposeBtn.addEventListener('click', (e) => {
  
  let capoSpot = Number(capoField.value);

  if (capoSpot > 12) {
    notes2.innerHTML = 'Please pick a lower spot on the guitar neck.'
    guitarNeck.style.visibility = 'hidden'
    guitarNeck.style.height = '0px';
  } else {
  neckRun(tuneChoice, capoSpot, 5)
  capoExplanation(capoSpot, neck[0])
  printNeck();
  guitarNeck.style.height = ''
  }
  if (frequencies.length > 0) frequencies = [];
  
})

// chordBtn.addEventListener('click', (e) => {
//   let clicked = true;
//   let orgChords = chordProg.value
//   let workingChords = 
//   chordValidate(orgChords)

//   if (clicked) {
//     capoTitle.innerHTML = `<div class="capospot">Place capo here:</div>
//   <div class="chordtitle">Strum the following chords</div>`
  
  
//   try{
//     chordExp.style.visibility = 'visible'
//       let songKey = keyLookup(workingChords)
//       let scale = keycheck(songKey)
//       capoSuggest(songKey, workingChords, scale)
          

//     }catch(err){
      
//       capoTitle.innerHTML = `Sorry, you need to type in a chord, a set of chords, or something musical. Try again! ????????`
//       chart.innerHTML = ''
//     }
//   }
// })