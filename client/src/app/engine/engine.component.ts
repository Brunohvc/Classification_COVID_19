import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html',
  styleUrls: ['./engine.component.scss']
})
export class EngineComponent implements OnInit {

  constructor() { }

  engine = [];
  addNewInput = false;

  ngOnInit(): void {
    //this.setDefaultEngine();
  }

  addInput() {
    this.addNewInput = true;
  }

  cancelInput() {
    this.addNewInput = false;
  }

  setInput(input) {
    this.engine.push(input);
    this.addNewInput = false;
  }

  setDefaultEngine() {
    // Values To table: G --> Green == Y --> Yellow == O --> Orange == R --> Red
    this.engine = [
      { type: 'checkbox', name: 'Dispnéia', checked: 'R', uncheked: 'G' },
      { type: 'comorbidities', name: 'Hipertensão Arterial' },
      { type: 'comorbidities', name: 'Diabetes Mellitus' },
      { type: 'comorbidities', name: 'Coronariopatia' },
      { type: 'comorbidities', name: 'Imunossupresssão' },
      { type: 'comorbidities', name: 'Doença Pulmonar Crônica' },
      { type: 'comorbidities', name: 'Gestação' },
      {
        type: 'numeric', name: 'Temperatura',
        conditions: [
          { risk: 'G', type: 'EN', valueMin: 35, valueMax: 37 },
          { risk: 'Y', type: 'ME', value: 35 },
          { risk: 'Y', type: 'EN', valueMin: 37, valueMax: 39 },
          { risk: 'O', type: 'MA', value: 39 }
        ]
      },
      {
        type: 'numeric', name: 'Freq. Cardíaca',
        conditions: [
          { risk: 'G', type: 'MEI', value: 100 },
          { risk: 'Y', type: 'MA', value: 100 },
        ]
      },
      {
        type: 'numeric', name: 'Freq. Respiratória',
        conditions: [
          { risk: 'G', type: 'ME', value: 19 },
          { risk: 'Y', type: 'EN', valueMin: 19, valueMax: 30 },
          { risk: 'R', type: 'MA', value: 30 },
        ]
      },
      {
        type: 'numeric', name: 'PA Sistólica',
        conditions: [
          { risk: 'G', type: 'MA', value: 100 },
          { risk: 'O', type: 'EN', valueMin: 90, valueMax: 100 },
          { risk: 'R', type: 'ME', value: 90 }
        ]
      },
      {
        type: 'numeric', name: 'SaO2',
        conditions: [
          { risk: 'G', type: 'MAI', value: 95 },
          { risk: 'R', type: 'ME', value: 95 }
        ]
      },
      {
        type: 'numeric', name: 'Idade',
        conditions: [
          { risk: 'G', type: 'ME', value: 60 },
          { risk: 'Y', type: 'EN', valueMin: 60, valueMax: 80 },
          { risk: 'O', type: 'MA', value: 80 }
        ]
      },
    ];
  }

}
