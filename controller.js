const hoursComponent = document.getElementById('hours-text-input')
const minutesComponent = document.getElementById('minutes-text-input')
const timeConfirmation = document.getElementById('hours-confirmation')
const questionSetView = document.getElementById('question-set-view')

timeConfirmation.addEventListener('click', () => {
  let minutesValue = minutesComponent.value
  if (minutesValue > 59 || minutesValue < 0) {
    Toastify({
      text: 'Minutes must be between 0 and 59',
      duration: 3000,
      gravity: 'top',
    }).showToast()

    return
  }

  actualHours =
    parseFloat(hoursComponent.value) + parseInt(minutesComponent.value) / 60
  hours = Math.ceil(actualHours)
  drawClocks()
  print(actualHours, hours)
})

function updateQuestionSetView() {
  let updatedContent = ``
  for (let i = 0; i < questionSet.length; i++) {
    updatedContent += questionSet[i].convertToElement()
  }
  questionSetView.innerHTML = updatedContent
}

new Sortable(questionSetView, {
  animation: 150,
  onUpdate: (e) => {
    let newIndex = e.newIndex
    let oldIndex = e.oldIndex
    let temp = questionSet[oldIndex]
    questionSet[oldIndex] = questionSet[newIndex]
    questionSet[newIndex] = temp

    drawClocks()
  },
})