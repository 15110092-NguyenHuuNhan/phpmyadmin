/* vim: set expandtab sw=4 ts=4 sts=4: */
/**
 * for server_synchronize.php 
 *
 */

// Global variable row_class is set to even
var row_class = 'even';

/**
* Generates a row dynamically in the differences table displaying
* the complete statistics of difference in  table like number of
* rows to be updated, number of rows to be inserted, number of
* columns to be added, number of columns to be removed, etc.
*
* @param  index         index of matching table
* @param  update_size   number of rows/column to be updated
* @param  insert_size   number of rows/coulmns to be inserted
* @param  remove_size   number of columns to be removed
* @param  insert_index  number of indexes to be inserted
* @param  remove_index  number of indexes to be removed
* @param  img_obj       image object
* @param  table_name    name of the table
*/

function showDetails(i, update_size, insert_size, remove_size, insert_index, remove_index, img_obj, table_name)
{
    // a jQuery object
    var $img = $(img_obj);

    $img.toggleClass('selected');

    // The image source is changed when the showDetails function is called.
    if ($img.hasClass('selected')) {
        if ($img.hasClass('struct_img')) {
            $img.attr('src', pmaThemeImage + 'new_struct_selected.jpg');
        }
        if ($img.hasClass('data_img')) {
            $img.attr('src', pmaThemeImage + 'new_data_selected.jpg');
        }
    } else {
        if ($img.hasClass('struct_img')) {
            $img.attr('src', pmaThemeImage + 'new_struct.jpg');
        }
        if ($img.hasClass('data_img')) {
            $img.attr('src', pmaThemeImage + 'new_data.jpg');
        }
    }

    var div = document.getElementById("list");
    var table = div.getElementsByTagName("table")[0];
    var table_body = table.getElementsByTagName("tbody")[0];

    //Global variable row_class is being used
    if (row_class == 'even') {
        row_class = 'odd';
    } else {
        row_class = 'even';
    }
    // If the red or green button against a table name is pressed then append a new row to show the details of differences of this table.
    if ($img.hasClass('selected')) {
        var newRow = document.createElement("tr");
        newRow.setAttribute("class", row_class);
        newRow.className = row_class;
        // Id assigned to this row element is same as the index of this table name in the  matching_tables/source_tables_uncommon array
        newRow.setAttribute("id" , i);

        var table_name_cell = document.createElement("td");
        table_name_cell.align = "center";
        table_name_cell.innerHTML = table_name ;

        newRow.appendChild(table_name_cell);

        var create_table = document.createElement("td");
        create_table.align = "center";

        var add_cols = document.createElement("td");
        add_cols.align = "center";

        var remove_cols = document.createElement("td");
        remove_cols.align = "center";

        var alter_cols = document.createElement("td");
        alter_cols.align = "center";

        var add_index = document.createElement("td");
        add_index.align = "center";

        var delete_index = document.createElement("td");
        delete_index.align = "center";

        var update_rows = document.createElement("td");
        update_rows.align = "center";

        var insert_rows = document.createElement("td");
        insert_rows.align = "center";

        var tick_image = document.createElement("img");
        tick_image.src = pmaThemeImage + "s_success.png";

        if (update_size == '' && insert_size == '' && remove_size == '') {
          /**
          This is the case when the table needs to be created in target database.
          */
            create_table.appendChild(tick_image);
            add_cols.innerHTML = "--";
            remove_cols.innerHTML = "--";
            alter_cols.innerHTML = "--";
            delete_index.innerHTML = "--";
            add_index.innerHTML = "--";
            update_rows.innerHTML = "--";
            insert_rows.innerHTML = "--";

            newRow.appendChild(create_table);
            newRow.appendChild(add_cols);
            newRow.appendChild(remove_cols);
            newRow.appendChild(alter_cols);
            newRow.appendChild(delete_index);
            newRow.appendChild(add_index);
            newRow.appendChild(update_rows);
            newRow.appendChild(insert_rows);

        } else if (update_size == '' && remove_size == '') {
           /**
           This is the case when data difference is displayed in the
           table which is present in source but absent from target database
          */
            create_table.innerHTML = "--";
            add_cols.innerHTML = "--";
            remove_cols.innerHTML = "--";
            alter_cols.innerHTML = "--";
            add_index.innerHTML = "--";
            delete_index.innerHTML = "--";
            update_rows.innerHTML = "--";
            insert_rows.innerHTML = insert_size;

            newRow.appendChild(create_table);
            newRow.appendChild(add_cols);
            newRow.appendChild(remove_cols);
            newRow.appendChild(alter_cols);
            newRow.appendChild(delete_index);
            newRow.appendChild(add_index);
            newRow.appendChild(update_rows);
            newRow.appendChild(insert_rows);

        } else if (remove_size == '') {
            /**
             This is the case when data difference between matching_tables is displayed.
            */
            create_table.innerHTML = "--";
            add_cols.innerHTML = "--";
            remove_cols.innerHTML = "--";
            alter_cols.innerHTML = "--";
            add_index.innerHTML = "--";
            delete_index.innerHTML = "--";
            update_rows.innerHTML = update_size;
            insert_rows.innerHTML = insert_size;

            newRow.appendChild(create_table);
            newRow.appendChild(add_cols);
            newRow.appendChild(remove_cols);
            newRow.appendChild(alter_cols);
            newRow.appendChild(delete_index);
            newRow.appendChild(add_index);
            newRow.appendChild(update_rows);
            newRow.appendChild(insert_rows);

        } else {
            /**
            This is the case when structure difference between matching_tables id displayed
            */
            create_table.innerHTML = "--";
            add_cols.innerHTML = insert_size;
            remove_cols.innerHTML = remove_size;
            alter_cols.innerHTML = update_size;
            delete_index.innerHTML = remove_index;
            add_index.innerHTML = insert_index;
            update_rows.innerHTML = "--";
            insert_rows.innerHTML = "--";

            newRow.appendChild(create_table);
            newRow.appendChild(add_cols);
            newRow.appendChild(remove_cols);
            newRow.appendChild(alter_cols);
            newRow.appendChild(delete_index);
            newRow.appendChild(add_index);
            newRow.appendChild(update_rows);
            newRow.appendChild(insert_rows);
        }
        table_body.appendChild(newRow);

    } else {
      //The case when the row showing the details need to be removed from the table i.e. the difference button is deselected now.
        var table_rows = table_body.getElementsByTagName("tr");
        var j;
        var index = 0;
        for (j=0; j < table_rows.length; j++)
        {
            if (table_rows[j].id == i) {
                index = j;
                table_rows[j].parentNode.removeChild(table_rows[j]);
            }
        }
        //The table row css is being adjusted. Class "odd" for odd rows and "even" for even rows should be maintained.
        for(index = 0; index < table_rows.length; index++)
        {
            row_class_element = table_rows[index].getAttribute('class');
            if (row_class_element == "even") {
                table_rows[index].setAttribute("class","odd");  // for Mozilla firefox
                table_rows[index].className = "odd";            // for IE browser
            } else {
                table_rows[index].setAttribute("class","even"); // for Mozilla firefox
                table_rows[index].className = "even";           // for IE browser
            }
        }
    }
}

/**
 * Generates the URL containing the list of selected table ids for synchronization and
 * a variable checked for confirmation of deleting previous rows from target tables
 *
 * @param   token   the token generated for each PMA form
 *
 */
function ApplySelectedChanges(token)
{
    var div =  document.getElementById("list");
    var table = div.getElementsByTagName('table')[0];
    var table_body = table.getElementsByTagName('tbody')[0];
    // Get all the rows from the details table
    var table_rows = table_body.getElementsByTagName('tr');
    var x = table_rows.length;
    var i;
    /**
     Append the token at the beginning of the query string followed by
    Table_ids that shows that "Apply Selected Changes" button is pressed
    */
    var append_string = "?token="+token+"&Table_ids="+1;
    for(i=0; i<x; i++){
           append_string += "&";
           append_string += i+"="+table_rows[i].id;
    }

    // Getting the value of checkbox delete_rows
    var checkbox = document.getElementById("delete_rows");
    if (checkbox.checked){
        append_string += "&checked=true";
    } else {
         append_string += "&checked=false";
    }
    //Appending the token and list of table ids in the URL
    location.href += token;
    location.href += append_string;
}

/**
* Displays an error message if any text field
* is left empty other than the port field.
*
* @param  string   the form name
* @param  object   the form
*
* @return  boolean  whether the form field is empty or not
*/
function validateConnection(form_name, form_obj)
{
    var check = true;
    var src_hostfilled = true;
    var trg_hostfilled = true;

    for (var i=1; i<form_name.elements.length; i++)
    {
        // All the text fields are checked excluding the port field because the default port can be used.
        if ((form_name.elements[i].type == 'text') && (form_name.elements[i].name != 'src_port') && (form_name.elements[i].name != 'trg_port')) {
            check = emptyFormElements(form_obj, form_name.elements[i].name);
            if (check==false) {
                element = form_name.elements[i].name;
                if (form_name.elements[i].name == 'src_host') {
                    src_hostfilled = false;
                    continue;
                }
                if (form_name.elements[i].name == 'trg_host') {
                    trg_hostfilled = false;
                    continue;
                }
                if ((form_name.elements[i].name == 'src_socket' && src_hostfilled==false) || (form_name.elements[i].name == 'trg_socket' && trg_hostfilled==false))
                    break;
                else
                    continue;
            }
        }
    }
    if (!check) {
        form_obj.reset();
        element.select();
        alert(PMA_messages['strFormEmpty']);
        element.focus();
    }
    return check;
}

$(document).ready(function() {
    $('.server_selector').change(function(evt) {
        var server = $(evt.target).val();
        if (server == 'cur') {
            $(this).closest('tbody').children('.current-server').css('display', '');
            $(this).closest('tbody').children('.remote-server').css('display', 'none');
        } else if (server == 'rmt') {
            $(this).closest('tbody').children('.current-server').css('display', 'none');
            $(this).closest('tbody').children('.remote-server').css('display', '');
        } else {
            $(this).closest('tbody').children('.current-server').css('display', 'none');
            $(this).closest('tbody').children('.remote-server').css('display', '');
            var parts = server.split('||||');
            $(this).closest('tbody').find('.server-host').val(parts[0]);
            $(this).closest('tbody').find('.server-port').val(parts[1]);
            $(this).closest('tbody').find('.server-socket').val(parts[2]);
            $(this).closest('tbody').find('.server-user').val(parts[3]);
            $(this).closest('tbody').find('.server-pass').val('');
            $(this).closest('tbody').find('.server-db').val(parts[4])
        }
    });

    $('.struct_img').hover( 
        // pmaThemeImage comes from js/messages.php
        function() {
            // mouse enters the element
            var $img = $(this);
            $img.addClass('hover');
            if ($img.hasClass('selected')) {
                $img.attr('src', pmaThemeImage + 'new_struct_selected_hovered.jpg');
            } else {
                $img.attr('src', pmaThemeImage + 'new_struct_hovered.jpg');
            }
        },
        function() {
            // mouse leaves the element
            var $img = $(this);
            $img.removeClass('hover');
            if ($img.hasClass('selected')) {
                $img.attr('src', pmaThemeImage + 'new_struct_selected.jpg');
            } else {
                $img.attr('src', pmaThemeImage + 'new_struct.jpg');
            }
        }
    );

    $('.data_img').hover( 
        function() {
            // mouse enters the element
            var $img = $(this);
            $img.addClass('hover');
            if ($img.hasClass('selected')) {
                $img.attr('src', pmaThemeImage + 'new_data_selected_hovered.jpg');
            } else {
                $img.attr('src', pmaThemeImage + 'new_data_hovered.jpg');
            }
        },
        function() {
            // mouse leaves the element
            var $img = $(this);
            $img.removeClass('hover');
            if ($img.hasClass('selected')) {
                $img.attr('src', pmaThemeImage + 'new_data_selected.jpg');
            } else {
                $img.attr('src', pmaThemeImage + 'new_data.jpg');
            }
        }
    );

});
