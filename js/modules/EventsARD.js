import { LS, Q, S, formData, formData2, formDataVrb } from './QSO_LS.js';
import { validates } from './validate.js';
let data = LS.LSget('data');

export const ard = {
	// добавить секцию
	addSct() {
		const nameS = [];
		nameS[0] = prompt('Наименование секции', 'вид работ');
		renameSection(nameS[0]);

		function renameSection(promtVel) {
			for (let i = 0; i < data.length; i++) {
				if (data[i][0] == promtVel) {
					let rand = Math.floor(Math.random() * 10);
					formDataVrb.randomNamb = rand;
					nameS[0] = promtVel + rand;
					let promtVel2 = prompt('такое наименование есть!  Заменить на..', nameS[0]);

					if (promtVel2) {
						nameS[0] = promtVel2;
						renameSection(promtVel2);
					}
					return;
				};
			}
			if (typeof nameS[0] == 'number' || typeof nameS[0] == 'string' && nameS[0].length > 0) {
				data.push(nameS);
				LS.LSset('data', data);
				formDataVrb.randomNamb = -1;
				location.reload();
				exit;
			}
		}
	},
	// добавить строку
	addStr(sctName) {
		S('.modal').display = "block";
		Q('[data-onclick=btn_modal_rnm]').dataset.display = 'none';
		Q('[data-onclick=btn_modal_add]').dataset.display = 'block';
		for (let i = 0; i < data.length; i++) {
			if (data[i][0] == sctName) { formDataVrb.sct = i; break; };
		}
		//дальнейшая обработка  по нажатию на  "btn_modal_add"
	},
	// изменить секцию
	rnmSct(nameElemValue = 'вид работ') {
		const question3 = prompt('Наименование секции', nameElemValue);
		if (question3) {
			for (let i = 0; i < data.length; i++) {
				if (data[i][0] == nameElemValue) {
					data[i][0] = question3;
					LS.LSset('data', data)
					location.reload();
					// exit;
					break;
				}
			}
		}
	},
	// изменить строку
	rnmStr(sctName, nameElemValue) {
		S('.modal').display = "block";
		Q('[data-onclick=btn_modal_rnm]').dataset.display = 'block';
		Q('[data-onclick=btn_modal_add]').dataset.display = 'none';
		S('#checkMoreParent').display = 'none';
		for (let i = 0; i < data.length; i++) {
			if (data[i][0] == sctName) {
				for (let j = 1; j < data[i].length; j++) {
					if (data[i][j][0] == nameElemValue) {
						formData(data[i][j]);
						formDataVrb.sct = i;

						formDataVrb.str = j;
						formDataVrb.arrStr = data[i][j];
						break;
					}
				}
			}
		}
		console.log('sctName nameElemValue: ', sctName, '/', nameElemValue);
		//дальнейшая обработка  по нажатию на  "btn_modal_rnm"
	},
	// удалить секцию
	delSct(nameElemValue) {
		const question2 = confirm('Удаляем ВСЮ СЕКЦИЮ?');
		if (question2) {
			for (let i = 0; i < data.length; i++) {
				if (data[i][0] == nameElemValue) {
					data.splice(i, 1);
					LS.LSset('data', data)
					location.reload();
					break;
				}
			}
		}
	},
	// удалить строку
	delStr(sctName, nameElemValue) {
		for (let i = 0; i < data.length; i++) {
			if (data[i][0] == sctName) {
				for (let j = 1; j < data[i].length; j++) {
					if (data[i][j][0] == nameElemValue) {
						data[i].splice(j, 1);
						LS.LSset('data', data)
						console.log('data2:', data[i]);
						location.reload();
						break;
					}
				}
			}
		}
	},

	close_modal_window() {
		document.querySelector('.modal').style.display = "";
		// document.dataset.btn_modal_add
		location.reload();
	},
	btn_modal_add() {
		//проверка коректности данных на соответствие ячейкам, данным
		if (!validates.dataVal(formData())) {
			//проверка2  данных на повторение в LS
			const result = validates.lsValstr(data);
			// в случае отсутсвия совпадений после проверки2:
			if (!result) {
				data[formDataVrb.sct].splice(1, 0, formData());
				LS.LSset('data', data)
				if (document.forms.addStr.elements.checkMore.checked == true) {
					Q('.errAll').textContent = 'Данные добавлены!';
					setTimeout(() => { Q('.errAll').textContent = ''; }, 400);
				} else {
					location.reload(); exit;
				};
				// в случае совпадений после проверки2:
			} else {
				Q('.errAll').textContent = `такое наименование уже существует. Меняем на "${result}" ?`;
			}

		}
	},
	btn_modal_rnm() {
		//проверка коректности данных на соответствие ячейкам, данным
		if (!validates.dataVal(formData())) {
			//если название  остаётся тоже
			if (data[formDataVrb.sct][formDataVrb.str][0] == formData()[0]) {
				data[formDataVrb.sct].splice(formDataVrb.str, 1, formData());
				LS.LSset('data', data)
				location.reload();
				//если название  меняется
			} else {
				//проверка2
				const result = validates.lsValstr(data);
				// в случае отсутсвия совпадений после проверки2:
				if (!result) {
					data[formDataVrb.sct].splice(formDataVrb.str, 1, formData());
					LS.LSset('data', data)
					location.reload();
					exit;
					// в случае совпадений после проверки2:
				} else {
					Q('.errAll').textContent = `такое наименование уже существует. Меняем на "${result}" ?`;
				}
			}
		}
	},
	more_modal() {
		document.forms.addStr.elements.checkMore.checked == true ? S('#checkMoreParent').color = 'red' : S('#checkMoreParent').color = '';
	},
	toFixe() {
		let toFixe = prompt('Введите цифру от 0 до 9', '2')

		if (toFixe) {
			if (validates.fixVal(toFixe)) {
				formDataVrb.toFixed = toFixe;
				let useObj = LS.LSget('UserOject');
				useObj.toFixe = toFixe;
				LS.LSset('UserOject', useObj)
				location.reload(); exit;
			} else {
				alert('МОЖНО ВВОДИТЬ ТОЛЬКО ОДНУ ЦИФРУ ОТ "0" ДО "9"');
			}
		}
	},
	toggleWorkElem(target) {
		if (target.getAttribute('data-boolean') == 'true') {
			this.targetStyle(target, 'true');
			Q('.WorkElem', 'all').forEach(el => el.style.display = 'none');
		} else {
			this.targetStyle(target, 'false');
			Q('.WorkElem', 'all').forEach(el => el.style.display = '');
		}
	},
	toggleMenu() {
		let el = Q('.types');
		el.style.display == 'none' ? el.style.display = '' : el.style.display = 'none';
	},
	toggleMistakes(target) {
		if (target.getAttribute('data-boolean') == 'true') {
			this.targetStyle(target, 'true');
			Q('.mistakesStr', 'all').forEach(el => el.style.display = 'none');
		} else {
			this.targetStyle(target, 'false');
			Q('.mistakesStr', 'all').forEach(el => el.style.display = '');
		}
	},
	clearSquareTD() {

		const promise1 = new Promise((resolve, reject) => {
			let nodes = [];
			Q('.footage', 'all').forEach(el => {
				el.style.backgroundColor = 'rgb(251 30 30 / 38%)';
				nodes.push(el);
			});

			setTimeout(() => {
				let j = confirm('очищаем выделенные колонки');
				j ? resolve([null, j]) : resolve([nodes, j]);
			}, 0);
		});

		promise1.then((result) => {

			console.log('data: ', data);
			if (result[1]) {
				for (let i = 0; i < data.length; i++) {
					for (let j = 1; j < data[i].length; j++) {
						data[i][j][1] = 0;
						data[i][j][5] = '';
					}
				}
				LS.LSset('data', data)
				location.reload(); exit;
			} else {
				result[0].forEach(el => el.style.backgroundColor = '');
			}
		})
	},
	targetStyle(target, bool) {
		if (bool == 'true') {
			target.style.color = 'rgb(250 0 0)';
			target.style.fontWeight = 'bold';
			target.setAttribute('data-boolean', false);
			return;
		}
		target.style.color = '';
		target.style.fontWeight = '';
		target.setAttribute('data-boolean', true);
		return;
	},
	UserObjectRnm() {
		S(".addSrt1").display = "none";
		S(".addSrt2").display = "block";
		S("#my_modal").display = "block";
		Q(".modal_content>h3").textContent = 'Измените данные!';

		const UserOject = LS.LSget('UserOject');
		formData2(UserOject, 'set');

		let btn = Q('#btn_modal_rnm2');
		btn.addEventListener('click', function (event) {
			event.preventDefault();
			let form = formData2(UserOject, 'get');
			LS.LSset('UserOject', form);
			location.reload();
		});
	}
}
