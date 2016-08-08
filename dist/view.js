
/**
 * @class
 */
function class_list() {
  Monkberry.call(this);
  var _this = this;

  // Create elements
  var for0 = document.createComment('if');
  var child0 = {};
  var child1 = {};

  // Update functions
  this.__update__ = {
    data: function (data) {
      var result;
      result = Monkberry.cond(_this, for0, child0, class_list_if0, data);
      Monkberry.cond(_this, for0, child1, class_list_else1, !result);
    }
  };

  // On update actions
  this.onUpdate = function (__data__) {
    if (child0.ref) {
      child0.ref.update(__data__);
    }
    if (child1.ref) {
      child1.ref.update(__data__);
    }
  };

  // Set root nodes
  this.nodes = [for0];
}
class_list.prototype = Object.create(Monkberry.prototype);
class_list.prototype.constructor = class_list;
class_list.pool = [];
class_list.prototype.update = function (__data__) {
  if (__data__.data !== undefined) {
    this.__update__.data(__data__.data);
  }
  this.onUpdate(__data__);
};

/**
 * @class
 */
function class_list_if0() {
  Monkberry.call(this);
  var _this = this;

  // Create elements
  var for0 = document.createComment('for');
  var children0 = new Monkberry.Map();

  // Update functions
  this.__update__ = {
    data: function (data) {
      Monkberry.loop(_this, for0, children0, class_list_if0_for0, data, {"value":"cur"});
    }
  };

  // On update actions
  this.onUpdate = function (__data__) {
    children0.forEach(function (view) {
      view.update(__data__);
      view.update(view.__state__);
    });
  };

  // Set root nodes
  this.nodes = [for0];
}
class_list_if0.prototype = Object.create(Monkberry.prototype);
class_list_if0.prototype.constructor = class_list_if0;
class_list_if0.pool = [];
class_list_if0.prototype.update = function (__data__) {
  if (__data__.data !== undefined) {
    this.__update__.data(__data__.data);
  }
  this.onUpdate(__data__);
};

/**
 * @class
 */
function class_list_if0_for0() {
  Monkberry.call(this);
  this.__cache__ = {};
  this.__state__ = {};
  var _this = this;

  // Create elements
  var label0 = document.createElement('label');
  var div1 = document.createElement('div');
  var for0 = document.createComment('if');
  var child0 = {};
  var child1 = {};
  var span2 = document.createElement('span');
  var text3 = document.createTextNode('');

  // Construct dom
  span2.appendChild(text3);
  span2.setAttribute("class", "mdl-switch__label");
  div1.appendChild(for0);
  div1.appendChild(span2);
  div1.setAttribute("class", "mdl-switch mdl-js-switch mdl-js-ripple-effect");
  label0.appendChild(div1);
  label0.setAttribute("class", "mdl-navigation__link");

  // Update functions
  this.__update__ = {
    cur_current: function (cur, current) {
      var result;
      result = Monkberry.cond(_this, for0, child0, class_list_if0_for0_if0, current.includes(cur));
      Monkberry.cond(_this, for0, child1, class_list_if0_for0_else1, !result);
    },
    cur: function (cur) {
      text3.textContent = cur;
    }
  };

  // On update actions
  this.onUpdate = function (__data__) {
    if (child0.ref) {
      child0.ref.update(__data__);
    }
    if (child1.ref) {
      child1.ref.update(__data__);
    }
  };

  // Set root nodes
  this.nodes = [label0];
}
class_list_if0_for0.prototype = Object.create(Monkberry.prototype);
class_list_if0_for0.prototype.constructor = class_list_if0_for0;
class_list_if0_for0.pool = [];
class_list_if0_for0.prototype.update = function (__data__) {
  if (__data__.cur !== undefined && __data__.__index__ !== undefined) {
    this.__cache__.cur = __data__.cur;
    this.__update__.cur(__data__.cur);
  }
  if (__data__.current !== undefined) {
    this.__cache__.current = __data__.current;
  }
  if (this.__cache__.cur !== undefined && this.__cache__.current !== undefined) {
    this.__update__.cur_current(this.__cache__.cur, this.__cache__.current);
  }
  this.onUpdate(__data__);
};

/**
 * @class
 */
function class_list_if0_for0_if0() {
  Monkberry.call(this);

  // Create elements
  var input0 = document.createElement('input');

  // Construct dom
  input0.checked = true;
  input0.setAttribute("name", "class");
  input0.setAttribute("type", "checkbox");
  input0.setAttribute("class", "mdl-switch__input");

  // Update functions
  this.__update__ = {
    cur: function (cur) {
      input0.setAttribute("data-action-classtoggle", cur);;
    }
  };

  // Set root nodes
  this.nodes = [input0];
}
class_list_if0_for0_if0.prototype = Object.create(Monkberry.prototype);
class_list_if0_for0_if0.prototype.constructor = class_list_if0_for0_if0;
class_list_if0_for0_if0.pool = [];
class_list_if0_for0_if0.prototype.update = function (__data__) {
  if (__data__.cur !== undefined) {
    this.__update__.cur(__data__.cur);
  }
};

/**
 * @class
 */
function class_list_if0_for0_else1() {
  Monkberry.call(this);

  // Create elements
  var input0 = document.createElement('input');

  // Construct dom
  input0.setAttribute("name", "class");
  input0.setAttribute("type", "checkbox");
  input0.setAttribute("class", "mdl-switch__input");

  // Update functions
  this.__update__ = {
    cur: function (cur) {
      input0.setAttribute("data-action-classtoggle", cur);;
    }
  };

  // Set root nodes
  this.nodes = [input0];
}
class_list_if0_for0_else1.prototype = Object.create(Monkberry.prototype);
class_list_if0_for0_else1.prototype.constructor = class_list_if0_for0_else1;
class_list_if0_for0_else1.pool = [];
class_list_if0_for0_else1.prototype.update = function (__data__) {
  if (__data__.cur !== undefined) {
    this.__update__.cur(__data__.cur);
  }
};

/**
 * @class
 */
function class_list_else1() {
  Monkberry.call(this);

  // Create elements
  var div0 = document.createElement('div');

  // Construct dom
  div0.setAttribute("class", "mdl-spinner mdl-js-spinner is-active");

  // Set root nodes
  this.nodes = [div0];
}
class_list_else1.prototype = Object.create(Monkberry.prototype);
class_list_else1.prototype.constructor = class_list_else1;
class_list_else1.pool = [];
class_list_else1.prototype.update = function (__data__) {
};

window.class_list = class_list;

/**
 * @class
 */
function search_field() {
  Monkberry.call(this);

  // Create elements
  var input0 = document.createElement('input');

  // Construct dom
  input0.setAttribute("class", "mdl-textfield__input");
  input0.setAttribute("data-action-search", "");
  input0.setAttribute("type", "text");
  input0.id = "fixed-header-drawer-exp";

  // Update functions
  this.__update__ = {
    data: function (data) {
      input0.value = data;;
    }
  };

  // Set root nodes
  this.nodes = [input0];
}
search_field.prototype = Object.create(Monkberry.prototype);
search_field.prototype.constructor = search_field;
search_field.pool = [];
search_field.prototype.update = function (__data__) {
  if (__data__.data !== undefined) {
    this.__update__.data(__data__.data);
  }
};

window.search_field = search_field;

var __unsafe = function unsafe(root, nodes, html) {var node,j,i = nodes.length,element = document.createElement('div');element.innerHTML = html;while (i-- > 0) {nodes[i].parentNode.removeChild(nodes.pop());}for (i = j = element.childNodes.length - 1; j >= 0; j--) {nodes.push(element.childNodes[j]);}++i;if (root.nodeType == 8) {if (root.parentNode) while (i-- > 0) {root.parentNode.insertBefore(nodes[i], root);} else throw "Can not insert child view into parent node. You need append your view first and then update.";} else while (i-- > 0) {root.appendChild(nodes[i]);}};

/**
 * @class
 */
function spell_details() {
  Monkberry.call(this);
  var _this = this;

  // Create elements
  var for0 = document.createComment('if');
  var child0 = {};
  var child1 = {};

  // Update functions
  this.__update__ = {
    data: function (data) {
      var result;
      result = Monkberry.cond(_this, for0, child0, spell_details_if0, data.name);
      Monkberry.cond(_this, for0, child1, spell_details_else1, !result);
    }
  };

  // On update actions
  this.onUpdate = function (__data__) {
    if (child0.ref) {
      child0.ref.update(__data__);
    }
    if (child1.ref) {
      child1.ref.update(__data__);
    }
  };

  // Set root nodes
  this.nodes = [for0];
}
spell_details.prototype = Object.create(Monkberry.prototype);
spell_details.prototype.constructor = spell_details;
spell_details.pool = [];
spell_details.prototype.update = function (__data__) {
  if (__data__.data !== undefined) {
    this.__update__.data(__data__.data);
  }
  this.onUpdate(__data__);
};

/**
 * @class
 */
function spell_details_if0() {
  Monkberry.call(this);
  var _this = this;

  // Create elements
  var button0 = document.createElement('button');
  var i1 = document.createElement('i');
  var h52 = document.createElement('h5');
  var text3 = document.createTextNode('');
  var p4 = document.createElement('p');
  var unsafeNodes0 = [];
  var div5 = document.createElement('div');
  var ul6 = document.createElement('ul');
  var li7 = document.createElement('li');
  var strong8 = document.createElement('strong');
  var text9 = document.createTextNode('');
  var li10 = document.createElement('li');
  var strong11 = document.createElement('strong');
  var text12 = document.createTextNode('');
  var li13 = document.createElement('li');
  var strong14 = document.createElement('strong');
  var text15 = document.createTextNode('');
  var for0 = document.createComment('if');
  var child0 = {};
  var ul16 = document.createElement('ul');
  var li17 = document.createElement('li');
  var strong18 = document.createElement('strong');
  var text19 = document.createTextNode('');
  var li20 = document.createElement('li');
  var strong21 = document.createElement('strong');
  var text22 = document.createTextNode('Cantrip');
  var li23 = document.createElement('li');
  var strong24 = document.createElement('strong');
  var span25 = document.createElement('span');
  var text26 = document.createTextNode('');
  var for1 = document.createComment('if');
  var child2 = {};
  var div27 = document.createElement('div');
  var label28 = document.createElement('label');
  var i29 = document.createElement('i');
  var input30 = document.createElement('input');

  // Construct dom
  i1.appendChild(document.createTextNode("close"));
  i1.setAttribute("class", "material-icons");
  button0.appendChild(i1);
  button0.setAttribute("data-action-details", "");
  button0.setAttribute("class", "mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab");
  h52.appendChild(text3);
  h52.setAttribute("class", "mdl-typography--display-1 mdl-color-text--teal-600");
  p4.setAttribute("class", "description");
  strong8.appendChild(document.createTextNode("Range: "));
  li7.appendChild(strong8);
  li7.appendChild(text9);
  strong11.appendChild(document.createTextNode("Casting Time: "));
  li10.appendChild(strong11);
  li10.appendChild(text12);
  strong14.appendChild(document.createTextNode("Duration: "));
  li13.appendChild(strong14);
  li13.appendChild(text15);
  ul6.appendChild(li7);
  ul6.appendChild(li10);
  ul6.appendChild(li13);
  ul6.appendChild(for0);
  ul6.setAttribute("class", "right mdl-cell mdl-cell--6-col");
  strong18.appendChild(document.createTextNode("School: "));
  li17.appendChild(strong18);
  li17.appendChild(text19);
  strong21.appendChild(document.createTextNode("Spell Level: "));
  li20.appendChild(strong21);
  li20.appendChild(text22);
  strong24.appendChild(document.createTextNode("Class: "));
  span25.appendChild(text26);
  span25.setAttribute("class", "classes");
  li23.appendChild(strong24);
  li23.appendChild(span25);
  ul16.appendChild(li17);
  ul16.appendChild(li20);
  ul16.appendChild(li23);
  ul16.appendChild(for1);
  ul16.setAttribute("class", "left mdl-cell mdl-cell--6-col");
  i29.appendChild(document.createTextNode("content_copy"));
  i29.setAttribute("class", "material-icons");
  label28.appendChild(i29);
  label28.setAttribute("class", "mdl-button mdl-js-button mdl-button--icon copy-to-clipboard");
  label28.setAttribute("for", "share-url");
  label28.setAttribute("data-clipboard-target", "#share-url");
  input30.setAttribute("readonly", "");
  input30.setAttribute("class", "mdl-textfield__input");
  input30.setAttribute("type", "text");
  input30.id = "share-url";
  div27.appendChild(label28);
  div27.appendChild(input30);
  div27.setAttribute("class", "mdl-textfield mdl-js-textfield");
  div5.appendChild(ul6);
  div5.appendChild(ul16);
  div5.appendChild(div27);
  div5.setAttribute("class", "mdl-grid");

  // Update functions
  this.__update__ = {
    data: function (data) {
      text3.textContent = data.name;
      __unsafe(p4, unsafeNodes0, data.description);
      text9.textContent = data.range;
      text12.textContent = data.casting_time;
      text15.textContent = data.duration;
      Monkberry.cond(_this, for0, child0, spell_details_if0_if0, data.ritual);
      text19.textContent = data.school;
      text22.textContent = (data.level) || ('Cantrip');
      text26.textContent = data.classes.join(', ');
      Monkberry.cond(_this, for1, child2, spell_details_if0_if2, (data.components) && (data.components.raw));
    },
    url: function (url) {
      input30.value = url;;
    }
  };

  // On update actions
  this.onUpdate = function (__data__) {
    if (child0.ref) {
      child0.ref.update(__data__);
    }
    if (child2.ref) {
      child2.ref.update(__data__);
    }
  };

  // Set root nodes
  this.nodes = [button0, h52, p4, div5];
}
spell_details_if0.prototype = Object.create(Monkberry.prototype);
spell_details_if0.prototype.constructor = spell_details_if0;
spell_details_if0.pool = [];
spell_details_if0.prototype.update = function (__data__) {
  if (__data__.data !== undefined) {
    this.__update__.data(__data__.data);
  }
  if (__data__.url !== undefined) {
    this.__update__.url(__data__.url);
  }
  this.onUpdate(__data__);
};

/**
 * @class
 */
function spell_details_if0_if0() {
  Monkberry.call(this);

  // Create elements
  var li0 = document.createElement('li');

  // Construct dom
  li0.appendChild(document.createTextNode("Ritual"));

  // Set root nodes
  this.nodes = [li0];
}
spell_details_if0_if0.prototype = Object.create(Monkberry.prototype);
spell_details_if0_if0.prototype.constructor = spell_details_if0_if0;
spell_details_if0_if0.pool = [];
spell_details_if0_if0.prototype.update = function (__data__) {
};

/**
 * @class
 */
function spell_details_if0_if2() {
  Monkberry.call(this);

  // Create elements
  var li0 = document.createElement('li');
  var strong1 = document.createElement('strong');
  var text2 = document.createTextNode('');

  // Construct dom
  strong1.appendChild(document.createTextNode("Components: "));
  li0.appendChild(strong1);
  li0.appendChild(text2);

  // Update functions
  this.__update__ = {
    data: function (data) {
      text2.textContent = data.components.raw;
    }
  };

  // Set root nodes
  this.nodes = [li0];
}
spell_details_if0_if2.prototype = Object.create(Monkberry.prototype);
spell_details_if0_if2.prototype.constructor = spell_details_if0_if2;
spell_details_if0_if2.pool = [];
spell_details_if0_if2.prototype.update = function (__data__) {
  if (__data__.data !== undefined) {
    this.__update__.data(__data__.data);
  }
};

/**
 * @class
 */
function spell_details_else1() {
  Monkberry.call(this);

  // Create elements
  var div0 = document.createElement('div');
  var h61 = document.createElement('h6');

  // Construct dom
  h61.appendChild(document.createTextNode(" Choose a Spell "));
  h61.setAttribute("class", "mdl-typography--title");
  div0.appendChild(h61);
  div0.id = "empty";

  // Set root nodes
  this.nodes = [div0];
}
spell_details_else1.prototype = Object.create(Monkberry.prototype);
spell_details_else1.prototype.constructor = spell_details_else1;
spell_details_else1.pool = [];
spell_details_else1.prototype.update = function (__data__) {
};

window.spell_details = spell_details;

var __unsafe = function unsafe(root, nodes, html) {var node,j,i = nodes.length,element = document.createElement('div');element.innerHTML = html;while (i-- > 0) {nodes[i].parentNode.removeChild(nodes.pop());}for (i = j = element.childNodes.length - 1; j >= 0; j--) {nodes.push(element.childNodes[j]);}++i;if (root.nodeType == 8) {if (root.parentNode) while (i-- > 0) {root.parentNode.insertBefore(nodes[i], root);} else throw "Can not insert child view into parent node. You need append your view first and then update.";} else while (i-- > 0) {root.appendChild(nodes[i]);}};

/**
 * @class
 */
function spell_list_print() {
  Monkberry.call(this);
  var _this = this;

  // Create elements
  var for0 = document.createComment('for');
  var children0 = new Monkberry.Map();

  // Update functions
  this.__update__ = {
    data: function (data) {
      Monkberry.loop(_this, for0, children0, spell_list_print_for0, data, {"value":"spell"});
    }
  };

  // On update actions
  this.onUpdate = function (__data__) {
    children0.forEach(function (view) {
      view.update(__data__);
      view.update(view.__state__);
    });
  };

  // Set root nodes
  this.nodes = [for0];
}
spell_list_print.prototype = Object.create(Monkberry.prototype);
spell_list_print.prototype.constructor = spell_list_print;
spell_list_print.pool = [];
spell_list_print.prototype.update = function (__data__) {
  if (__data__.data !== undefined) {
    this.__update__.data(__data__.data);
  }
  this.onUpdate(__data__);
};

/**
 * @class
 */
function spell_list_print_for0() {
  Monkberry.call(this);
  this.__state__ = {};
  var _this = this;

  // Create elements
  var tr0 = document.createElement('tr');
  var td1 = document.createElement('td');
  var strong2 = document.createElement('strong');
  var text3 = document.createTextNode('');
  var td4 = document.createElement('td');
  var text5 = document.createTextNode('');
  var td6 = document.createElement('td');
  var strong7 = document.createElement('strong');
  var text8 = document.createTextNode('');
  var strong9 = document.createElement('strong');
  var text10 = document.createTextNode('');
  var strong11 = document.createElement('strong');
  var text12 = document.createTextNode('');
  var for0 = document.createComment('if');
  var child0 = {};
  var unsafe0 = document.createComment('unsafe');
  var unsafeNodes0 = [];

  // Construct dom
  strong2.appendChild(text3);
  td1.appendChild(strong2);
  td1.setAttribute("class", "spell-name");
  td4.appendChild(text5);
  td4.setAttribute("class", "spell-level");
  strong7.appendChild(document.createTextNode(" Range: "));
  strong9.appendChild(document.createTextNode(" Casting Time: "));
  strong11.appendChild(document.createTextNode(" Duration: "));
  td6.appendChild(strong7);
  td6.appendChild(text8);
  td6.appendChild(strong9);
  td6.appendChild(text10);
  td6.appendChild(strong11);
  td6.appendChild(text12);
  td6.appendChild(for0);
  td6.appendChild(unsafe0);
  td6.setAttribute("class", "spell-description");
  tr0.appendChild(td1);
  tr0.appendChild(td4);
  tr0.appendChild(td6);

  // Update functions
  this.__update__ = {
    spell: function (spell) {
      text3.textContent = spell.name;
      text5.textContent = spell.level;
      text8.textContent = spell.range;
      text10.textContent = spell.casting_time;
      text12.textContent = spell.duration;
      Monkberry.cond(_this, for0, child0, spell_list_print_for0_if0, spell.ritual);
      __unsafe(unsafe0, unsafeNodes0, spell.description);
    }
  };

  // On update actions
  this.onUpdate = function (__data__) {
    if (child0.ref) {
      child0.ref.update(__data__);
    }
  };

  // Set root nodes
  this.nodes = [tr0];
}
spell_list_print_for0.prototype = Object.create(Monkberry.prototype);
spell_list_print_for0.prototype.constructor = spell_list_print_for0;
spell_list_print_for0.pool = [];
spell_list_print_for0.prototype.update = function (__data__) {
  if (__data__.spell !== undefined && __data__.__index__ !== undefined) {
    this.__update__.spell(__data__.spell);
  }
  this.onUpdate(__data__);
};

/**
 * @class
 */
function spell_list_print_for0_if0() {
  Monkberry.call(this);

  // Create elements
  var strong0 = document.createElement('strong');

  // Construct dom
  strong0.appendChild(document.createTextNode(" Ritual"));

  // Set root nodes
  this.nodes = [strong0];
}
spell_list_print_for0_if0.prototype = Object.create(Monkberry.prototype);
spell_list_print_for0_if0.prototype.constructor = spell_list_print_for0_if0;
spell_list_print_for0_if0.pool = [];
spell_list_print_for0_if0.prototype.update = function (__data__) {
};

window.spell_list_print = spell_list_print;

/**
 * @class
 */
function spell_list() {
  Monkberry.call(this);
  var _this = this;

  // Create elements
  var for0 = document.createComment('if');
  var child0 = {};
  var child1 = {};

  // Update functions
  this.__update__ = {
    data: function (data) {
      var result;
      result = Monkberry.cond(_this, for0, child0, spell_list_if0, data.length);
      Monkberry.cond(_this, for0, child1, spell_list_else1, !result);
    }
  };

  // On update actions
  this.onUpdate = function (__data__) {
    if (child0.ref) {
      child0.ref.update(__data__);
    }
    if (child1.ref) {
      child1.ref.update(__data__);
    }
  };

  // Set root nodes
  this.nodes = [for0];
}
spell_list.prototype = Object.create(Monkberry.prototype);
spell_list.prototype.constructor = spell_list;
spell_list.pool = [];
spell_list.prototype.update = function (__data__) {
  if (__data__.data !== undefined) {
    this.__update__.data(__data__.data);
  }
  this.onUpdate(__data__);
};

/**
 * @class
 */
function spell_list_if0() {
  Monkberry.call(this);
  var _this = this;

  // Create elements
  var for0 = document.createComment('for');
  var children0 = new Monkberry.Map();

  // Update functions
  this.__update__ = {
    data: function (data) {
      Monkberry.loop(_this, for0, children0, spell_list_if0_for0, data, {"value":"spell"});
    }
  };

  // On update actions
  this.onUpdate = function (__data__) {
    children0.forEach(function (view) {
      view.update(__data__);
      view.update(view.__state__);
    });
  };

  // Set root nodes
  this.nodes = [for0];
}
spell_list_if0.prototype = Object.create(Monkberry.prototype);
spell_list_if0.prototype.constructor = spell_list_if0;
spell_list_if0.pool = [];
spell_list_if0.prototype.update = function (__data__) {
  if (__data__.data !== undefined) {
    this.__update__.data(__data__.data);
  }
  this.onUpdate(__data__);
};

/**
 * @class
 */
function spell_list_if0_for0() {
  Monkberry.call(this);
  this.__state__ = {};

  // Create elements
  var tr0 = document.createElement('tr');
  var td1 = document.createElement('td');
  var label2 = document.createElement('label');
  var input3 = document.createElement('input');
  var td4 = document.createElement('td');
  var strong5 = document.createElement('strong');
  var text6 = document.createTextNode('');
  var td7 = document.createElement('td');
  var text8 = document.createTextNode('');
  var td9 = document.createElement('td');
  var text10 = document.createTextNode('');

  // Construct dom
  input3.setAttribute("type", "checkbox");
  input3.setAttribute("name", "selected");
  input3.setAttribute("class", "mdl-checkbox__input dontprop");
  label2.appendChild(input3);
  label2.setAttribute("class", "mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect mdl-data-table__select dontprop");
  td1.appendChild(label2);
  strong5.appendChild(text6);
  td4.appendChild(strong5);
  td4.setAttribute("class", "spell-name mdl-data-table__cell--non-numeric");
  td7.appendChild(text8);
  td7.setAttribute("class", "spell-school mdl-data-table__cell--non-numeric");
  td9.appendChild(text10);
  td9.setAttribute("class", "spell-level");
  tr0.appendChild(td1);
  tr0.appendChild(td4);
  tr0.appendChild(td7);
  tr0.appendChild(td9);

  // Update functions
  this.__update__ = {
    spell: function (spell) {
      input3.value = spell.name;;
      text6.textContent = spell.name;
      text8.textContent = spell.school;
      text10.textContent = spell.prettyLevel;
      tr0.setAttribute("data-action-details", spell.name);;
    }
  };

  // Set root nodes
  this.nodes = [tr0];
}
spell_list_if0_for0.prototype = Object.create(Monkberry.prototype);
spell_list_if0_for0.prototype.constructor = spell_list_if0_for0;
spell_list_if0_for0.pool = [];
spell_list_if0_for0.prototype.update = function (__data__) {
  if (__data__.spell !== undefined && __data__.__index__ !== undefined) {
    this.__update__.spell(__data__.spell);
  }
};

/**
 * @class
 */
function spell_list_else1() {
  Monkberry.call(this);
  var _this = this;

  // Create elements
  var tr0 = document.createElement('tr');
  var td1 = document.createElement('td');
  var child0 = {};
  var child1 = {};

  // Construct dom
  td1.setAttribute("colspan", "4");
  tr0.appendChild(td1);
  tr0.setAttribute("class", "do-nothing");

  // Update functions
  this.__update__ = {
    data: function (data) {
      var result;
      result = Monkberry.cond(_this, td1, child0, spell_list_else1_if0, data);
      Monkberry.cond(_this, td1, child1, spell_list_else1_else1, !result);
    }
  };

  // On update actions
  this.onUpdate = function (__data__) {
    if (child0.ref) {
      child0.ref.update(__data__);
    }
    if (child1.ref) {
      child1.ref.update(__data__);
    }
  };

  // Set root nodes
  this.nodes = [tr0];
}
spell_list_else1.prototype = Object.create(Monkberry.prototype);
spell_list_else1.prototype.constructor = spell_list_else1;
spell_list_else1.pool = [];
spell_list_else1.prototype.update = function (__data__) {
  if (__data__.data !== undefined) {
    this.__update__.data(__data__.data);
  }
  this.onUpdate(__data__);
};

/**
 * @class
 */
function spell_list_else1_if0() {
  Monkberry.call(this);

  // Create elements
  var div0 = document.createElement('div');
  var i1 = document.createElement('i');
  var h52 = document.createElement('h5');
  var h63 = document.createElement('h6');

  // Construct dom
  i1.appendChild(document.createTextNode(" warning "));
  i1.setAttribute("class", "material-icons mdl-list__item-icon mdl-color-text--orange-600");
  h52.appendChild(document.createTextNode("No Results"));
  h63.appendChild(document.createTextNode("Try refining your filters in the sidebar."));
  div0.appendChild(i1);
  div0.appendChild(h52);
  div0.appendChild(h63);
  div0.setAttribute("class", "text-center");

  // Set root nodes
  this.nodes = [div0];
}
spell_list_else1_if0.prototype = Object.create(Monkberry.prototype);
spell_list_else1_if0.prototype.constructor = spell_list_else1_if0;
spell_list_else1_if0.pool = [];
spell_list_else1_if0.prototype.update = function (__data__) {
};

/**
 * @class
 */
function spell_list_else1_else1() {
  Monkberry.call(this);

  // Create elements
  var div0 = document.createElement('div');

  // Construct dom
  div0.setAttribute("class", "mdl-spinner mdl-js-spinner is-active");

  // Set root nodes
  this.nodes = [div0];
}
spell_list_else1_else1.prototype = Object.create(Monkberry.prototype);
spell_list_else1_else1.prototype.constructor = spell_list_else1_else1;
spell_list_else1_else1.pool = [];
spell_list_else1_else1.prototype.update = function (__data__) {
};

window.spell_list = spell_list;

/**
 * @class
 */
function table_sort() {
  Monkberry.call(this);
  var _this = this;

  // Create elements
  var th0 = document.createElement('th');
  var label1 = document.createElement('label');
  var input2 = document.createElement('input');
  var for0 = document.createComment('for');
  var children0 = new Monkberry.Map();

  // Construct dom
  input2.setAttribute("type", "checkbox");
  input2.id = "table-header";
  input2.setAttribute("class", "mdl-checkbox__input");
  label1.appendChild(input2);
  label1.setAttribute("class", "mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect mdl-data-table__select");
  label1.setAttribute("for", "table-header");
  th0.appendChild(label1);

  // Update functions
  this.__update__ = {
    data: function (data) {
      Monkberry.loop(_this, for0, children0, table_sort_for0, data, {"value":"name"});
    }
  };

  // On update actions
  this.onUpdate = function (__data__) {
    children0.forEach(function (view) {
      view.update(__data__);
      view.update(view.__state__);
    });
  };

  // Set root nodes
  this.nodes = [th0, for0];
}
table_sort.prototype = Object.create(Monkberry.prototype);
table_sort.prototype.constructor = table_sort;
table_sort.pool = [];
table_sort.prototype.update = function (__data__) {
  if (__data__.data !== undefined) {
    this.__update__.data(__data__.data);
  }
  this.onUpdate(__data__);
};

/**
 * @class
 */
function table_sort_for0() {
  Monkberry.call(this);
  this.__cache__ = {};
  this.__state__ = {};
  var _this = this;

  // Create elements
  var th0 = document.createElement('th');
  var i1 = document.createElement('i');
  var for0 = document.createComment('if');
  var child0 = {};
  var for1 = document.createComment('if');
  var child2 = {};
  var for2 = document.createComment('if');
  var child4 = {};
  var span2 = document.createElement('span');
  var text3 = document.createTextNode('');
  var i4 = document.createElement('i');
  var text5 = document.createTextNode('');

  // Construct dom
  i1.appendChild(for0);
  i1.appendChild(for1);
  i1.appendChild(for2);
  i1.setAttribute("class", "material-icons mdl-list__item-icon");
  span2.appendChild(document.createTextNode(" "));
  span2.appendChild(text3);
  i4.appendChild(text5);
  i4.setAttribute("class", "material-icons mdl-color-text--teal-600 mdl-list__item-icon ");
  th0.appendChild(i1);
  th0.appendChild(span2);
  th0.appendChild(i4);
  th0.setAttribute("class", "mdl-data-table__cell--non-numeric ");

  // Update functions
  this.__update__ = {
    name: function (name) {
      Monkberry.cond(_this, for0, child0, table_sort_for0_if0, (name) === ('level'));
      Monkberry.cond(_this, for1, child2, table_sort_for0_if2, (name) === ('name'));
      Monkberry.cond(_this, for2, child4, table_sort_for0_if4, (name) === ('school'));
      text3.textContent = name;
      th0.setAttribute("data-action-sort", name);;
    },
    rev: function (rev) {
      text5.textContent = (rev) ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
    },
    current_name: function (current, name) {
      i4.setAttribute("class", ("material-icons mdl-color-text--teal-600 mdl-list__item-icon ") + (((name) === (current)) ? 'mdl-color-text--teal-600' : 'mdl-color-text--grey-300'));;
    },
    current: function (current) {
      th0.setAttribute("class", ("mdl-data-table__cell--non-numeric ") + (((current) === ('ranking')) ? 'mdl-color-text--grey-200 do-nothing' : ''));;
    }
  };

  // On update actions
  this.onUpdate = function (__data__) {
    if (child0.ref) {
      child0.ref.update(__data__);
    }
    if (child2.ref) {
      child2.ref.update(__data__);
    }
    if (child4.ref) {
      child4.ref.update(__data__);
    }
  };

  // Set root nodes
  this.nodes = [th0];
}
table_sort_for0.prototype = Object.create(Monkberry.prototype);
table_sort_for0.prototype.constructor = table_sort_for0;
table_sort_for0.pool = [];
table_sort_for0.prototype.update = function (__data__) {
  if (__data__.name !== undefined && __data__.__index__ !== undefined) {
    this.__cache__.name = __data__.name;
    this.__update__.name(__data__.name);
  }
  if (__data__.rev !== undefined) {
    this.__update__.rev(__data__.rev);
  }
  if (__data__.current !== undefined) {
    this.__cache__.current = __data__.current;
    this.__update__.current(__data__.current);
  }
  if (this.__cache__.current !== undefined && this.__cache__.name !== undefined) {
    this.__update__.current_name(this.__cache__.current, this.__cache__.name);
  }
  this.onUpdate(__data__);
};

/**
 * @class
 */
function table_sort_for0_if0() {
  Monkberry.call(this);

  // Set root nodes
  this.nodes = [document.createTextNode(" exposure ")];
}
table_sort_for0_if0.prototype = Object.create(Monkberry.prototype);
table_sort_for0_if0.prototype.constructor = table_sort_for0_if0;
table_sort_for0_if0.pool = [];
table_sort_for0_if0.prototype.update = function (__data__) {
};

/**
 * @class
 */
function table_sort_for0_if2() {
  Monkberry.call(this);

  // Set root nodes
  this.nodes = [document.createTextNode(" flash_on ")];
}
table_sort_for0_if2.prototype = Object.create(Monkberry.prototype);
table_sort_for0_if2.prototype.constructor = table_sort_for0_if2;
table_sort_for0_if2.pool = [];
table_sort_for0_if2.prototype.update = function (__data__) {
};

/**
 * @class
 */
function table_sort_for0_if4() {
  Monkberry.call(this);

  // Set root nodes
  this.nodes = [document.createTextNode(" school ")];
}
table_sort_for0_if4.prototype = Object.create(Monkberry.prototype);
table_sort_for0_if4.prototype.constructor = table_sort_for0_if4;
table_sort_for0_if4.pool = [];
table_sort_for0_if4.prototype.update = function (__data__) {
};

window.table_sort = table_sort;
//# sourceMappingURL=view.js.map
