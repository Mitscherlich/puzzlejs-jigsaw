import jigsaw from '../src';

jigsaw.init(
  '#jigsaw',
  () => {
    alert('Puzzle passed!');
  },
  () => {
    alert('Not passwd!');
  }
);
