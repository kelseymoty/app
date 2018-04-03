<<<<<<< HEAD
import { Component, EventEmitter, Output, Input } from '@angular/core';
=======
import { Component, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
>>>>>>> aadcc9b... in progress - pulling dimensions from native image element
import { STUDIES, ATTENTIONCHECK } from './default-stimuli';
import { Study, Condition, Trial, AttnCheck, Coordinate } from './stimuli';
import { ResponseService } from '../response/response.service';
import { Response } from '../response/response';

@Component({
  selector: 'app-stimuli',
  templateUrl: './stimuli.component.html',
  styleUrls: ['./stimuli.component.css']
})
export class StimuliComponent {
  @Output() numberOfTrialsEvent = new EventEmitter<number>();
<<<<<<< HEAD
  @Input() age: number;
=======
  @Input() age;

  // @ViewChild('thecontainer') imageContainerElement: ElementRef;
  @ViewChild('theimage') imageElement: ElementRef;
>>>>>>> aadcc9b... in progress - pulling dimensions from native image element

  allStudies: Study[] = STUDIES;
  // the single study to be run
  study: Study;
  // the single condition to be run
  condition: Condition;
  // the current trial - this will be updated throughout the session
  trial: Trial;
  attnCheck: AttnCheck;
  attnSound: string = '';

  vid = 0;
  aud = 0;
  pic = 0;
  showPicture = false;
  introEnded = false;
  playAltAudio = false;
  chosenValue = null;
  attnCheckTrial = false;
  firstTrial: Trial;
  responseService: ResponseService;
  response: Response;
  attnAnimalSound = false;
  attnSoundOver = false;
  playSecondAudio = false;
  numberOfTrials = 0;

  // for getCurrentVideo() and getCurrdentAudio()
  currentVideo: string;
  currentAudio: string;
  currentImage: string;
  currentImageCoordinates: Coordinate[];

  // autogenerated participant id - links together their responses
  participant: number = Date.now();

  // initialize: choose the study, condition, and first trial
  constructor(responseService: ResponseService) {
    this.responseService = responseService;
    // precaution - refresh db connection
    this.responseService.getDBConnection();

    this.setStudy();
    this.setCondition();
    this.setTrial();
    this.firstTrial = this.trial;
    if (this.study.id === 3) {
      this.playAltAudio = true;
      console.log(this.playAltAudio);
    }

    if (this.study.id !== 3) {
      this.introEnded = true;
      console.log(this.introEnded);
    }
  }

  // set one study at random from list
  setStudy() {
    if (typeof this.study !== 'undefined') {
      // guard
      return; // study already set- one per session
    }
<<<<<<< HEAD
    this.study = this.allStudies[
      Math.floor(Math.random() * this.allStudies.length)
    ];
    // this.study = this.allStudies[1] //GET RID OF THIS
=======
    this.study = this.allStudies[Math.floor(Math.random() * this.allStudies.length)];
>>>>>>> aadcc9b... in progress - pulling dimensions from native image element
  }

  setCondition() {
    if (typeof this.condition !== 'undefined') {
      return; // condition already set- one per session
    }
<<<<<<< HEAD

    const condition = this.study.conditions[Math.floor(Math.random() * this.study.conditions.length)];
    const conditionCopy = JSON.parse(JSON.stringify(condition));
=======
    const condition = this.study.conditions[Math.floor(Math.random() * this.study.conditions.length)];
    const conditionCopy = JSON.parse(JSON.stringify(condition));

>>>>>>> aadcc9b... in progress - pulling dimensions from native image element
    this.condition = conditionCopy;
  }

  videoEnded(alt) {
    if (alt) {
      this.introEnded = true;
      console.log(
        this.introEnded,
        'if the video ended properly after alt intro'
      );
    }

    const result = this.nextVideo();
    if (!result && !alt) {
      this.showPicture = true;
    }
  }

  // return location of current trial in conditions' list of trials
  getTrialIndexById(id): number {
    let result: number;

    this.study.conditions.forEach(cond => {
      cond.trials.forEach((trial, index) => {
        if (trial.id === id) {
          result = index;
        }
      });
    });

    return result;
  }

  setTrial() {
    const length = this.condition.trials.length;
    this.trial = this.condition.trials[Math.floor(Math.random() * length)];
  }

  nextVideo(): boolean {
    if (this.vid === this.trial.movie.length - 1) {
      return false;
    }

    this.vid++;
    return true;
  }

  getCurrentVideo() {
    console.log('before', this.currentVideo);
    console.log('showPicture', this.showPicture);
    const video = this.trial.movie[this.vid];
    if (video !== this.currentVideo) {
      // keep them in sync
      this.currentVideo = video;
    }
    console.log('after', this.currentVideo);
    return video;
  }

  audioEnded(alt) {
    if (alt) {
      this.playAltAudio = false;
    }
  }

  getCurrentAudio(audioType) {
    console.log(this.study.id);
    let audio = this.trial.sound[this.aud];

    if (audioType === 0) {
      audio = this.trial.sound1[this.aud];
    }

    if (audioType === 2) {
      audio = this.trial.sound[this.aud + 1];
    }

    if (audio !== this.currentAudio) {
      this.currentAudio = audio;
    }

    return audio;
  }

  nextAudio(): boolean {
    if (this.aud === this.trial.sound.length - 1) {
      return false;
    }

    this.aud++;
    return true;
  }

  getCurrentImage() {
    const image = this.trial.picture.picture[this.pic];
    if (image !== this.currentImage) {
      this.currentImage = image;
    }

    return image;
  }

<<<<<<< HEAD
  getCurrentImageCoordinates() {
    const coords = this.trial.picture.coordinate;

    if (coords !== this.currentImageCoordinates) {
      this.currentImageCoordinates = this.trial.picture.coordinate;
=======
  getCurrentImageCoordinates(){
    // if (typeof this.imageElement == 'undefined') {
    //   return;
    // }
    const coords = this.trial.picture.coordinate;

    if (coords != this.currentImageCoordinates) {
      const curCoord = this.trial.picture.coordinate;

      const that = this;
      let timer;
      const p1 = new Promise(
        (resolve, reject) => {
          timer = setInterval(function() {
              if (typeof that.imageElement != null) {
                resolve(timer);
              }
            }, 250);
          // window.setTimeout(function() {
          //   reject();
          // }, 3000);
        }
      );

      p1
        .then(
          function(val) {
            clearInterval(timer);
            const width = that.imageElement.nativeElement.width;
            const nwidth = that.imageElement.nativeElement.naturalWidth;
            const height = that.imageElement.nativeElement.height;
            const nheight = that.imageElement.nativeElement.naturalHeight;
            console.log(width, height, nwidth, nheight);
          })
        .catch(
          reason => {
            console.log('promise rejected: ', reason);
          });

      // const nwidth = this.currentImageElement.nativeElement.nativeWidth;

      // get reference to image of id 'clickimage' here, store in var
      // get scaling factor, and map through curCoord and apply the scaling factor to them
      // store result into this.currentImageCoordinates

      this.currentImageCoordinates = curCoord;
>>>>>>> aadcc9b... in progress - pulling dimensions from native image element
    }

    return coords;
  }

  getAttnAudio() {
    if (this.attnSound !== '') {
      return this.attnSound;
    }

    this.attnSound =
      ATTENTIONCHECK.sound[
        Math.floor(Math.random() * ATTENTIONCHECK.sound.length)
      ];
    console.log(this.attnSound, 'this is the animal sound');
    return this.attnSound;
  }

  attnAudioEnded(attnSoundDone) {
    this.attnAnimalSound = true;

    if (attnSoundDone) {
      this.attnSoundOver = true;
    }
  }

  getCssCoordinates(coords) {
    let res = coords.split(',');
    res = res.map(val => {
      val = val - 80; // todo make the box size set somewhere and use that var
      if (val < 0) {
        val = 0;
      }
      return val + 'px';
    });
    return res;
  }

  blockedCoordinates() {
    if (this.currentImageCoordinates) {
      return this.currentImageCoordinates.filter(value => {
        return value.disabled; // send back only the disabled coordinate areas
      });
    }

    return null;
  }

  nextAttnCheck(value, oneMoreAudio) {
    console.log('nextAttn, received as value: ', value);

    if (!this.response) {
      this.response = new Response();
      this.response.data.participant = this.participant;
      this.response.data.response = [value + 1]; // ngfor indexes by 0
      this.response.data.age = this.age; // todo fill in TODO
      this.response.data.study = this.study.id;
      this.response.data.condition = this.condition.id;
      this.response.data.trial = this.trial.id;
    } else {
      this.response.data.response.push(value + 1);
    }

    this.currentImageCoordinates[value].disabled = true;
    // TODO add rfunctionality so that for only study 2, it logs data for first audio
    if (oneMoreAudio === true && this.study.id === 2) {
      this.playSecondAudio = true;
      console.log(this.playSecondAudio, 'playSecondAudio is set to this');
    } else {
      this.attnCheckTrial = true;
    }
  }

  trialsCompleted() {
    this.numberOfTrials++;
    this.numberOfTrialsEvent.emit(this.numberOfTrials);
  }

  // derived from https://stackoverflow.com/questions/3820381/need-a-basename-function-in-javascript/3820412#3820412
  // (stackoverflow code licensed as MIT)
  basename(str) {
    let base = String(str).substring(str.lastIndexOf('/') + 1);
    if (base.lastIndexOf('.') !== -1) {
      base = base.substring(0, base.lastIndexOf('.'));
    }
    return base;
  }

  // todo split into two functions - juggling too much
  // stores value sent to it by image (click)
  // removes finished trial from list, for next selection
  nextTrial(value) {
    this.trialsCompleted();
    console.log('at beginning of next trial()');
    this.response.data.attnTrial = this.basename(this.getAttnAudio());
    this.response.data.attnResponse = value + 1; // ngfor indexes by 0

    // need to get index of the current trial within the conditions' list
    const index = this.getTrialIndexById(this.trial.id);
    this.condition.trials.splice(index, 1);

    console.log('after getTrialIndexbyID in next trial()');

    this.setTrial();

    console.log('after setTrial() of next trial()');
    this.vid = 0;
    this.aud = 0;
    this.pic = 0;
    this.showPicture = false;
    this.attnCheckTrial = false;
    this.attnAnimalSound = false;
    this.attnSoundOver = false;
    this.playSecondAudio = false;
    this.attnSound = '';

    console.log('after resetting lots of things in next trial()');
    this.responseService.setResponse(this.response);
    this.response = null;

    if (this.study.id === 3) {
      this.playAltAudio = true;
    }

    console.log('at end of next trial()');
    console.log(this.introEnded, 'what introEnded is set at ');
    console.log('showPicture =', this.showPicture);
    console.log('playAltAudio =', this.playAltAudio);
    console.log('trial =', this.trial);
  }
}
