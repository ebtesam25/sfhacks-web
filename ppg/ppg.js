
async function videoinit() {
    video = document.getElementById('video');
    const stream = await navigator.mediaDevices.getUserMedia({
      'audio': false,
      'video': {
        facingMode: 'user',
        aspectRatio: 1.333,
        width: {ideal: 1280},
      },
    });
    video.srcObject = stream;
    
  
    return new Promise((resolve) => {
      video.onloadedmetadata = () => {
        resolve(video);
      };
    });
  }
  
  
  var curFaces;
  async function getPrediction() {
      const predictedface = await fmesh.estimateFaces(canvas);
      ctx.drawImage(video, 0, 0, canvas.width,  canvas.height);

  
  
      if (predictedface.length > 0) { 
        curFaces = predictedface;
        await drawFaces();
      }
      
      requestAnimationFrame(getPrediction);
  };
  
  
  
  var maxH = 64;
  var blood = Array(maxH).fill(0);
  var timing = Array(maxH).fill(0);
  var last = performance.now();
  var average = (array) => array.reduce((a, b) => a + b) / array.length;
  var argMax = (array) => array.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
  async function drawFaces(){
    console.log('Here')
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    for (face of curFaces){
      if (face.faceInViewConfidence > .90) {
        let mesh = face.scaledMesh;
  
        boxLeft = mesh[117][0];
        boxTop = mesh[117][1];
        boxWidth = mesh[346][0] - boxLeft;
        boxHeight = mesh[164][1] - boxTop;
  
        ctx.beginPath();
        const boxsize = 4;
        ctx.rect(boxLeft-boxsize, boxTop-boxsize, boxWidth+boxsize*2, boxHeight+boxsize*2);
        ctx.stroke();
  
        let bloodBox = ctx.getImageData(boxLeft, boxTop, boxWidth, boxHeight);
  
        videoDataSum = bloodBox.data.reduce((a, b) => a + b, 0);
        videoDataSum -= boxWidth*boxHeight*255;
        avgIntensity = videoDataSum/(boxWidth*boxHeight*3);
  
        timing.push(1/((performance.now() - last)*.001));
        last = performance.now();
  
        blood.push(blood[maxH-1]*.8 + .2*avgIntensity);
        if (blood.length > maxH){
          blood.shift();
          timing.shift();
          
          fourier = await calculateFourier(blood);
          console.log(blood);
          renderChart(timing,fourier);
          renderChartT(blood);
        }
      }
    }
  }
  
  async function calculateFourier(data){
      // Remove offset
      const avg = average(data);
      data = data.map(elem => elem-avg);
  
      tmp = fft.forward(data);
  
      return tmp.slice(1);
  }
  
  
  var heartrate = 0;
  function renderChart(times, data){
    data = data.map(elem => Math.abs(elem));
    curPollFreq = average(times.slice(Math.round(maxH/2)));
    binNumber = Array.from(data).map((elem, index) => index+1);
    binFrequency = binNumber.map(elem => elem*curPollFreq/maxH);
  
    maxV = 0
    maxFreq = 0;
    indMax = 0;
    for (let i = 0; i < binFrequency.length; i++){
      if (binFrequency[i] > .66 && binFrequency[i] < 2){ 
        if (data[i] > maxV){
          maxV = data[i];
          maxFreq = binFrequency[i];
          indMax = i;
        }
      }
    }
  
    heartrate += (maxFreq-heartrate)*.03;
    document.getElementById('pulse').innerHTML = "Predicted pulse rate: " + Math.round(heartrate*60) + " BPM";
  
  
    
    }
  
  function renderChartT(data){
    indexedData = Array.from(data).map((elem, index) => [index+1, elem])
  
    
  }
  
  var canvas;
  var ctx;
  var fft;
  async function main() {
      fmesh = await facemesh.load({maxFaces:1});
  
      await videoinit();
      videoWidth = video.videoWidth;
      videoHeight = video.videoHeight;
      video.play()
      
      canvas = document.getElementById('face');
      canvas.width = videoWidth/2;
      canvas.height = videoHeight/2;
      ctx = canvas.getContext('2d');
  
      fft = new window.kiss.FFTR(maxH);
  
      getPrediction();
  }
  
  
  