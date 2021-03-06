import refQcmChallengeFull from '../challenges/ref-qcm-challenge';
import refQcuChallengeFull from '../challenges/ref-qcu-challenge';
import refQruChallengeFull from '../challenges/ref-qru-challenge';
import refQrocChallengeFull from '../challenges/ref-qroc-challenge';
import refQrocmChallengeFull from '../challenges/ref-qrocm-challenge';
import noFileChallenge from '../challenges/no-file-challenge';
import oneFileChallenge from '../challenges/one-file-challenge';
import multipleFilesChallenge from '../challenges/multiple-files-challenge';

export default {
  data: {
    type: 'courses',
    id: 'ref_course_id',
    attributes: {
      name: 'First Course',
      description: 'Contient toutes sortes d\'epreuves avec différentes caractéristiques couvrant tous les cas d\'usage.',
      duration: 10,
      'image-url': 'http://fakeimg.pl/350x200/?text=First%20Course'
    },
    relationships: {
      challenges: {
        data: [{
          type: 'challenges',
          id: refQcmChallengeFull.data.id
        }, {
          type: 'challenges',
          id: refQcuChallengeFull.data.id
        }, {
          type: 'challenges',
          id: refQruChallengeFull.data.id
        }, {
          type: 'challenges',
          id: refQrocChallengeFull.data.id
        }, {
          type: 'challenges',
          id: refQrocmChallengeFull.data.id
        }, {
          type: 'challenges',
          id: noFileChallenge.data.id
        }, {
          type: 'challenges',
          id: oneFileChallenge.data.id
        }, {
          type: 'challenges',
          id: multipleFilesChallenge.data.id
        }]
      }
    }
  }
};
