// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict'; 
browser.runtime.onInstalled.addListener(function() {
  browser.storage.sync.set({color: '#3aa757'}, function() {
    console.log('The color is green.');
  });
  browser.declarativeContent.onPageChanged.removeRules(undefined, function() {
    browser.declarativeContent.onPageChanged.addRules([{
      conditions: [new browser.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'developer.browser.com'},
      })],
      actions: [new browser.declarativeContent.ShowPageAction()]
    }]);
  });
});
