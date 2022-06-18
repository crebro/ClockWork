const canvasHeightInPercent = 60
const controlPanelComponent = document.getElementById('control-panel')
controlPanelComponent.style.height = `${100 - canvasHeightInPercent}vh`

let hours = 2
let actualHours = 1.5

const clockRadius = 150
const clockTextPadding = 25
const clockMargin = 40

let questionSet

function setup() {
  questionSet = [
    new QuestionSet('Question 1', 25, [random(255), random(255), random(255)]),
    new QuestionSet('Question 2', 50, [random(255), random(255), random(255)]),
    // {
    //   name: 'Some Questions',
    //   quantity: 25,
    //   color: [random(255), random(255), random(255)],
    // },
    // {
    //   name: 'Another one',
    //   quantity: 50,
    //   color: [random(255), random(255), random(255)],
    // },
  ]

  updateQuestionSetView()

  background(50)
  createCanvas(windowWidth, (windowHeight * canvasHeightInPercent) / 100)
  drawClocks()
}

function drawClocks() {
  background(50)
  let clockSpace = clockRadius + 40 * 2
  let position = (1 / 2) * (width - clockSpace * hours)

  let totalQuantity = 0
  for (i = 0; i < questionSet.length; i++) {
    totalQuantity += questionSet[i].quantity
  }

  let lastTaskStopDetails = {
    item_id: 0,
    quantity_completion: 0,
    last_color: [random(255), random(255), random(255)],
  }

  let clockMarksAccomodation = (1 / actualHours) * totalQuantity

  for (let j = 0; j < hours; j++) {
    angleSkip = (360 / 12) * (Math.PI / 180)
    currentAngle = -Math.PI / 2 + angleSkip

    const centerX = position
    const centerY = height / 2

    circle(centerX, centerY, clockRadius * 2)

    for (i = 1; i < 13; i++) {
      const xOffset = (clockRadius - clockTextPadding) * Math.cos(currentAngle)
      const yOffset = (clockRadius - clockTextPadding) * Math.sin(currentAngle)

      push()
      fill(0)
      textSize(20)
      text(i, centerX + xOffset - textWidth(i) / 2, centerY + yOffset + 5)
      pop()

      currentAngle += angleSkip
    }

    chartElements = []
    accumQuantity = 0

    for (i = lastTaskStopDetails.item_id; i < questionSet.length; i++) {
      console.log(
        j,
        questionSet[i],
        lastTaskStopDetails,
        clockMarksAccomodation,
        accumQuantity,
      )
      let totalTaskQuantity = questionSet[i].quantity
      if (i == lastTaskStopDetails.item_id) {
        totalTaskQuantity =
          totalTaskQuantity - lastTaskStopDetails.quantity_completion
      }

      if (accumQuantity + totalTaskQuantity > clockMarksAccomodation) {
        chartElements.push({
          quantity: clockMarksAccomodation - accumQuantity,
          color: questionSet[i].color,
        })
        lastTaskStopDetails = {
          item_id: i,
          quantity_completion: clockMarksAccomodation - accumQuantity,
        }
        break
      }

      chartElements.push({
        quantity: totalTaskQuantity,
        color:
          i == lastTaskStopDetails.item_id
            ? questionSet[lastTaskStopDetails.item_id].color
            : questionSet[i].color,
      })

      accumQuantity = accumQuantity + totalTaskQuantity
    }

    if (j + 1 > actualHours) {
      chartElements.push({
        quantity: ( j + 1 - actualHours) * clockMarksAccomodation,
        color: [255, 255, 255],
      })
    }

    print('here is something', chartElements)

    drawPieChart(chartElements, centerX, centerY)

    position = position + clockSpace * 1.5
  }
}

function drawPieChart(data, centerX, centerY) {
  let total = 0
  for (let i = 0; i < data.length; i++) {
    total += data[i].quantity
  }
  let angle = -Math.PI / 2

  for (let i = 0; i < data.length; i++) {
    push()
    fill(...data[i].color)
    let val = data[i].quantity
    let pct = val / total
    arc(centerX, centerY, 200, 200, angle, angle + pct * TWO_PI)
    pop()

    angle += pct * TWO_PI
  }
}
