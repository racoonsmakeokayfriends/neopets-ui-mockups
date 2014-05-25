$(document).ready(function()    {

  /*****************
   *** CONSTANTS ***
   *****************/

  var ROW_NUMBER = 6;

  /*************
   *** STATE ***
   *************/
  var selected_items = [];
  var items;
  var user_pets = ['angel', 'ginger', 'cleo'];

  /************************
   *** HELPER FUNCTIONS ***
   ************************/

  function make_item_objects()  {
    // note: tried to make one of each item type I wanted to incorporate
    var item1 = {
      item_name: "Stagnant Puddle of Water",
      img_src: "http://images.neopets.com/items/fur_puddle_water.gif",
      item_description: "Looks like someone needs to mop the floor again.",
      item_type: "Furniture"
    };

    var item2 = {
      item_name: "Pygui Hand Puppet",
      img_src: "http://images.neopets.com/items/toy_pygui_puppet.gif",
      item_description: "Awww what an adorable puppet!",
      item_type: "Toy"
    };

    var item3 = {
      item_name: "Chocolate Kougra Pudding",
      img_src: "http://images.neopets.com/items/foo_kougra_choco.gif",
      item_description: "A creamy chocolate pudding with fudge sauce in the shape of a Kougra!",
      item_type: "Food"
    };

    var item4 = {
      item_name: "Shiny Obsidian",
      img_src: "http://images.neopets.com/items/mmat_obsidian.gif",
      item_description: "This dark rock shines like glass when cut.",
      item_type: "Special"
    };

    var item5 = {
      item_name: "Kreludan Grundo Slippers",
      img_src: "http://images.neopets.com/items/clo_grundo_slippers.gif",
      item_description: "Orange always goes on the left foot!",
      item_type: "Clothes"
    };

    var item6 = {
      item_name: "Watch Out!",
      img_src: "http://images.neopets.com/items/book_watchout.gif",
      item_description: "Watch out, spooks are about Neopia. This book helps your pet learn how to avoid the nasty natives.",
      item_type: "Book"
    };

    var item7 = {
      item_name: "NeoMites Injection",
      img_src: "http://images.neopets.com/items/greeninjection.gif",
      item_description: "One dose of this and soon your pet will be critter-free.",
      item_type: "Medicine"
    };

    var item8 = {
      item_name: "Balloons",
      img_src: "http://images.neopets.com/items/gift_balloons.gif",
      item_description: "Beautiful balloons in all shapes and sizes.",
      item_type: "Gift"
    };

    var item9 = {
      item_name: "Angelpuss",
      img_src: "http://images.neopets.com/items/angelpuss.gif",
      item_description: "Angelpi are sweet adorable little kitties for your Neopet to look after.",
      item_type: "Petpet"
    };

    var item10 = {
      item_name: "Haiku Stamp",
      img_src: "http://images.neopets.com/items/stamp_island_haiku.gif",
      item_description: "Soft Blumaroo, life timeliness sees durable yesterday, gentle.",
      item_type: "Stamp"
    };


    var item12 = {
      item_name: "Bottle of Shenkuu Ink",
      img_src: "http://images.neopets.com/items/sch_shenkuu_bottleofink.gif",
      item_description: "Bottle of Shenkuu Ink",
      item_type: "School"
    };

    var item13 = {
      item_name: "Battle Faerie Dagger",
      img_src: "http://images.neopets.com/items/bd_battlefaerie_dagger.gif",
      item_description: "Swift, sharp and as light as a feather.",
      item_type: "Battle"
    };

    var item14 = {
      item_name: "Rain Water Shampoo ",
      img_src: "http://images.neopets.com/items/earth_faerie_shampoo.gif",
      item_description: "Clean and condition your pets hair with this wonderful rain water based shampoo.",
      item_type: "Grooming"
    };

    var item15 = {
      item_name: "Snowbunny (TCG)",
      img_src: "http://images.neopets.com/items/tcg_0226_CE29.gif",
      item_description: "This adorable little bunny just loves hopping through the snow.",
      item_type: "Trading Card"
    };

    // var item16 = {
    //   item_name: "",
    //   img_src: "",
    //   item_description: "",
    //   item_type: ""
    // };
    
    var items_list = [item1, item2, item3, item4, item5, item6, item7, item8, item9, item10];
    items_list = items_list.concat([item12, item13, item14, item15]);
    return items_list
  }

  // note: picked icons from semantic's selection and some are less ideal than others
  function get_type_icon(item_type) {
    item_type = item_type.toLowerCase();
    switch (item_type) {
      case "battle":
        return "trophy";
      case "book":
        return "book";
      case "clothes":
        return "umbrella";
      case "food":
        return "food";
      case "furniture":
        return "home";
      case "gift":
        return "gift";
      case "grooming":
        return "leaf";
      case "medicine":
        return "medkit";
      case "petpet":
        return "github";
      case "school":
        return "pencil";
      case "stamp":
        return "ticket";
      case "toy":
        return "gamepad";
      case "trading card":
        return "trello";
      default:
        return "star";
    }
  }

  function get_use_text(item_type) {
    item_type = item_type.toLowerCase();
    switch (item_type) {
      case "battle":
        return "equip...";
      case "book":
        return "read to...";
      case "clothes":
        return "dress...";
      case "food":
        return "feed...";
      case "furniture":
        return "put in home";
      case "grooming":
        return "groom...";
      case "medicine":
        return "cure...";
      case "petpet":
        return "give to...";
      case "stamp":
        return "put in stamp album";
      case "toy":
        return "play with...";
      case "trading card":
        return "put in neodeck";
      default:
        return -1;
    }
  }

  function make_ul_of_pets() {
    var html_txt = '<ul id="use_pet_list">';
    for (var i=0; i<user_pets.length; i++) {
      html_txt += '<li value="' + i + '">' + user_pets[i] + '</li>';
    }
    html_txt += '</ul>';
    return html_txt;
  }

  function is_pet_specific(item)  {
    var use_txt = get_use_text(item.item_type);
    if (use_txt == -1)  {
      return false;
    }
    return use_txt.endsWith('...');
  }

  // if x is in list, remove it, otherwise put it in
  function toggle_list(x, list) {
    var i = list.indexOf(x);
    var new_list = list.slice(0,list.length);
    if (i == -1)  {
      new_list.push(x);
    }
    else  {
      new_list.splice(i,1);
    }
    return new_list;
  }

  /*************************
   *** DISPLAY FUNCTIONS ***
   *************************/

  function populate_inventory_grid()  {
    var row_html = '';
    var cell_html = '';
    var i = 0;
    while (i < items.length)  {
      if (i%ROW_NUMBER == 0) {
        row_html = '<tr>';        
      }

      cell_html += '<td><div value="'+i+'"class="item" title="';
      cell_html += items[i].item_description + '"><div class="image">';
      cell_html += '<img src="' + items[i].img_src;
      cell_html += '"/><div class="type_label"><i class="';
      cell_html += get_type_icon(items[i].item_type);
      cell_html += ' icon"></i></div></div><h4 class="name">';
      cell_html += items[i].item_name;
      cell_html += '</h4></div></div></td>';

      row_html += cell_html;
      cell_html = '';
      i+= 1;

      if (i%ROW_NUMBER == 0) {
        row_html += '</tr>';
        $('#inventory_grid').append(row_html);
      }
    }

    // in case last row doesn't have ROW_NUMBER items
    if (i%ROW_NUMBER != 0)  {
      row_html += '</tr>';
      $('#inventory_grid').append(row_html);
    } 
  }

  function init() {
    // TODO: only have certain elements be tooltipped
    $(document).tooltip();
    items = make_item_objects();
    populate_inventory_grid();

    $('#item_action_menu').hide();

  }

  init();

  /*************************
   *** USER INTERACTIONS ***
   *************************/


  function format_use_action(item)  {
    var use_txt = get_use_text(item.item_type);
    if (use_txt == -1)  {
      $('#item_action_menu #use').hide();
    }
    else  {
      var use_html = '<i class="' + get_type_icon(item.item_type) + ' icon"></i>';
      use_html += use_txt;
      if (use_html.endsWith('...')) {
        use_html += make_ul_of_pets();
      }
      $('#item_action_menu #use').html(use_html);      
    }
  }

  // TODO: fix the god damn unequal height issue, preferrably
  // without murdering anyone.
  $(document).on('click','#inventory_grid .item', function() {
    $(this).toggleClass('selected');
    var item_value = parseInt($(this).attr('value'));
    selected_items = toggle_list(item_value,selected_items);

    // change item action menu accordingly
    if (selected_items.length == 0) {
      $('#item_action_menu').hide();      
    }
    else  {
      $('#item_action_menu').show();
      $('#num_items_selected_txt').html('You have ' + selected_items.length + ' item(s) selected.');
      if (selected_items.length == 1) {
        $('#item_action_menu #use').show();
        format_use_action(items[selected_items[0]]);
      }
      else  {
        $('#item_action_menu #use').hide();
      }      
    }

  });

  /***** 'USE' ITEM *****/
  $('#item_action_menu #use').click(function()  {
    // if this item is used by a specific pet
    var item_type = items[selected_items[0]].item_type;
    if (is_pet_specific(items[selected_items[0]])) {
      // do nothing I think
    }
    else  {
      use_item();
    }
  });

  $(document).on('click','#use_pet_list li', function() {
    var pet_id = $(this).attr('value');
    use_item(pet_id);
  });

  function use_item(pet_id)  {
    var item = selected_items[0];
    remove_item();
  }

  /***** 'SELL' ITEM *****/
  $('#sell_sub_menu').hide();
  $('#item_action_menu #sell').click(function()  {
    $('#sell_sub_menu').show();
    // needs to hide if something else is clicked
    // maybe use dropdown menu like thing instead?
  });

  function shop_item()  {
    
  }

  function auction_item() {

  }


  /***** 'DEPOSIT' ITEM *****/
  $('#item_action_menu #deposit').click(function()  {
    store_item();
  });

  function deposit_item()  {
    remove_item();
  }

  /***** 'DISPLAY' ITEM *****/
  $('#item_action_menu #display').click(function()  {
    display_item();
  });

  function display_item()  {
    remove_item();
  }

  /***** 'DONATE' ITEM *****/
  $('#item_action_menu #donate').click(function()  {
    donate_item();
  });

  function donate_item()  {
    remove_item();
  }

  // this is just for this mock-up! it would need some real database work
  function remove_item()  {
    for (var i=0; i<selected_items.length; i++) {
      items.splice(selected_items[i],1);
    }
    $('#inventory_grid').html('');
    populate_inventory_grid();
    $('#item_action_menu').hide();
    selected_items = [];
  }

  /***************
   *** TESTING ***
   ***************/

  function test_toggle_list() {
    var L = [1,2,3];
    L1 = toggle_list(0,L);
    console.log(L1 + ' [1,2,3,0]');
    L2 = toggle_list(1,L);
    console.log(L2 + ' [2,3]');
    L3 = toggle_list(1,[]);
    console.log(L3 + ' [1]');
  }

  // test_toggle_list();
})
/* TODO:
  {x} make example list of item objects:
        name, img, description, type, rarity?
        maybe get rid of weight/rarity/est. value
  {x} populate inventory grid with those example items
  {x} create item type icon system
  {x} link item view with item data
  {x} tooltip w/ item description
  {x} selecting an item toggles the 'selected' class
  {x} select multiple items + store in list
  {x} change 'num_items_selected_txt'
  {x} outline different user actions
  {x} only show 'use' option when exactly one item is selected
  {x} make a item_type to use text function
  {x} when 'sell' is selected, ask which type of sell
  
  {x} make 'use' text fit with the selected item's item type
  {x} when 'use' is selected, ask which pet (if applicable)
  {x} fix the bug where if you select items A then B and unselect A
      B's use text should be the one displayed
  { } should sort item_type by uses where item is gone when used
      { } think about partially used like omelette/jelly
      { } think about random events like broken toy
  {x} 'delete' items appropriately (for non-use/sell actions)
      NOTE: this is just a mockup, so it would have real actions instead of just removing
  {x} fix bug where clicking magically removes non-selected items
  { } do intutive stuff with shop/auction option modal dialog
  { } auction dialog:
    [ ] start price (np)
    [ ] min increment (np)
    [ ] auction length (spinner maybe?)
    [ ] neofriends only?
    [ ] submit
  { } confirmation on donate item dialog
  { } need to get rid of tooltip for dialog >.<
  Usability+CSS TODO:
  { } action menu should be more button-y
  MAYBE TODO:
  { } have filter by item type
  { } put undo feature
    
*/

/* NOTES:
  Uses:
    Furniture -> 'put in home'
    Game -> 'play with...' {each pet}
    Food -> 'feed...' {each pet}
    Medicine -> 'heal...' {each pet}
    Clothes -> 'clothe...' {each pet}
    Book -> 'read to...' {each pet}
    Petpet -> 'give to...' {each pet}
    Battle -> 'equip...' {each pet}
    Groom -> 'groom...' {each pet}
    Stamp -> 'put in stamp album'
    TC -> 'put in neodeck'
    Musical Instrument -> 'play with...' {each pet}
    Gift + School -> none.
  Item Type Ideas:
    Combine stamps + trading cards for collectables?
    Combine toys/games + musical instruments? DID
    Combine gift/school/special?
    Add petpetpet category?
  General:
    pets would be ordered by time obtained by user
*/