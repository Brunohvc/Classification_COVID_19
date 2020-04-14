import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-input',
  templateUrl: './new-input.component.html',
  styleUrls: ['./new-input.component.scss']
})
export class NewInputComponent implements OnInit {

  constructor() { }

  @Output() add = new EventEmitter();
  @Output() cancel = new EventEmitter();

  addingCondition = false;

  selectedType = 'numeric';
  nameInput = null;
  checkedValue = 'R';
  unCheckedValue = 'G';
  riskTypeSelected = 'G';
  conditionTypeSelected = 'EN';
  conditionValue = null;
  conditionValueMin = null;
  conditionValueMax = null;
  numericConditions = [];

  inputTypes: any =
    [
      { id: 'numeric', name: 'Numérico' },
      { id: 'checkbox', name: 'checkbox' },
      { id: 'comorbidities', name: 'Comorbidades' },
    ];

  riskTypes: any =
    [
      { id: 'G', name: 'Sem Risco' },
      { id: 'Y', name: 'Baixo Risco' },
      { id: 'O', name: 'Alto Risco' },
      { id: 'R', name: 'Altíssimo Risco' },
    ];

  conditionTypes: any =
    [
      { id: 'MA', name: 'Maior' },
      { id: 'ME', name: 'Menor' },
      { id: 'MAI', name: 'Maior ou Igual' },
      { id: 'MEI', name: 'Menor ou Igual' },
      { id: 'EN', name: 'Entre' },
    ];

  ngOnInit(): void {
    console.log(this.selectedType);
  }

  changeValue($event) {
    console.log($event);
  }

  setInput() {
    const input: any = {};

    input.type = this.selectedType;
    input.name = this.nameInput;

    if (this.selectedType === 'numeric') {
      input.conditions = this.numericConditions;
    }

    if (this.selectedType === 'checkbox') {
      input.checked = this.checkedValue;
      input.uncheked = this.unCheckedValue;
    }

    this.add.emit(input);
  }

  cancelInput() {
    this.cancel.emit();
  }

  get checkedValues() {
    const list = [];

    this.riskTypes.forEach(element => {
      if (element.id !== this.unCheckedValue) {
        list.push(element);
      }
    });

    return list;
  }

  get unCheckedValues() {
    const list = [];

    this.riskTypes.forEach(element => {
      if (element.id !== this.checkedValue) {
        list.push(element);
      }
    });

    return list;
  }

  addCondition() {
    this.addingCondition = true;
    this.riskTypeSelected = 'G';
    this.conditionTypeSelected = 'EN';
    this.conditionValue = null;
    this.conditionValueMin = null;
    this.conditionValueMax = null;
  }

  saveCondition() {
    const condition: any = {};
    condition.risk = this.riskTypeSelected;
    condition.type = this.conditionTypeSelected;
    if (this.conditionTypeSelected === 'EN') {
      condition.valueMin = this.conditionValueMin;
      condition.valueMax = this.conditionValueMax;
    } else if (this.conditionTypeSelected === 'MA'
      || this.conditionTypeSelected === 'ME'
      || this.conditionTypeSelected === 'MAI'
      || this.conditionTypeSelected === 'MEI') {
      condition.value = this.conditionValue;
    }

    console.log('add Condition: ', condition);

    this.numericConditions.push(condition);
    this.addingCondition = false;
  }

  cancelCondition() {
    this.addingCondition = false;
  }

  getConditionType(condition) {
    switch (condition.type) {
      case 'MA':
        return `Valor deve ser maior que ${condition.value}`;
      case 'MAI':
        return `Valor deve ser maior ou igual a ${condition.value}`;
      case 'ME':
        return `Valor deve ser menor que ${condition.value}`;
      case 'MEI':
        return `Valor deve ser menor ou igual a ${condition.value}`;
      case 'EN':
        return `Valor deve estar entre ${condition.valueMin} e ${condition.valueMax}`;
    }
  }

  getConditionRisk(risk) {
    switch (risk) {
      case 'G':
        return 'Sem Risco';
      case 'Y':
        return 'Baixo Risco';
      case 'O':
        return 'Alto Risco';
      case 'R':
        return 'Altíssimo Risco';
    }
  }
}
