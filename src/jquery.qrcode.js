(function( $ ){
	$.fn.qrcode = function(options) {
		// if options is string, 
		if( typeof options === 'string' ){
			options	= { text: options };
		}

		// set default values
		options	= $.extend( {}, {
			width		: 256,
			height		: 256,
			typeNumber	: 4,
			correctLevel	: QRErrorCorrectLevel.H
		}, options);

		var createTable	= function(){
			// create the qrcode itself
			var qrcode	= new QRCode(options.typeNumber, options.correctLevel);
			var $table, $row, $col;
			var row, col;
			var tileS;
			var border_width = (options.width + options.height) / 20; // 10% of the average(width, height)
      
			qrcode.addData(options.text);
			qrcode.make();
			
			// create table element
			$table	= $('<table></table>')
				.css("width", options.width+"px")
				.css("height", options.height+"px")
				.css("border", "0px")
				.css("border-collapse", "collapse")
				.css("margin", border_width+"px")
				.css('background-color', "#ffffff");
		  
			// compute tileS percentage
			tileS	= 100 / qrcode.getModuleCount();

			// draw in the table
			for(row = 0; row < qrcode.getModuleCount(); row++ ){
				$row = $('<tr></tr>').css('height', tileS+"%").appendTo($table);
				
				for(col = 0; col < qrcode.getModuleCount(); col++ ){
  				$col = $('<td></td>').css('width', tileS+"%").appendTo($row);
	  			$col.css('background-color', qrcode.isDark(row, col) ? "#000000" : "#ffffff");
				}	
			}
			// return just built canvas
			return $table;
		}
  
		return this.each(function(){
			var table	= createTable();
			jQuery(table).appendTo(this);
		});
	};
})( jQuery );