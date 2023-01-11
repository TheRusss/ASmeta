// import /modules/QSO_LS.js'  in  ./modules/CreatSctStr.js;

import { CreatSection, CreatStroke } from './modules/CreatSctStr.js';
import { Q, S, LS, formData2 } from './modules/QSO_LS.js';
import initV from './modules/initializationVrb.js';
initV();
import { ard } from './modules/EventsARD.js';

let data = LS.LSget('data');
let UserOject = LS.LSget('UserOject');
// let SizeRoom = LS.LSget('SizeRoom');
// let size2mC = LS.LSget('size2mC');
// formData2(UserOject, 'set');
// запись значений "UserOject" из LS в смету
Q('.adres').textContent = UserOject.adresObject;
Q('.date').textContent = UserOject.dateObject;
Q('.nameSmeta').textContent = UserOject.nameSmeta;
Q('.headerH1').textContent = UserOject.nameSmeta;
//// запись значений "UserOject" из LS в смету
//запись значений "data" из LS в смету
let smetaCloneArr = {};
let glbTotal = 0;
for (let index = 0; index < data.length; index++) {
	let j = new CreatSection(data[index][0]);
	let sctTotal = j.sctTotal;

	//*формируем массив smetaCloneArr (на перспективу)
	index == 0 ? smetaCloneArr["SctLenght"] = data.length : '';
	smetaCloneArr[j.sectionNodeName.innerText] = j;
	////формируем массив smetaCloneArr (на перспективу)

	for (let i = 1; i < data[index].length; i++) {
		let k = new CreatStroke(data[index][i], j.sectionNodeTotal)
		if (k.strokeNull) {
			// console.log('strokeNull: ', k.strokeNull);
		}
		// console.log('strokeNull: ', k.strokeNull);
		sctTotal += +k.total;
		glbTotal += +k.total;
		//*формируем массив smetaCloneArr (на перспективу)
		i == 1 ? smetaCloneArr[j.sectionNodeName.innerText]["StrLenght"] = data[index].length - 1 : '';
		smetaCloneArr[j.sectionNodeName.innerText][k.strokeNodeName.innerText] = k;
		////формируем массив smetaCloneArr (на перспективу)
	}
	j.sectionNodeTotal.querySelector('#sctTotal').textContent = sctTotal.toFixed(LS.LSget('UserOject').toFixe);
}
Q('#globalTotal').textContent = glbTotal.toFixed(LS.LSget('UserOject').toFixe);
////запись значений "data" из LS в смету


document.addEventListener('click', function (event) {
	const target = event.target;


	// ALL event prevent ('data-onclickN')
	if (target.hasAttribute('data-onclickN')) {
		const dataOnclickN = target.getAttribute('data-onclickN');
		switch (dataOnclickN) {
			case "checkMore": ard.more_modal(); break;
		}
	}

	// ALL event preventDefault ('data-onclick')
	if (target.hasAttribute('data-onclick')) {

		let strName = '', nameElem = '', nameElemValue = '', sctNameNode = '', sctName = '';
		if (target.closest('.strName')) {
			strName = target.closest('.strName');
			nameElem = strName.querySelector('.nameElem');
			sctNameNode = target.closest('.sctNameNode');
			sctName = sctNameNode.querySelector('.nameElem').textContent;
			nameElemValue = nameElem.textContent;
		};

		const dataOnclick = target.getAttribute('data-onclick');
		event.preventDefault();
		switch (dataOnclick) {
			case "addSct": ard.addSct(); break;
			case "addStr": ard.addStr(sctName); break;
			case "renameSct": ard.rnmSct(nameElemValue); break;
			case "rnmStr": ard.rnmStr(sctName, nameElemValue); break;
			case "deleteSct": ard.delSct(nameElemValue); break;
			case "delStr": ard.delStr(sctName, nameElemValue); break;
			case "close_modal_window": ard.close_modal_window(); break;
			case "btn_modal_add": ard.btn_modal_add(); break;
			case "btn_modal_rnm": ard.btn_modal_rnm(); break;
			case "toFixe": ard.toFixe(); break;
			case "toggleWorkElem": ard.toggleWorkElem(target); break;
			case "toggleMenu": ard.toggleMenu(); break;
			case "toggleMistakes": ard.toggleMistakes(target); break;
			case "clearSquareTD": ard.clearSquareTD(); break;
			case "UserObjectRnm": ard.UserObjectRnm(); break;
		}
	}
});

// let $vrb = Q('#checkMoreParent');
// $vrb.addEventListener('click', function (event) {
// 	event.stopPropagation();
// 	ard.more();
// 	return false;
// });



