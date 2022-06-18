class QuestionSet {
  constructor(name, quantity, color) {
    this.name = name
    this.quantity = quantity
    this.color = color.map((rbgValue) => int(rbgValue))
  }

  convertToElement() {
    return `
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                ${this.name}
            </th>
            <td class="px-6 py-4">
                ${this.quantity}
            </td>
            <td class="px-6 py-4">
              <div class="w-4 h-4" style="background-color: rgb(${this.color[0]}, ${this.color[1]}, ${this.color[2]})"> </div>
            </td>
        </tr>
    `
  }
}
