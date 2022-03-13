const mainScript = [
	"Begin by finding a comfortable position, but one in which you will not fall asleep. Sitting on the floor with your legs crossed is a good position to try.",

	"Close your eyes or focus on one spot in the room.",

	"Roll your shoulders slowly forward and then slowly back.",

	"Lean your head from side to side, lowering your left ear toward your left shoulder, and then your right ear toward your right shoulder.",

	"Relax your muscles.",

	"Your body will continue to relax as you meditate.",

	"Observe your breathing. Notice how your breath flows in and out. Make no effort to change your breathing in any way, simply notice how your body breathes. Your body knows how much air it needs.",

	"Sit quietly, seeing in your mind’s eye your breath flowing gently in and out of your body.",

	"When your attention wanders, as it will, just focus back again on your breathing.",

	"Notice any stray thoughts, but don’t dwell on them. Simply let the thoughts pass.",

	"See how your breath continues to flow...deeply... calmly.",

	"Notice the stages of a complete breath... from the in breath... to the pause that follows... the exhale... and the pause before taking another breath...",
	"See the slight breaks between each breath.",

	"Feel the air entering through your nose...picture the breath flowing through the cavities in your sinuses and then down to your lungs...",

	"As thoughts intrude, allow them to pass, and return your attention to your breathing.",

	"(Pause)",

	"See the air inside your body after you inhale, filling your body gently.",

	"Notice how the space inside your lungs becomes smaller after you exhale and the air leaves your body.",

	"Feel your chest and stomach gently rise and fall with each breath.",

	"Now as you inhale, count silently... one",

	"As you exhale, count...one",

	"Wait for the next breath, and count again... one",

	"Exhale...one",

	"Inhale...one",

	"Exhale...one",

	"Continue to count each inhalation and exhalation as 'one.'",

	"(Pause)",

	"(show counter for 10 breaths)",

	"Notice now how your body feels.",

	"See how calm and gentle your breathing is, and how relaxed your body feels.",

	"Now it is time to gently reawaken your body and mind.",

	"Keeping your eyes closed, notice the sounds around you. Feel the floor beneath you. Feel your clothes against your body.",

	"Wiggle your fingers and toes.",

	"Shrug your shoulders.",

	"Open your eyes, and remain sitting for a few moments longer.",

	"Straighten out your legs, and stretch your arms and legs gently.",

	"Sit for a few moments more, enjoying how relaxed you feel, and experiencing your body reawaken and your mind returning to its usual level of alertness.",

	"Slowly return to a standing position, and continue with the rest of your day, feeling re-energized.",

	"Goodjob!",
];
let index = 0;
let timer = 10;
const changeInstruction = () => {
	if (index == mainScript.length) {
		window.location.replace("/");
	}
	document.querySelector("#main-instruction").innerHTML = mainScript[index++];
};
const changeTimer = () => {
	if (timer == 0) {
		timer = 10;
		changeInstruction();
		window.speechSynthesis.speak(
			new SpeechSynthesisUtterance(
				document.querySelector("#main-instruction").innerHTML
			)
		);
	}
	document.querySelector("#timer").innerHTML = timer--;
};
setInterval(() => {
	changeTimer();
}, 1000);
