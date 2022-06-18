class QuestionSet {
  constructor(name, quantity, color) {
    this.name = name
    this.quantity = quantity
    this.color = color.map((rbgValue) => int(rbgValue))
  }

  convertToElement() {
    return `
      <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
          ${this.name}
      </td>
      <td class="px-6 py-4">
          ${this.quantity}
      </td>
      <td class="px-6 py-4">
        <div class="w-4 h-4" style="background-color: rgb(${this.color[0]}, ${this.color[1]}, ${this.color[2]})"> </div>
      </td>
    `
  }
}
