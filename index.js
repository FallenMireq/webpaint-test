import { Paint } from './Paint/Paint.js';

export function start() {
    const pictureCanvas = document.querySelector('#picture-canvas');
    const stashCanvas = document.querySelector('#stash-canvas');
    const editorCanvas = document.querySelector('#editor-canvas');
    const paint = new Paint(pictureCanvas, stashCanvas, editorCanvas);
    paint.fromLocalStorage();
    paint.editorLayer.setTool('brush');

    let colorButtons = document.querySelectorAll('.color');
    for (let i = 0; i < colorButtons.length; i++) {
        let btn = colorButtons.item(i);
        let color = btn.getAttribute('data-color');
        btn.style.color = color;
        btn.addEventListener('click', (e) => paint.options.setColor(color));

        if (color === paint.options.color) {
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
        btn.addEventListener('click', (e) =>
            paint.options.setThickness(thickness)
        );

        if (thickness === paint.options.thickness) {
            btn.classList.add('active');
        }
    }

    paint.options.on('color', (color) => {
        let activeButtons = document.querySelectorAll('.color.active');
        for (let i = 0; i < activeButtons.length; i++) {
            let btn = activeButtons.item(i);
            btn.classList.remove('active');
        }

        let buttons = document.querySelectorAll(
            `.color[data-color="${color}"]`
        );
        for (let i = 0; i < buttons.length; i++) {
            let btn = buttons.item(i);
            btn.classList.add('active');
        }
    });

    paint.options.on('thickness', (thickness) => {
        let activeButtons = document.querySelectorAll('.thickness.active');
        for (let i = 0; i < activeButtons.length; i++) {
            let btn = activeButtons.item(i);
            btn.classList.remove('active');
        }

        let buttons = document.querySelectorAll(
            `.thickness[data-thickness="${thickness}"]`
        );
        for (let i = 0; i < buttons.length; i++) {
            let btn = buttons.item(i);
            btn.classList.add('active');
        }
    });

    editorCanvas.addEventListener('mousedown', (e) => {
        let rect = editorCanvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        paint.editorLayer.start(x, y);

        function mousemove(e) {
            let rect = editorCanvas.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;
            paint.editorLayer.move(x, y);
        }

        function mouseup(e) {
            let rect = editorCanvas.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;
            paint.editorLayer.stop(x, y);

            document.removeEventListener('mousemove', mousemove);
            document.removeEventListener('mouseup', mouseup);
        }

        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseup);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'z') {
            e.preventDefault();
            paint.stashLayer.undo();
        }

        if (e.key === 's') {
            e.preventDefault();
            paint.commitStash();
            paint.toLocalStorage();
        }

        if (e.key === 'l') {
            e.preventDefault();
            paint.fromLocalStorage();
            paint.clear();
        }
    });

    window.addEventListener('storage', (e) => {
        if (e.key != 'webpaint.image') {
            return;
        }

        paint.fromLocalStorage();
    });

    document.querySelector('.save-button').addEventListener('click', (e) => {
        e.preventDefault();
        paint.commitStash();
        paint.toLocalStorage();
    });

    document.querySelector('.load-button').addEventListener('click', (e) => {
        e.preventDefault();
        paint.fromLocalStorage();
        paint.clear();
    });

    document.querySelector('.clear-button').addEventListener('click', (e) => {
        e.preventDefault();
        paint.clear();
    });
}
