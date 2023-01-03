/*global localStorageDB:false */

var test = (function test() {
  var lib,
      tableName = 'blobs',
      charsPerBlob = 5000,
      alpha = 'abcdefghijklmnopqrstuvwxyz0123456789';

  function _init () {
    createDB();

    // Events
    document.getElementById('add').addEventListener('click', addRows);
    document.getElementById('delete').addEventListener('click', deleteRows);
    document.getElementById('truncate').addEventListener('click', trunc);
    document.getElementById('serialize').addEventListener('click', serial);
    document.getElementById('clear-log').addEventListener('click', clearLog);
    document.getElementById('drop').addEventListener('click', dropDB);
    document.getElementById('create').addEventListener('click', createDB);
  }

  // Create a random string of 10,000 characters
  function createBlob () {
    var blob = '', i;
    for (i = 0; i < charsPerBlob; i++) {
      blob += alpha.charAt(Math.floor(Math.random() * alpha.length));
    }
    return blob;
  }

  function addRows() {
    var numAdded = 0;
    try {
      var i, b;

      // Make sure table exists (may have been dropped by user)
      if (!lib.tableExists(tableName)) {
        lib.createTable(tableName, ['text']);
        lib.commit();
        numAdded++;
      }

      // Add 100 rows
      for (i = 0; i < 100; i++) {
        b = createBlob();
        lib.insert(tableName, {text: b});
        lib.commit();
      }

      displayNumAdded(100);
    }
    catch (e) {
      // if (e == QUOTA_EXCEEDED_ERR) {
        displayLog('<span class="error">Error: Quota exceeded after only ' + numAdded + ' rows were added. DB should now have ' + (lib.rowCount(tableName)*charsPerBlob) + ' chars written.</span>');
        console.log(e);
      // }
    }
  }

  // Print something on the page
  function displayLog (html) {
    var li = document.createElement('li');
    li.innerHTML = html;
    document.getElementById('output').appendChild(li);
  }

  function clearLog () {
    document.getElementById('output').innerHTML = '';
  }

  function displayNumAdded (num) {
    displayLog('Added ' + num + ' blobs of ' + charsPerBlob + ' characters. ' + (lib.rowCount(tableName)*charsPerBlob) + ' chars written so far.<br><code>lib.query()</code> reports ' + (lib.query(tableName).length) + ' rows in the table.');
  }

  function trunc () {
    lib.truncate(tableName);
    lib.commit();
    displayLog('Truncated table. Table now reports ' + (lib.rowCount(tableName)) + ' rows.');
  }

  function deleteRows () {
    lib.deleteRows(tableName);
    lib.commit();
    displayLog('All rows deleted. Table now reports ' + (lib.rowCount(tableName)) + ' rows.');
  }

  function dropDB () {
    lib.drop();
    lib.commit();
    displayLog('Entire database deleted.');
  }

  function createDB () {
    lib = new localStorageDB('lib', localStorage);
    if (lib.isNew()) {
      lib.createTable(tableName, ['text']);
      lib.commit();
      displayLog('New database created.');
    }
    else {
      displayLog('Database was already created and has ' + (lib.rowCount(tableName)) + ' rows.');
    }
  }

  function serial () {
    document.getElementById('serialize-output').value = lib.serialize();
  }

  return {
    init: _init
  };
}());

window.addEventListener('load', test.init);
