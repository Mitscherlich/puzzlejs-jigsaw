import jigsaw from 'puzzlejs-jigsaw';
import 'puzzlejs-jigsaw/dist/jigsaw.css';

jigsaw.init(
  '#jigsaw',
  () => {
    alert('Puzzle passed!');
  },
  () => {
    alert('Not passwd!');
  }
);
