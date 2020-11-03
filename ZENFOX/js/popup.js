// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
$(document).ready(() => {

  // Vishalini Devi Pindiproli

  let CurrentTabs = [];
  let SearchedTabs = [];
  let selectedTab = {};
  let container = document.getElementById("container");
  $("#search").focus();

  $('body').keydown(e=>{
    console.log(selectedTab);
  });

  $('body').keydown(e=>{
    console.log(selectedTab);
  });
  search.onkeyup = (e) => {
    filteredList(e.target.value);
  }

  filteredList = (value) => {
    if (!value) {
      // this.setState({ search_notes: this.state.user.notes });
      modifyTabs(CurrentTabs)
      return;
    }
    const _tabs = CurrentTabs.length > 0 && CurrentTabs.filter(tab => {
      if (tab.title.toLowerCase().includes(value.toLowerCase())) {
        return true;
      }
    })
    SearchedTabs = _tabs;
    modifyTabs(SearchedTabs)
  }
  browser.commands.onCommand.addListener(function (c) {
    alert(c)
  })

  // Get all tabs on load
  browser.tabs.query({ currentWindow: true }, function (tabs) {
    CurrentTabs = tabs; 
    selectedTab = tabs[0].id;
    modifyTabs(CurrentTabs);
  });

  browser.tabs.onMoved.addListener(async function (tabId, info) {
    browser.tabs.query({ currentWindow: true }, function (tabs) {
      CurrentTabs = tabs;
      modifyTabs(CurrentTabs);
    });
  })

  const updateApp = (tabId, options, index) => {
    browser.tabs.update(tabId, options, function (t) {
      CurrentTabs[index] = t;
      modifyTabs(CurrentTabs);
    })
  }

  const PinTab = (tabId, index) => {
    let pinned = !CurrentTabs[index].pinned;
    updateApp(tabId, { pinned: pinned }, index);
  }
  const muteTab = (tabId, index) => {
    let muted = !CurrentTabs[index].audible;
    updateApp(tabId, { audible: muted }, index);
  }

  const ActiveTab = (tabId, index) => {
    let active = !CurrentTabs[index].active;
    // updateApp(tabId, { active: active }, index);
    browser.tabs.update(tabId, { active: active }, function (t) {
      CurrentTabs[index] = t;
      // modifyTabs(CurrentTabs);
    })
  }

  function move(arr, old_index, new_index) {
    let x = arr.splice(old_index, 1);
    arr.splice(new_index, 0, x[0])
    return arr;
  }

  const modifyTabs = (tabs) => {
    let Ul = document.createElement('ul');
    tabs.forEach((tab, index) => {
      let li = document.createElement('li');
      li.id = tab.id;
      li.tabIndex = index
      li.innerHTML = `
      <img src="${tab.favIconUrl}" class="fav-img" /> 
      <div class="row">
        <span >${tab.title}</span> 
        <span class="url">${tab.url}</span>
      </div>
      
          `;
      li.className = "list-items"
      // li.tabIndex = 0;
      li.onclick = () => ActiveTab(tab.id, index); // Use this for current tab
      li.onkeypress = () => ActiveTab(tab.id, index); // Use this for current tab
      tab.id === selectedTab && li.focus();
      let options = document.createElement('div');
      options.className = 'options';

      // let mute = document.createElement('img');
      // mute.className = "option";
      // mute.onclick = (e) => {
      //   e.stopPropagation();
      //   muteTab(tab.id, index)
      // };

      // mute.src = tab.audible ? "svgs/vol.svg" :"svgs/unvol.svg" ;
      // options.appendChild(mute);

      let pin = document.createElement('img');
      pin.className = "option";
      pin.onclick = (e) => {
        e.stopPropagation();
        PinTab(tab.id, index)
      };
      pin.src = tab.pinned ? "svgs/unpin.svg" : "svgs/pin.svg";
      options.appendChild(pin);

      let close = document.createElement('img');
      close.className = "option";
      close.src = "svgs/close.svg"
      close.onclick = (e) => {
        e.stopPropagation();
        browser.tabs.remove(tab.id, function () {
          browser.tabs.query({ currentWindow: true }, function (tabs) {
            CurrentTabs = tabs;
            modifyTabs(CurrentTabs);
          });
        })
      }
      options.appendChild(close);

      li.appendChild(options);
      Ul.appendChild(li)
    });
    container.innerHTML = ''
    container.append(Ul)
  }
 
  $("#container").keydown(function (event) {
    switch (event.which) {
      case 37: //Arrow left

        console.log("Arrow left");
        break;
      case 39: //Arrow left
        console.log("Arrow left");
        break;
      case 38: //Arrow up
        console.log("Arrow up");
        break;
      case 40: //Arrow down
        console.log("Arrow down");
        break;
      case 13: //Enter
        console.log("enter");
        break;
      // next keys....

    }
  });
});
