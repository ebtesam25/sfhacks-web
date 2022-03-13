const initializeVideo = async () => {
	const video = document.querySelector("#videofeed");
	await navigator.mediaDevices.getUserMedia({ video: true });
	const devices = await navigator.mediaDevices.enumerateDevices();
	const videoDevices = devices.filter((device) => device.kind === "videoinput");
	const deviceid = videoDevices[0].deviceId;
	const stream = await navigator.mediaDevices.getUserMedia({
		video: {
			autoGainControl: true,
			deviceId: deviceid,
			facingMode: "user",
			width: { exact: 640 },
			height: { exact: 360 },
			frameRate: { exact: 30 },
			sampleRate: { exact: 36000 },
			sampleSize: { exact: 16 },
		},
		peerIdentity: deviceid,
		preferCurrentTab: true,
	});
	//Stream can be piped
	video.srcObject = stream;
};

const actionArray = ["Rest", "Sit", "Stand", "Walk", "Run", "Crawl", "Jump"];
const messageArray = [
	"You are not in a panic state.",
	"You are in a panic state.",
	"You are in a depressed state.",
	"You are in a happy state.",
	"You are in a neutral state.",
	"You are in a calm state.",
];
const resultArray = ["Panic", "Anxiety", "Stress", "Happy", "Sad", "Griefing"];

const setheartrate = (number) => {
	document.querySelector("#heartrate-value").innerHTML = number;
};
const setAction = (action) => {
	document.querySelector("#action-value").innerHTML = action;
};
const setmessage = (result) => {
	document.querySelector("#messages").innerHTML = result;
};
const setresult = (result) => {
	document.querySelector("#result-value").innerHTML = result;
};
setInterval(() => {
	setheartrate(Math.floor(Math.random() * (120 - 60 + 1)) + 60);
	setAction(actionArray[Math.floor(Math.random() * actionArray.length)]);
	setmessage(messageArray[Math.floor(Math.random() * messageArray.length)]);
	setresult(resultArray[Math.floor(Math.random() * resultArray.length)]);
}, 1000);

window.onload = initializeVideo;
