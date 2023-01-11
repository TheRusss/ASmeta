import { LS, Q } from './QSO_LS.js';

function initVrb() {
	const data = LS.LSget('data');
	const UserOject = LS.LSget('UserOject');
	const SizeRoom = LS.LSget('SizeRoom');
	const size2mC = LS.LSget('size2mC');

	// первая проверка на наличие сохраненных данных, и создание первых записей  в  localStorsge:
	if (!UserOject) {
		const UserOject = {
			adresObject: 'г.Минск ул. Мирная 12',
			dataObject: 'от 02.02.22',
			nameSmeta: 'Предварительная смета',
			toFixe: "2"
		}
		LS.LSset('UserOject', UserOject)
	}

	if (!data) {
		const data = [
			["вид работ 1", ["монтаж...", 10, 1, 1, 10, "примечание"]],
		]
		LS.LSset('data', data);
	}
	if (!size2mC) {
		const size2mC = [
			["работы потолок", ["монтаж...", 1, 2, 3, 6, ""]],
		]
		LS.LSset('size2mC', size2mC);
	}
	if (!SizeRoom) {
		const SizeRoom = {
			"widthRoom": 3,
			"lengthRoom": 4,
			"heightRoom": 3,
			"widthWindow": 2,
			"heighWindow": 1.5,
			"countWindow": 3,
			"widthDoor": 1,
			"heighDoor": 2,
			"countDoors": 5,
			"SquaerMinus": 0,
			"SquaerPlus": 0,
			"btn_sizeRomm": 0
		}
		LS.LSset('SizeRoom', SizeRoom);
	}

	const variablesDOM = {
		// $table: 'table',
		// modal_h3: '.modal_content>h3',
		// $addType: '.addType',
		// $adresOject: '.adres',
		// $dataOject: '.data',
		// $nameSmeta: '.nameSmeta',
		// $headerH1: '.headerH1',
		// $UserObjectRnm: '.UserObjectRnm',
		// $addSizeRomm: '.addSizeRomm',
		// $Romm: '.Romm',
		// btnToggleMistakes: '.toggleMistakes',
		// btnToggleWorkElem: '.toggleWorkElem',
		// btnСlearSquareTD: '.clearSquareTD',
		// btnSizeRommAddStr: '.btn_sizeRomm_add',
		// btnSizeRommDelStr: '.btn_sizeRomm_dlt',
		// $tableHead: '.tableHead',
		// $totalValue_td5: '.totalValue_td5',
		// $btn_sizeRomm_rnm: '#btn_sizeRomm_rnm',
		// modal: '#my_modal',
		// btnModalAdd: '#btn_modal_add',
		// btnModalRnm: '#btn_modal_rnm',
		// span: '.close_modal_window',
	};

	// //завпись переменных в глобальную область и присваивание им значений из поиска по "querySelector"
	// let tempVariables = Object.entries(variablesDOM);
	// for (let i = 0; i < tempVariables.length; i++) {
	// 	window[tempVariables[i][0]] = Q(tempVariables[i][1]);
	// }



	//первая инициализация
	if (!data) {
		location.reload();
	}
};

export default initVrb;