import { CanEmitEvents } from './EventEmitter.js';
import { Paint } from './Paint.js';


export function start() {
    const canvas = document.querySelector('#canvas');
    const paint = new Paint(canvas);

    let colorButtons = document.querySelectorAll('.color');
    for (let i = 0; i < colorButtons.length; i++) {
        let btn = colorButtons.item(i);
        let color = btn.getAttribute('data-color');
        btn.style.color = color;
        btn.addEventListener('click', e => paint.setColor(color));

        if (color === paint.color) {
            btn.classList.add('active');
        }
    }

    let thicknessButtons = document.querySelectorAll('.thickness');
    for (let i = 0; i < thicknessButtons.length; i++) {
        let btn = thicknessButtons.item(i);
        let thickness = parseInt(btn.getAttribute('data-thickness'), 10);
        let sample = btn.querySelector('i');
        sample.style.width = `${thickness}px`;
        sample.style.height = `${thickness}px`;
        btn.addEventListener('click', e => paint.setThickness(thickness));

        if (thickness === paint.thickness) {
            btn.classList.add('active');
        }
    }

    paint.on('color', (color) => {
        let activeButtons = document.querySelectorAll('.color.active');
        for (let i = 0; i < activeButtons.length; i++) {
            let btn = activeButtons.item(i);
            btn.classList.remove('active');
        }

        let buttons = document.querySelectorAll(`.color[data-color="${color}"]`);
        for (let i = 0; i < buttons.length; i++) {
            let btn = buttons.item(i);
            btn.classList.add('active');
        }
    });

    paint.on('thickness', (thickness) => {
        let activeButtons = document.querySelectorAll('.thickness.active');
        for (let i = 0; i < activeButtons.length; i++) {
            let btn = activeButtons.item(i);
            btn.classList.remove('active');
        }

        let buttons = document.querySelectorAll(`.thickness[data-thickness="${thickness}"]`);
        for (let i = 0; i < buttons.length; i++) {
            let btn = buttons.item(i);
            btn.classList.add('active');
        }
    });

    canvas.addEventListener('mousedown', (e) => {
        let rect = canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        paint.line(x, y, x, y);

        function mousemove(e) {
            let rect = canvas.getBoundingClientRect();
            let x2 = e.clientX - rect.left;
            let y2 = e.clientY - rect.top;
            paint.line(x, y, x2, y2);
            x = x2;
            y = y2;
        }

        function mouseup() {
            document.removeEventListener('mousemove', mousemove);
            document.removeEventListener('mouseup', mouseup);
        }

        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseup);
    });

    document.addEventListener('keydown', function (e) {
        if (e.ctrlKey && e.key === 'z') {
            e.preventDefault();
            paint.undo();
        }

        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            paint.toLocalStorage();
        }

        if (e.ctrlKey && e.key === 'l') {
            e.preventDefault();
            paint.fromLocalStorage();
        }
    });
}
