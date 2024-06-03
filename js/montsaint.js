'use strict';

const TAB = 'c-is-active';
const PANEL = 'c-is-displayed';
const tabs = document.querySelectorAll('.c-tab-title');
const panels = document.querySelectorAll('.c-tab-panel-item');
const kvSlideItems = document.querySelectorAll('.top-kv-slide-item');

// -----------------------
// Function
// -----------------------

// クリックした場所がc-tab-titleかc-tab-panel-itemかどうかを判定する
const isTabOrPanel = (elements, target) => {
    for (const element of elements) {

    // if(element.classList.contains(event.target.classList[0])){
    if (element.contains(target)) {
      return true;
    }
  };
  return false;
}

const removeActiveDisplayedClass = (tabActive) => {
  const tabActiveNum = tabActive.dataset.tab;
  const panelDisplayed = document.querySelector(`[data-panel="${tabActiveNum}"]`);
  removeClass(tabActive, TAB);
  removeClass(panelDisplayed, PANEL);
}

const addActiveDisplayedClass = (tabClicked) => {
  const tabClickedNum = tabClicked.dataset.tab
  const panelNextOpen = document.querySelector(`[data-panel="${tabClickedNum}"]`);
  addClass(tabClicked, TAB);
  addClass(panelNextOpen, PANEL);
}

// -----------------------
// Main
// -----------------------

window.onload = () => {

  setPageTitle();

  // -----------------------
  // 初期化
  // -----------------------

  // -----------------------
  // イベントの追加
  // -----------------------

  tabs.forEach((item) => {
    item.addEventListener('click', (e) => {
      const tabClicked = e.target;
      const tabActive = document.querySelector(`.${TAB}`);

      if (tabClicked === tabActive) {
        // A clicked tab is active.
        removeActiveDisplayedClass(tabActive);
      } else {
        // A clicked tab is not active.
        if (tabActive === null) {
          // tabActive is null, which means there is no tab with c-is-active class.
          addActiveDisplayedClass(tabClicked);
        } else {
          // tabActive is not null, which means there is a tab with c-is-active class.
          removeActiveDisplayedClass(tabActive);
          addActiveDisplayedClass(tabClicked);
        }
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!isTabOrPanel(tabs, e.target) && !isTabOrPanel(panels, e.target)) {
      const tabActive = document.querySelector(`.${TAB}`);

      if (tabActive !== null) {
        removeActiveDisplayedClass(tabActive);
      }
    }
  });

  kvSlideItems.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      const filter = item.querySelector('.top-kv-slide-item-filter');
      if (filter !== null) filter.style.display = 'grid';
    });

    item.addEventListener('mouseleave', () => {
      const filter = item.querySelector('.top-kv-slide-item-filter');
      if (filter !== null) filter.style.display = 'none';
    });
  });
}