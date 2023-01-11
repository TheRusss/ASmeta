
//######### Работа с DOM елементами
//l = Q(".class") ; Q('tag', 'All') ; Q('name', 'id')
export function Q(i, j = false) {
	if (j) {
		j = j.toLowerCase();
	}
	switch (j) {
		case j = 'id':
			return typeof i == 'object' ? i : document.getElementById(i);
			break;
		case j = 'all':
			return typeof i == 'object' ? i : document.querySelectorAll(i);
			break;
		default:
			return typeof i == 'object' ? i : document.querySelector(i);
			break;
	}
}
//S(".class").color = 'green'; S(".class", all).color = 'green' /=== ERROR;
export function S(i, j = false) {
	return Q(i, j).style;
}
//######### Работа с DOM елементами
//######### Работа с LocalStorage елементами
export const LS = {
	LSget(data) {//string
		return JSON.parse(localStorage.getItem(data));
	},
	LSset(data, data2) {//string,object
		localStorage.setItem(data, JSON.stringify(data2));
		return;
		// return this.LSget(data);
	}
}
//######### Работа с LocalStorage елементами

//*ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
//преобразовывает данные формы в массив
export function formData(str = false) {
	const form = document.forms.addStr;
	//получение данных из формы "addStr"
	if (!str) {
		const name = form.elements.name.value;
		const square = form.elements.square.value;
		const quantity = form.elements.quantity.value;
		const rate = form.elements.rate.value;
		const total = (+square * +quantity * +rate).toFixed(3) + '';
		const description = form.elements.description.value;
		const arr = [name, square, quantity, rate, total, description];
		return arr;
	}
	//вставка данных в форму
	if (str) {
		const name = form.elements.name.value = str[0];
		const square = form.elements.square.value = str[1];
		const quantity = form.elements.quantity.value = str[2];
		const rate = form.elements.rate.value = str[3];
		const total = (+square * +quantity * +rate).toFixed(3) + '';
		const description = form.elements.description.value = str[5];
		const arr = [name, square, quantity, rate, total, description];
		return arr;
	}
};
//преобразовывает данные формы "addStr2" в массив
export function formData2(data, atr = 'get') {
	const form = document.forms.addStr2;
	//получение данных из формы 
	if (atr == 'get') {
		data.adresObject = form.elements.adresObject.value;
		data.dateObject = form.elements.dateObject.value;
		data.nameSmeta = form.elements.smetaNameObject.value;
		return data;
	}
	//вставка данных в форму
	if (atr == 'set') {
		data.adresObject = form.elements.adresObject.value = data.adresObject;
		data.dateObject = form.elements.dateObject.value = data.dateObject;
		data.nameSmeta = form.elements.smetaNameObject.value = data.nameSmeta;
		return data;
	}
};
//переменные для вставки данных  из формы в хранилище
export const formDataVrb = {
	sct: '',
	str: '',
	arrStr: [],
	toFixed: 3,
	randomNamb: 0,
};