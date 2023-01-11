import { Q, formData, formDataVrb } from './QSO_LS.js';
export const validates = {
	dataVal(arr) {
		// arr = formData();
		arr = arr.map(item => item.trim());
		// arr = this.trim_v(arr);
		let arrErr = {};
		// проверка на пустые значения
		if (arr[0] == '' || arr[1] == '' || arr[2] == '' || arr[3] == '') {
			arrErr.errAll = '(Не все поля заполнены)';
		}

		// проверка числовых элементов "arr"(arr[ ,1,2,3, , ]) на число, замена в них "," на ".", по несоответствию заполнение массива "arrErr".
		for (let i = 1; i < 4; i++) {
			let q = 'quantity' + i;
			arr[i] = arr[i].replace(/,/g, '.');
			!isFinite(arr[i]) ? arrErr[q] = '(Только цифры)' : '';
		}

		// //проверка  5го элемента "arr" (arr[,,,,,5])(комментария)
		// if (arr[5].length > 0) {
		// 	console.log('arr[5]: ', typeof arr[5], arr[5]);
		// 	// exit;
		// }

		//пересчет значений на случай присутствия запятых в первом подсчете с результатом "NaN" в total
		formData(arr);
		arr = formData();

		// вывод ошибок. При  их отсутствии очищаем экран от прошлых ошибок.
		if (Object.entries(arrErr).length !== 0) {
			arrErr = this.no_v(arrErr);
		} else {
			Q('.err', 'all').forEach(element => element.textContent = '');
		}
		return Object.entries(arrErr).length === 0 ? false : true;
	},
	no_v(arrErr) {
		//вывод ошибок на экран.
		Q('.errAll').textContent = arrErr.errAll;
		Q('.errName').textContent = arrErr.errName;
		Q('.errQuantity1').textContent = arrErr.quantity1;
		Q('.errQuantity2').textContent = arrErr.quantity2;
		Q('.errQuantity3').textContent = arrErr.quantity3;
		Q('.errDescription').textContent = arrErr.description;
		return arrErr;
	},
	lsValstr(data) {
		let dataForm = formData();
		//проверка на совпадения
		for (let i = 1; i < data[formDataVrb.sct].length; i++) {
			if (data[formDataVrb.sct][i][0] == dataForm[0]) {
				// если все последующие сопадения кроме первого
				if (!formDataVrb.randomNamb > 0) {
					// если первое сопадение
					let rand = Math.floor(Math.random() * 1000);
					dataForm[0] = dataForm[0] + rand;
					formData(dataForm);
					formDataVrb.randomNamb = rand;
					return dataForm[0];
				} else {
					if (!dataForm[0].includes(formDataVrb.randomNamb)) {
						//если рандомное число есть,но оно ещё не в имени формы
						formDataVrb.randomNamb++;
						dataForm[0] = dataForm[0] + formDataVrb.randomNamb;
						formData(dataForm);
						return dataForm[0];
					} else {
						//если рандомное число уже записано в форму и склеено с именем
						let temp = dataForm[0].lastIndexOf(formDataVrb.randomNamb);
						let temp2 = dataForm[0].slice(0, temp);
						formDataVrb.randomNamb++;
						dataForm[0] = temp2 + formDataVrb.randomNamb;
						formData(dataForm);
						return dataForm[0];
					};
				};
			}
		}
		return false;
	},
	lsValsct(name, data) {
		// let coincidence = data.includes(name);
		// console.log('coincidence: ', coincidence);

		// //если совпадений нет - вернуть "name"
		// if (!coincidence) {
		// 	return name;
		// 	//если совпадения есть ... 
		// } else {
		// 	// первое совпадение ..name+1 formDataVrb.randomNamb
		// 	if (name.slice(name.length - 1) !== formDataVrb.randomNamb) {
		// 		let rand = formDataVrb.randomNamb = Math.floor(Math.random() * 10);
		// 		console.log('name+rand: ', name + rand);
		// 		return name + rand;
		// 	} else {
		// 		//все последующие совпадения name(-$) + formDataVrb.randomNamb++
		// 		console.log('rand: ', rand);
		// 		console.log('formDataVrb.randomNamb: ', formDataVrb.randomNamb);
		// 		console.log('name.length - 2: ', name.slice(name.length - 1));
		// 		console.log('222name.length - 2: ', name.slice(name.length - 1));
		// 	}
		// }
	},
	fixVal(data) {
		//если только одна цифра
		if (/\b\d{1}\b/.test(+data)) {
			return true;
		}
		return false;
	}
}

