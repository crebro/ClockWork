const hoursComponent = document.getElementById('hours-text-input')
const minutesComponent = document.getElementById('minutes-text-input')
const timeConfirmation = document.getElementById('hours-confirmation')
const questionSetView = document.getElementById('question-set-view')

const taskNameComponent = document.getElementById('task-name-text-input')
const taskMarksWeightComponent = document.getElementById(
  'task-marks-weight-text-input',
)
const taskCreationConfirmation = document.getElementById(
  'create-task-confirmation',
)

timeConfirmation.addEventListener('click', () => {
  let minutesValue = parseInt(minutesComponent.value)
  if (minutesValue > 59 || minutesValue < 0) {
    Toastify({
      text: 'Minutes must be between 0 and 59',
      duration: 3000,
      gravity: 'top',
    }).showToast()

    return
  }

  actualHours = parseFloat(hoursComponent.value) + minutesValue / 60
  hours = Math.ceil(actualHours)
  drawClocks()
  print(actualHours, hours)
})

taskCreationConfirmation.addEventListener('click', () => {
  let taskName = taskNameComponent.value
  let taskMarksWeight = taskMarksWeightComponent.value

  if (taskName === '') {
    Toastify({
      text: 'Task name cannot be empty',
      duration: 3000,
      gravity: 'top',
    }).showToast()

    return
  }

  if (taskMarksWeight === '') {
    Toastify({
      text: 'Task marks weight cannot be empty',
      duration: 3000,
      gravity: 'top',
    }).showToast()

    return
  }

  questionSet.push(
    new QuestionSet(taskName, parseInt(taskMarksWeight), [
      random(255),
      random(255),
      random(255),
    ]),
  )

  updateQuestionSetView()
  drawClocks()

  taskNameComponent.value = ''
  taskMarksWeightComponent.value = ''
})

function updateQuestionSetView() {
  let updatedContent = ``
  for (let i = 0; i < questionSet.length; i++) {
    updatedContent += `
      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        ${questionSet[i].convertToElement()}
        <td class="px-6 py-4">
          <div class="text-red-500 cursor-pointer" onclick="deleteQuestion(${i})" > Delete </div>
        </td>
      </tr>
    `
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

function deleteQuestion(index) {
  questionSet.splice(index, 1)
  updateQuestionSetView()
  drawClocks()
}
