(function(){

    if (!document.createElement("canvas").getContext) return;

    var app = {

        diableDraw: function(e){
            this.mousedown =  false;
        },

        enableDraw: function(e){
            this.mousedown =  true;
            this.ctx.beginPath();
            this.ctx.moveTo(this.getX(e), this.getY(e));
        },

        drawLines: function(e){
            if (!this.mousedown) return;

            var x = this.getX(e),
                y = this.getY(e);

            this.ctx.lineTo(x,y);
            this.ctx.stroke();
        },

        setupCanvas: function(){
            this.mousedown = false;
            this.canvas.width = this.canvasContainer.offsetWidth;
            this.canvas.height = this.canvasContainer.offsetHeight;
            this.ctx = this.canvas.getContext('2d');
            this.ctx.fillStyle = '#fff';
            this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);

            this.ctx.lineWidth =  this.range.value;
            this.ctx.lineJoin = "round";
            this.ctx.lineCap = "round";
            this.ctx.strokeStyle = this.drawman.querySelector('.active').dataset.color;

            this.canvas.onmousedown = this.enableDraw.bind(this);
            this.canvas.onmouseup = this.diableDraw.bind(this);
            this.canvas.onmousemove = this.drawLines.bind(this);
        },

        changeColor: function(e){
            this.drawman.querySelector('.active').classList.remove('active');
            e.target.classList.add('active');
            this.ctx.strokeStyle = e.target.dataset.color;
        },

        changeSize: function(penSize) {
            this.ctx.lineWidth = penSize;
        },

        getX: function(e) {
            var boundries = this.canvas.getBoundingClientRect();

            if (e.offsetX) {
                return e.offsetX;
            } else if (e.clientX) {
                return e.clientX - boundries.left;
            }
        },

        getY: function(e) {
            var boundries = this.canvas.getBoundingClientRect();

            if (e.offsetY) {
                return e.offsetY;
            } else if (e.clientY) {
                return e.clientY - boundries.top;
            }
        },

        setupSidebar: function(){
            for (var i = 0; i < this.colors.length; i++) {
                this.colors[i].style.backgroundColor = this.colors[i].getAttribute("data-color");
                this.colors[i].onclick = this.changeColor.bind(this);
            }

            this.range.onchange = function(e) {
                this.rangeOutput.innerHTML = e.target.value;
                this.changeSize(e.target.value);
            }.bind(this);

        },

        setupButtons: function(){

            this.clearBtn.onclick = function(){
                this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
            }.bind(this);

            this.saveBtn.onclick = function(){
                var img = new Image();
                img.src = this.canvas.toDataURL("image/png");
                this.drawman.appendChild(img);
            }.bind(this);
        },

        init: function(){

            this.drawman = document.querySelector('#drawman');
            this.canvasContainer = this.drawman.querySelector('.myCanvas');
            this.canvas = this.canvasContainer.querySelector('canvas');
            this.colors = this.drawman.querySelectorAll('.colors div');
            this.range = this.drawman.querySelector("input[type='range']");
            this.rangeOutput = this.drawman.querySelector('output h5 span');
            this.clearBtn = this.drawman.querySelector('#clear');
            this.saveBtn = this.drawman.querySelector('#save');

            this.setupSidebar();
            this.setupCanvas();
            this.setupButtons();

        }

    }

    app.init();

})()
