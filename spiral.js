Object.prototype.rad = (deg) => (Math.PI / 180) * deg;
Object.prototype.deg = (rad) => (180 / Math.PI) * rad;
Object.prototype.getAngle = (point1, point2) =>
	Math.atan2(point1.y - point2.y, point1.x - point2.x);
Object.prototype.getDistance = (point1, point2) =>
	Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));

const eleResult = document.querySelector(".result");
const elePath = document.querySelector("#fibo");
const eleSpiral = document.querySelector(".spiral");
const eleCopy = document.querySelector(".copy");
const NS = eleResult.namespaceURI;
let ROTATE = 10;
const fibo = [0, 1];
const pos = 1;
let CX, CY;
let maxValue = -1;
let minValue = Infinity;
let divide = 100;
let ddeg = 10;
let crossLines = [];
function next() {
	fibo.push(fibo[fibo.length - 1] + fibo[fibo.length - 2]);
	return fibo[fibo.length - 1];
}
for (var i = 0; i < 50; i++) {
	const current = next();
	const x = fibo.length;
}

window.addEventListener("click", ({ clientX, clientY }) => {
	eleCopy.innerHTML += eleSpiral.innerHTML;
});
window.addEventListener("dblclick", ({ clientX, clientY }) => {
	eleCopy.innerHTML = eleSpiral.innerHTML;
});
window.addEventListener("mousemove", ({ clientX, clientY }) => {
	document.body.classList.add('moved');
	CX = clientX;
	CY = clientY;
	eleSpiral.innerHTML = "";
	crossLines = [];
	ROTATE = Math.cos(Math.rad(Date.now().toFixed()/200))*40+80;
	ROTATE = Math.abs(ROTATE) < 1 ? 1 : ROTATE;
	for (var i = 0; i < 360; i += ROTATE) {
		addSpiral(i + ddeg, divide, i);
	}
	for (var i = 0; i < fibo.length; i++) {
		const spiral = c(
		"path",
		{ d:crossLines[i]+' Z', fill: "transparent", "stroke-width": "1px" },
		NS
	);
	eleSpiral.appendChild(spiral);
	}
	divide++;
	ddeg += 5;
});

function addSpiral(ddeg = 0, divide, i) {
	let d = "";
	for (var x = 0; x < fibo.length; x++) {
		let y = fibo[x];
		let rad = Math.rad(x * ROTATE + ddeg);
		let xx = (Math.cos(rad) * y) / divide + CX;
		let yy = (Math.sin(rad) * y) / divide + CY;
		if (d === "") {
			d = `M ${xx} ${yy} L `;
		}
		d += `${xx} ${yy} `;
		if (crossLines[x] === undefined) {
			crossLines[x] = `M ${xx} ${yy} L `;
		}
		crossLines[x] += `${xx} ${yy} `;
	}
	const spiral = c(
		"path",
		{ d, fill: "transparent", stroke: "black", "stroke-width": "1px" },
		NS
	);
	eleSpiral.appendChild(spiral);
}

function setMinMax(y) {
	maxValue = Math.min(innerHeight, Math.max(maxValue, y));
	minValue = Math.min(minValue, y);
	//eleResult.setAttribute("viewBox", `0 0 ${fibo.length} ${maxValue}`);
}

function c(tagName, attributes, ns) {
	const ele = ns
		? document.createElementNS(ns, tagName)
		: document.createElement(tagName);
	for (att in attributes) {
		ele.setAttribute(att, attributes[att]);
	}
	return ele;
}
