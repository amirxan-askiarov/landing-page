import './reset.css'
import './style.scss'

document.addEventListener('DOMContentLoaded', () => {
  const selectContainer = document.querySelector('.select-container');
  const selectArrow = document.querySelector('.select-header__arrow');
  const nativeSelect = selectContainer.querySelector('.order-form__system-input');
  const header = selectContainer.querySelector('.select-header');
  const optionsContainer = selectContainer.querySelector('.order-form__select-options-list');
  
  const customOptions = optionsContainer.querySelectorAll('.order-form__select-option');

  customOptions.forEach(customOption => {
    const value = customOption.getAttribute('data-value');
    const text = customOption.textContent;

    const nativeOption = document.createElement('option');
    nativeOption.value = value;
    nativeOption.textContent = text;
    
    nativeSelect.appendChild(nativeOption);
  });

  header.addEventListener('click', () => {
    selectContainer.ariaExpanded = selectContainer.ariaExpanded !== 'true';
    selectContainer.classList.toggle('open');
    selectArrow.classList.toggle('open');
  });

  header.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
      selectContainer.ariaExpanded = selectContainer.ariaExpanded !== 'true';
      selectContainer.classList.toggle('open');
      selectArrow.classList.toggle('open');
    }
  });

  optionsContainer.addEventListener('click', (e) => selectValue(e));
  optionsContainer.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') selectValue(e);
  });

  function selectValue(e) {
    if (e.target.matches('.order-form__select-option')) {
      const selectedValue = e.target.getAttribute('data-value');
      const displayText = e.target.textContent;
      
      nativeSelect.value = selectedValue;

      nativeSelect.dispatchEvent(new Event('change', { bubbles: true }));
      
      header.querySelector('span').textContent = displayText;

      customOptions.forEach(option => {
          option.classList.remove('order-form__select-option--selected');
      });
      e.target.classList.add('order-form__select-option--selected');
      selectContainer.ariaExpanded = 'false';
      selectContainer.classList.remove('open');
      selectArrow.classList.remove('open');
    }
  }

  document.addEventListener('click', (e) => exitDropdownMenu(e));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') exitDropdownMenu(e);
  });

  function exitDropdownMenu(e) {
    const isSelectOpen = selectContainer.classList.contains('open');
    if (isSelectOpen && !selectContainer.contains(e.target)) {
      selectContainer.ariaExpanded = 'false';
      selectContainer.classList.remove('open');
      selectArrow.classList.remove('open');
    }
  }

  const mobileMenu = document.querySelector('.header__mobile-menu');
  const navList = document.querySelector('.header__nav-list');

  mobileMenu.addEventListener('click', (e) => toggleNavList(e));
  mobileMenu.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') toggleNavList(e);
  });

  function toggleNavList(e) {
    mobileMenu.classList.toggle('open');
    navList.classList.toggle('open');
  }

  const range = document.getElementById("range");
  const valueDisplayed = document.querySelector('.order-form__range-value');
  range.addEventListener('change', ()=> {
    valueDisplayed.textContent = `${range.value}%`;
  })
});
