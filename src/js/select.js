export default class Select {
    constructor($element) {
        this.element = $element
        this.label = $element.labels[0]
        this.options = getOptions($element.querySelectorAll('option'))
        this.customElement = document.createElement('div')
        this.labelElement = document.createElement('span')
        this.valueElement = document.createElement('span')
        this.optionsCustomElement = document.createElement('ul')
        initSelect(this)
        this.element.style.display = 'none'
        this.label.style.display = 'none'
        $element.after(this.customElement)
    }

    get selectedOption(){
        return this.options.find(option => option.selected)
    }

    selectValue(value) {
        const newSelectedOption = this.options.find(option => {
            return option.value === value
        })
        const previousSelectedOption = this.selectedOption

        previousSelectedOption.selected = false
        previousSelectedOption.element.selected = false

        newSelectedOption.selected = true
        newSelectedOption.element.selected = true
        this.element.dispatchEvent((new Event('change')))

        this.valueElement.innerText = newSelectedOption.label
    }
}

function initSelect(select) {
    select.customElement.classList.add('custom-select__container')
    select.customElement.tabIndex = 0

    select.labelElement.classList.add('custom-select__label')
    select.labelElement.innerText = select.label.textContent
    select.customElement.append(select.labelElement)

    select.valueElement.classList.add('custom-select__value')
    select.valueElement.innerText = select.selectedOption.label
    select.customElement.append(select.valueElement)

    select.optionsCustomElement.classList.add('custom-select__options')
    renderOptions(select)
    select.customElement.append(select.optionsCustomElement)

    select.element.addEventListener('updated', () => {
        select.options = getOptions(select.element.querySelectorAll('option'))
        select.valueElement.innerText = select.selectedOption.label
        renderOptions(select)
    })

    select.valueElement.addEventListener('click', () => {
        select.optionsCustomElement.classList.toggle('show')
    })

    select.customElement.addEventListener('blur', () => {
        select.optionsCustomElement.classList.remove('show')
    })
}

function renderOptions(select) {
    select.optionsCustomElement.innerHtml = ""
    select.optionsCustomElement.querySelectorAll('*').forEach(n => n.remove())
    select.options.forEach(option => {
        const optionElement = document.createElement('li')
        optionElement.classList.add('custom-select__option')
        optionElement.classList.toggle('selected', option.selected)
        optionElement.innerText = option.label
        optionElement.dataset.value = option.value
        optionElement.addEventListener('click', () => {
            if (optionElement.dataset.value === "0") return
            select.optionsCustomElement
                .querySelector(`[data-value="${select.selectedOption.value}"]`)
                .classList.remove('selected')
            select.selectValue(option.value)
            optionElement.classList.add('selected')
            select.optionsCustomElement.classList.remove('show')
        })
        select.optionsCustomElement.append(optionElement)
    })
}

function getOptions(options){
    return [...options].map(option => {
        return {
            value: option.value,
            label: option.label,
            selected: option.selected,
            element: option
        }
    })
}