let ele;
var img;
let button;
let slider;
let nbarray = [];
// 初始內容
function setup() {
  createCanvas(584, 421, WEBGL); // 決定 使用 3D 方式進行渲染
  for(let i=0;i<5;i+=1){
    // 怎麼把東西放到 nbarray 袋子裡面的公式
    nbarray.push(new myBox(50,-height/2+(height/5)*i,0,50));
  }
  button = createButton('說明');
  button.position(235, 510);
  button.mousePressed(changeBG);
  
  slider=createSlider();
  slider.position(250, height+50);
  slider.style('width', '80px');
}

function preload(){
 //載入圖片檔案
 img=loadImage("01.png");
}

function changeBG() {
  let val = random(255);
  background(val);
  window.alert('滑鼠經過行星時會發出音效。');
  window.alert('滑桿調整衛星大小。');
}

function draw() {
  background(0);
  
  imageMode(CENTER);
 //繪製圖片
 image(img,0,0);
  
  // 將袋子中 所有 東西 稱為 V 執行他的相關函式
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  
  nbarray.forEach((v)=>{
    v.display();
  })
  cursor('https://img.onl/TW7BXt');

}
// 自訂一個類別物件
class myBox{
  // 怎樣建構這個物件 只執行一次
  constructor(x,y,z,size){
    this.x=x;
    this.y=y;
    this.z=z;
    this.size=size;
    this.mx = 1;
    this.my = 1;
//    this.mz = 1;
    // 隨機產生物件顏色
    this.cc = color(random(255),0,0);
    // 衛星的中心xyz = 物件，衛星的大小 < 物件， 衛星的距離自訂
    this.stela = new stela(this.x,this.y,this.z,this.size*0.25,this.size);
    this.stela2 = new stela2(this.x,this.y,this.z,this.size*0.25,this.size);
  }
  // 定義一些能力 我們呼叫時 執行 
  // 能力1:顯現這box
  display(){
    push();
      noStroke();
      translate(this.x,this.y,this.z);  
//      this.bb();
      if (mouseX-width/2 > this.x-this.size/2 && 
          mouseX-width/2 < this.x+this.size/2 &&
          mouseY-height/2 > this.y-this.size/2 && 
          mouseY-height/2 < this.y+this.size/2){
        rotateX(frameCount*0.01);
        rotateY(frameCount*0.01);
        this.mx = this.mx+0.5;
        this.my = this.my+0.5;
        this.cc = color(random(255),50,random(255));
        ele = createAudio('ball.mp3');
        ele.autoplay(true);
        }
      this.stela2.display();
      this.stela.display();
      fill(this.cc);
      sphere(this.size);
    pop();
    this.move();
  }
  //能力2:移動規則
  move(){
    if (this.x>width/2){this.mx = -1*this.mx;}
    if (this.x<-width/2){this.mx = -1*this.mx;}  
    if (this.y>height/2){this.my = -1*this.my;}
    if (this.y<-height/2){this.my = -1*this.my;}

    this.x = this.x + this.mx;
    this.y = this.y + this.my;
    
  }
}

/*  bb(){
      if (mouseIsPressed){
    ele.autoplay(true);
      }
}*/

// 衛星
class stela{
  constructor(x,y,z,size,cdx){
    //衛星的旋轉中心
    this.x=x;
    this.y=y;
    this.z=z;
    this.size=size;
    // 衛星距離旋轉中心的x距離
    this.cdx=cdx-50;
    // 隨機產生物件顏色
    this.cc = color(random(255),150,200);
  }
  display(){
    push();
      noStroke();
      rotateZ(frameCount*0.01);
      translate(this.cdx,0,0);  
      fill(this.cc);
      noStroke();
      torus(70, 3);
    pop();
  }
}


class stela2{
  constructor(x,y,z,size,cdx){
    this.x=x;
    this.y=y;
    this.z=z;
    this.size=size-2;
    this.cdx=cdx+40;
    this.cc = color(random(255),150,200);
  }
  display(){
    push();
      noStroke();
      rotateZ(frameCount*0.01);
      translate(this.cdx,0,0);  
      fill(this.cc);
      noStroke();
      sphere(slider.value());
    pop();
  }
}