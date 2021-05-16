var dps = [];
var xVal = 0;
var happy_count = 0;
var angry_count = 0;
var fear_count = 0;
var disgust_count = 0;
var sad_count = 0;
var surprised_count = 0;
var neutral_count = 0;

var emotion_labels = [
        "angry",
        "disgust",
        "fear",
        "happy",
        "sad",
        "surprise",
        "neutral"
      ];

const video = document.getElementById('video')



Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    // faceapi.draw.drawDetections(canvas, resizedDetections)
    // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)

    detections.forEach((detection) => {

      function pushing(){
        if (detection.expressions.happy >= 0.51) {
          console.log("happy" + happy_count);

           happy_count++;
           dps.push({
            x: xVal,
            y: 100,
          });
        }
       else if (detection.expressions.angry >= 0.51) {
         console.log("angry"+angry_count);
         angry_count++;
         dps.push({
          x: xVal,
          y: -80,
        });

       }
       else if (detection.expressions.disgust >= 0.51) {
         console.log("disgust"+disgust_count);
         disgust_count++;
         dps.push({
          x: xVal,
          y: -60,
        });

       }
       else if (detection.expressions.fearful >= 0.51) {
         console.log("fear"+fear_count);
         fear_count++;
         dps.push({
          x: xVal,
          y: -90,
        });

       }
       else if (detection.expressions.sad >= 0.51) {
         console.log("sad"+sad_count);
         sad_count++;
         dps.push({
          x: xVal,
          y: -100,
        });

       }
       else if (detection.expressions.surprised >= 0.51) {
         console.log("surprised" + surprised_count);
         surprised_count++;
         dps.push({
          x: xVal,
          y: 50,
        });


       }
       else if (detection.expressions.neutral >= 0.51) {
         console.log("neutral" +neutral_count);
      neutral_count++;
      dps.push({
      x: xVal,
      y: 0,
      });
      }
       else  {
         console.log("patani");
       }
      }


pushing();
          });

    // console.log(detections);
// faceapi.return(withFaceExpressions);
// var b = faceapi.isWithFaceExpressions('happy');

 // console.log(b);
  }, 100)
})









// window.onload = function () {
 function chartstart () {
   happy_count = 0;
   angry_count = 0;
   fear_count = 0;
   disgust_count = 0;
   sad_count = 0;
   surprised_count = 0;
   neutral_count = 0;
// var dps = []; // dataPoints
var chart = new CanvasJS.Chart("chartContainer", {
  theme: "dark1",

	data: [{
		type: "line",
		dataPoints: dps
	}]
});

// var xVal = 0;
var yVal = 100;
var updateInterval = 500;
var dataLength = 50; // number of dataPoints visible at any point

var updateChart = function (count) {

	count = count || 1;

	for (var j = 0; j < count; j++) {
    		yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
		// dps.push({
		// 	x: xVal,
		// 	y: yVal
		// });

		xVal++;
	}

	if (dps.length > dataLength) {
		dps.shift();
	}

	chart.render();
};

updateChart(dataLength);
setInterval(function(){updateChart()}, updateInterval);

}




google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

// Draw the chart and set the chart values
function drawChart() {

  var data = google.visualization.arrayToDataTable([
  ['Task', 'damn'],
  ['sad', sad_count],
  ['happy', happy_count],
  ['neutral', neutral_count],
  ['angry', angry_count],
  ['fear', fear_count],
  ['surprised', surprised_count],
  ['disgust', disgust_count]
]);

  // Optional; add a title and set the width and height of the chart
  var options = {'title':'Emotions Analysis', 'width':550, 'height':400};

  // Display the chart inside the <div> element with id="piechart"
  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(data, options);
}


function mylinkfunction(e) {

       window.location.href="#piechart";

       /* need to stop the form sending of the form

        UPDATE as comment: This may not be exactly correct syntax
        for stopping a form , look up preventing form submission */

       e.preventDefault();
       e.stopPropagation();

       }
