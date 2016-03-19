// Chart Data for 3 armies attacking 1 army
// ChartData3v1.js

var dataSpecs = {
  'graphHeight': 3,
  'graphDepth': 3
};

var dataNodes = [
  {'type': 'root', 'att': 3, 'def': 1, 'loc': [0, 3]},
  {'type': 'pw', 'att': 3, 'def': 0, 'loc': [2, 1]},
  {'type': 'pl', 'att': 2, 'def': 1, 'loc': [1, 4]},
  {'type': 'pw', 'att': 2, 'def': 0, 'loc': [2, 3]},
  {'type': 'pl', 'att': 1, 'def': 1, 'loc': [2, 5]}
];

var dataLines = [
  {'end0': [0, 3], 'end1': [2, 1], 'type': 'pw', 'probsStr': '0.579'},
  {'end0': [0, 3], 'end1': [1, 4], 'type': 'pl', 'probsStr': '0.421'},
  {'end0': [1, 4], 'end1': [2, 3], 'type': 'pw', 'probsStr': '0.417'},
  {'end0': [1, 4], 'end1': [2, 5], 'type': 'pl', 'probsStr': '0.583'}
];
