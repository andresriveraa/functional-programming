const compose = (...functions) => data => functions.reduceRight((value, func) => func(value), data)


const attrsToString = (obj = {}) => {
  const keys = Object.keys(obj)
  const attrs = []
  
  for (const key of keys) {
    attrs.push(`${key}='${obj[key]}'`)
  }
  
  const string = attrs.join('')
  return string
}

const tagAttrs = obj => (content = '') => `
  <${obj.tag}${obj.attrs ? '': ''} ${attrsToString(obj.attrs)}
  >
  ${content}
  </${obj.tag}>
  ` 
  // const tag = t => content => `<${t}>${content}</${t}>`
  
const tag = t => {
  if(typeof t === 'string') return tagAttrs({tag: t})
  return tagAttrs(t)
}

const tableRowTag = tag('tr')
// const tableRow = items => tableRowTag(tableCells(items))
const tableRow = items => compose(tableRowTag, tableCells)(items)

const tableCell = tag('td')
const tableCells = items => items.map(tableCell).join()
let description = $description,
carbs = $carbs,
calories = $calories,
protein = $protein;

let list = []

const validateInputs = () => {
  if (description.value 
    && carbs.value 
    && calories.value 
    && protein.value
  ) {
    add()
    console.log(list);
  } else {
    description.value ? '' : description.classList.add('is-invalid')
    carbs.value ? '' : carbs.classList.add('is-invalid')
    calories.value ? '' : calories.classList.add('is-invalid')
    protein.value ? '' : protein.classList.add('is-invalid') 
  }
}
  
const quitClass = () => {
  description.classList.remove('is-invalid')
  carbs.classList.remove('is-invalid')
  calories.classList.remove('is-invalid')
  protein.classList.remove('is-invalid')
}

const add = () => {
  const newItem = {
    description: 'manzana',
    calories: parseInt(calories.value),
    carbs: parseInt(carbs.value),
    protein: parseInt(protein.value)
  }

  list.push(newItem)
  updateTotals()
  cleanInputs()
  renderItems()
}

const updateTotals = () => {
  let calories = 0, carbs = 0, protein = 0
  list.map(item => {
    calories += item.calories 
    carbs += item.carbs 
    protein += item.protein
  })

  $totalCalories.innerHTML = calories 
  $totalCarbs.innerHTML = carbs
  $totalProtein.innerHTML = protein
}

const cleanInputs = () => {
   description.value = "" 
   carbs.value = "" 
   calories.value = "" 
   protein.value = ""
}

const trashIcon = tag({tag: 'i', attrs: {class: 'fas fa-trash-alt'}})('')

const renderItems = () => {
  $tableBody.innerHTML = ""  

  list.map((item, index) => {    
    const removeButton = tag({
      tag: 'button',
      attrs: {
        class: 'btn btn-outlin-danger',
        onclick:  `removeItem(${index})`
      }
    })(trashIcon)
    $tableBody.innerHTML += tableRow([
			item.description, 
			item.calories, 
			item.carbs, 
      item.protein,
      removeButton
		])
  })
}

///////
