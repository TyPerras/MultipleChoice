const choices = Array.from(document.querySelectorAll('li.radioContainer'));

choices.forEach(choice =>{
	choice.addEventListener('click', e => {

		// This gets the selected <li> object
		// Using e.currentTarget instead of e.target so that we are always working with the <li> items and not the <label> or <input> elements
		const selectedListItem = e.currentTarget;

		// Children of list item as object
		const selectedListItemChildren = selectedListItem.children;
		// label element
		const selectedLabelElement = selectedListItemChildren[0];
		// Input element object
		const selectedInputElement = selectedLabelElement.children;

		// The Event Listener is given to the <li> items, the <label> and the <span> in the list item. If the user happens to click on anything other than the <input> text, we need to manually make their selection for them.
		selectedInputElement[0].checked = true;

		// This gets the ol container
		const selectedList = selectedListItem.parentElement;

		// Gather any classes from WITHIN the selected quiz container. Does nothing if no answers have been selected yet
		const targetQuizGroupCorrect = selectedList.getElementsByClassName("correct");
		const targetQuizGroupIncorrect = selectedList.getElementsByClassName("incorrect");
		const targetFeedbackClasses = selectedList.getElementsByClassName("feedback");

		// console.log("targetFeedbackClasses: " + targetFeedbackClasses.length);

		// If there are questions that have previously been selected WITHIN the target quiz group, remove the correct or incorrect classes
		while (targetQuizGroupCorrect.length) {
			targetQuizGroupCorrect[0].classList.remove("correct");
		}

		while (targetQuizGroupIncorrect.length) {
			targetQuizGroupIncorrect[0].classList.remove("incorrect");
		}

		// Remove feedback text (and icon) from previously selected answers. Does nothing if no answers have been selected yet
		var feedbackLoopIncrNum;
		for (feedbackLoopIncrNum = 0; feedbackLoopIncrNum < targetFeedbackClasses.length; feedbackLoopIncrNum++) {

			if (targetFeedbackClasses[feedbackLoopIncrNum].innerHTML !== '') {
				targetFeedbackClasses[feedbackLoopIncrNum].innerHTML = '';
			}

		}


		// Target the feedback span element associated with the learners click event
 		const feedbackSpan = selectedListItem.querySelector(".feedback");

 		// Get the data from the HTML input "value" attribute. This will be a string of "true" or "false"
 		const selectedChoiceText = selectedListItem.querySelector(".choice-text");

 		const selectedAnswer = selectedChoiceText.value;

		// Add either the 'correct' or 'incorrect' class to the parent element of the selected .choice-text input field (radioContainer)
		// Add a span element containing feedback of "correct" or "incorrect"
		if (selectedAnswer === 'true') {
			
			selectedListItem.classList.add('correct')
			feedbackSpan.innerHTML = '<i class="fas fa-check"></i> Correct';

		} else if (selectedAnswer === 'false') {

			selectedListItem.classList.add('incorrect')
			feedbackSpan.innerHTML = '<i class="fas fa-times"></i> Incorrect';

		}
		
	})
})