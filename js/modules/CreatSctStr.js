import { Q, LS } from './QSO_LS.js';

export class CreatStroke {
	constructor(arr, node) {
		let strokeClone = Q('#tBodyStr').content.cloneNode(true);
		this.strokeNodes = strokeClone.querySelectorAll('td');
		let strokeNodeNames = strokeClone.querySelectorAll('td>div');
		this.strokeNodeName = strokeNodeNames[1];
		this.strokeName = arr[0];
		// (arr[1] == 0 || arr[1] == '0') ? this.strokeNull = true : this.strokeNull = false;
		// (this.strokeNull) ? strokeClone.querySelector('tr').classList.add("mistakesStr") : '';
		(arr[1] == 0 || arr[1] == '0' || arr[2] == 0 || arr[2] == '0' || arr[3] == 0 || arr[3] == '0') ? strokeClone.querySelector('tr').classList.add("mistakesStr") : '';
		this.strokeNodes[1].classList.add("footage");
		this.strokeNodes[5].classList.add("footage");
		this.strokeNodeName.textContent = arr[0];
		this.strokeNodes[1].textContent = arr[1];
		this.strokeNodes[2].textContent = arr[2];
		this.strokeNodes[3].textContent = arr[3];
		let total = (+arr[1] * +arr[2] * +arr[3]).toFixed(LS.LSget('UserOject').toFixe);
		this.strokeNodes[4].textContent = this.total = total + '';
		this.strokeNodes[5].textContent = arr[5];
		Q(node).before(strokeClone);
	}
	get SName() {
		return this.strokeNodeName.textContent;
	}
	set SName(newName) {
		this.strokeName = this.strokeNodeName[1].textContent = newName;
	}
}

export class CreatSection {
	constructor(name = 'вид услуг') {
		let sectionClone = Q('#tBodySection').content.cloneNode(true);
		this.sectionNodeName = sectionClone.querySelector('.nameElem');
		this.sectionNodeTotal = sectionClone.querySelector('.total_min_tr');
		this.sctTotal = 0;
		this.sectionNodeName.textContent = name;
		Q(".tableResult").before(sectionClone);
	}
	get SName() {
		return this.sectionNodeName.textContent;
	}
	set SName(newName) {
		this.sectionNodeName.textContent = newName;
	}
}

