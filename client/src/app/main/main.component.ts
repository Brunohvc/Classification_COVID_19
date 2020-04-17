import { Component, OnInit } from '@angular/core';
import { StorageFunctions } from '../utils/storage';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private storage: StorageFunctions) { }
  engine = [];
  engineComorbidities = [];
  engineInputs = [];
  score = 0;

  colorPoncutuations = { G: 0, Y: 1, O: 2, R: 3 };

  ngOnInit(): void {
    const storageEngine = this.storage.getEngine();
    if (storageEngine && storageEngine.length > 0) {
      this.engine = storageEngine;
      storageEngine.forEach((element, index) => {
        element.engineIndex = index;
        if (element.type === 'comorbidities') {
          this.engineComorbidities.push(element);
        } else {
          this.engineInputs.push(element);
        }
      });
    }
  }

  calcPoints() {
    let comorbidities = 0;
    let newScore = 0;
    this.engine.forEach((element, index) => {
      switch (element.type) {
        case 'numeric':
          if (element.value) {
            newScore += this.getPontuation(this.getColorNumericInput(element));
          }
          break;
        case 'checkbox':
          if (element.value) {
            newScore += this.getPontuation(element.checked);
          } else {
            newScore += this.getPontuation(element.uncheked);
          }
          break;
        case 'comorbidities':
          if (element.value) {
            comorbidities++;
          }
          break;
      }
    });

    if (comorbidities === 1) {
      newScore += 1;
    }
    if (comorbidities >= 2) {
      newScore += 2;
    }

    this.score = newScore / (this.engineInputs.length + 1);
  }

  getPontuation(color) {
    return this.colorPoncutuations[color];
  }

  getColorNumericInput(engineInput) {
    let color = 'G';

    engineInput.conditions.some((element, index) => {
      let find = false;

      switch (element.type) {
        case 'EN':
          if (engineInput.value >= element.valueMin && engineInput.value <= element.valueMax) {
            color = element.risk;
            find = true;
          }
          break;
        case 'MA':
          if (engineInput.value > element.value) {
            color = element.risk;
            find = true;
          }
          break;
        case 'MAI':
          if (engineInput.value >= element.value) {
            color = element.risk;
            find = true;
          }
          break;
        case 'ME':
          if (engineInput.value < element.value) {
            color = element.risk;
            find = true;
          }
          break;
        case 'MEI':
          if (engineInput.value <= element.value) {
            color = element.risk;
            find = true;
          }
          break;
      }

      return find === true;
    });

    return color;
  }

  getTextPerScore(score) {

    if (score >= 1.25) {
      return 'Você deve ir a um Hospital imediatamente!';
    }

    if (score > 0.5) {
      return 'Você deve ficar em casa, em observação por 14 dias!';
    }

    if (score > 0.25) {
      return 'Fique atento a sua saúde!';
    }

    return 'Pode seguir sua rotina caso esteja se sentindo bem!';
  }

  getClassTextPerScore(score) {
    if (score >= 1.25) {
      return 'redText';
    }

    if (score > 0.5) {
      return 'orangeText';
    }

    if (score > 0.25) {
      return 'yellowText';
    }

    return 'greenText';
  }
}
