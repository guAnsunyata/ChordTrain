const fs = require('fs');

// songs
var imagine = ['c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7'];
var somewhere_over_the_rainbow = ['c', 'em', 'f', 'g', 'am'];
var tooManyCooks = ['c', 'g', 'f'];
var iWillFollowYouIntoTheDark = ['f', 'dm', 'bb', 'c', 'a', 'bbm'];
var babyOneMoreTime = ['cm', 'g', 'bb', 'eb', 'fm', 'ab'];
var creep = ['g', 'gsus4', 'b', 'bsus4', 'c', 'cmsus4', 'cm6'];
var army = ['ab', 'ebm7', 'dbadd9', 'fm7', 'bbm', 'abmaj7', 'ebm'];
var paperBag = ['bm7', 'e', 'c', 'g', 'b7', 'f', 'em', 'a', 'cmaj7', 'em7', 'a7', 'f7', 'b'];
var toxic = ['cm', 'eb', 'g', 'cdim', 'eb7', 'd7', 'db7', 'ab', 'gmaj7', 'g7'];
var bulletproof = ['d#m', 'g#', 'b', 'f#', 'g#m', 'c#'];
var song_11 = [];

var songs = [] as any;
var labels = [] as any;
var allChords = [] as any;
var labelCounts = [] as any;
var labelProbabilities = [] as any;
var chordCountsInLabels = {} as any;
var probabilityOfChordsInLabels = {} as any;

// # terminology
// category = answer
// attrKey: attr
// categoryAttrCountMap { c1: { a1: 1, a2: 2 }, c2: { ... }}
export class CategoryAttrCountMap {
  private records = [] as any
  private categoryCountMap = {}
  private countMap = {}

  addRecord(attrs, category) {
    // save
    this.records.push([attrs, category])

    // count
    this.categoryCountMap[category] = this.categoryCountMap[category] ? this.categoryCountMap[category] + 1 : 1

    // count
    if (!this.countMap[category]) {
      this.countMap[category] = {}
    }
    attrs.map(attr => {
      this.countMap[category][attr] = this.countMap[category][attr] ? this.countMap[category][attr] + 1 : 1
    })
  }

  getMap() {
    return this.countMap
  }

  getCategoryProbabilityMap() {
    return Object.keys(this.categoryCountMap).reduce((acc, categoryKey) => {
      acc[categoryKey] = this.categoryCountMap[categoryKey] / this.records.length
      return acc
    }, {} as any)
  }

  getProbabilityMap() {
    const categoryKeys = Object.keys(this.categoryCountMap)
    return categoryKeys.reduce((acc, categoryKey) => {
      // category
      const category = this.countMap[categoryKey]
      const attrMap = Object.keys(category)

      // attr
      const probabilityMap = attrMap.reduce((acc, attr) => {
        const attrCount = category[attr]
        acc[attr] = attrCount / this.records.length
        return acc
      }, {} as any)

      acc[categoryKey] = probabilityMap
      return acc
    }, {} as any)
  }

  // records derive -> find categories string map
  // records derive -> find category probability
  // records derive -> find attr probability in given category
  classify(attrs) {
    let categoryProbabilityMap = this.getCategoryProbabilityMap()
    const probabilityMap = this.getProbabilityMap()

    const classified = {}

    Object.keys(this.categoryCountMap).forEach(function(category) {
      let categoryProbability = categoryProbabilityMap[category] + 1.01
      // traverse given chords to calculate probability appearing in different labels
      attrs.forEach(function(attr){
        let attrProbability = probabilityMap[category][attr];

        if(attrProbability){
          categoryProbability = categoryProbability * (attrProbability + 1.01);
        }
      });

      classified[category] = categoryProbability;
    });
  }
}


// # train(attr, category)
// update attrMap
// update categoryCount map

// # category 出現機率
// make categoryProbabilities
// depend on categoryCount[n] / mapSum(categoryCount)

// # 每個 category 下 attr 出現的數量
// make attrCountsInCategories

// # 算出每個 category 下 attr 出現的的機率
// make attrProbabilityInCategories

// # 讀取 attrs - 計算每個 category 出現機率 x attr 在該 category 出現的機率
// traverse all attr & calculate the answer

function train(chords, label) {
  // store original songs and labels
  songs.push([label, chords]);
  labels.push(label);

  // allChords
  // put distinct chords in to allChords.
  for (var i = 0; i < chords.length; i++) {
    if (!allChords.includes(chords[i])) {
      allChords.push(chords[i]);
    }
  }

  // labelCounts
  // accumulate count for each labels.
  if(!!(Object.keys(labelCounts).includes(label))){
    labelCounts[label] = labelCounts[label] + 1;
  } else {
    labelCounts[label] = 1;
  }
};

function getNumberOfSongs(){
  return songs.length;
};

// labelProbabilities
// calculate probabilities of each labels
function setLabelProbabilities(){
  Object.keys(labelCounts).forEach(function(label){
    var numberOfSongs = getNumberOfSongs();
    labelProbabilities[label] = labelCounts[label] / numberOfSongs;
  });
};

function setChordCountsInLabels(){
  songs.forEach(function(song){
    const label = song[0]

    // initiate chordCountsInLabels map with empty object
    let labelChordCountMap = chordCountsInLabels[label]
    if(labelChordCountMap === undefined){
      chordCountsInLabels[label] = {};
    }

    // calculate chordCount for each labels
    // e.g. { easy: { c: 1, cmaj7: 1, ... } }
    const chords = song[1];
    chords.forEach(function(chord){
      let chordCount = chordCountsInLabels[label][chord];
      if(chordCount > 0){
        chordCountsInLabels[label][chord] = chordCount + 1;
      } else {
        chordCountsInLabels[label][chord] = 1;
      }
    })
  })
}


function setProbabilityOfChordsInLabels(){
  // tend to make a structure map taking label as key and value is chord map
  // e.g. { easy: { cmaj7:: 0 }, medium: { ... }, hard: { ... } }
  probabilityOfChordsInLabels = chordCountsInLabels;

  // calculate probability of each chords appearing for each labels
  Object.keys(probabilityOfChordsInLabels).forEach(function (label){
    Object.keys(probabilityOfChordsInLabels[label]).forEach(function (chord) {
      const count = chordCountsInLabels[label][chord]
      probabilityOfChordsInLabels[label][chord] = count / songs.length;
    });
  });
}

train(imagine, 'easy');
train(somewhere_over_the_rainbow, 'easy');
train(tooManyCooks, 'easy');
train(iWillFollowYouIntoTheDark, 'medium');
train(babyOneMoreTime, 'medium');
train(creep, 'medium');
train(paperBag, 'hard');
train(toxic, 'hard');
train(bulletproof, 'hard');

setLabelProbabilities();
setChordCountsInLabels();
setProbabilityOfChordsInLabels();

// attr, probability[label][chord]
export function classify(chords){
  var ttal = labelProbabilities;
  console.log(ttal);
  var classified = {};

  Object.keys(ttal).forEach(function(label) {
    var labelProbability = labelProbabilities[label] + 1.01;

    // traverse given chords to calculate probability appearing in different labels
    chords.forEach(function(chord){
      var probabilityOfChordsInLabel = probabilityOfChordsInLabels[label][chord];

      if(probabilityOfChordsInLabel !== undefined){
        labelProbability = labelProbability * (probabilityOfChordsInLabel + 1.01);
      }
    });
    classified[label] = labelProbability;
  });
  console.log(classified);
};
