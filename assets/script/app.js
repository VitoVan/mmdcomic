
function manga_init()
{
	//console.log( mododata.mboxes );
	for( var i = 0 ; i <  mododata.mboxes.length ; i++ )
	{
		var mbox = mododata.mboxes[i];

		$('<li class="grid" id="mbox_' + mbox.id + '" data-bid="'+ mbox.id +'"><canvas id="mcanvas_'+ mbox.id +'"></canvas></li>').appendTo($('.manga'));	
	}

	$('.manga').on( 'click' , 'li' , function()
	{
		
		$('.manga li').removeClass('active');
		
		$(this).addClass('active');
		sidebar_show( $(this) );
		mododata.active_box_id = parseInt($(this).data('bid'));

		if( !mododata.fcanvas || !mododata.fcanvas[mododata.active_box_id] )
		{
			mododata.fcanvas[mododata.active_box_id] = new fabric.Canvas('mcanvas_'+mododata.active_box_id);
			mododata.fcanvas[mododata.active_box_id].setDimensions({width:700,height:400});
		}

		$(".fclayers").removeClass('active');

		if( $("#fclayers-"+mododata.active_box_id).length < 1 )
			$('<ul class="fclayers" id="fclayers-' + mododata.active_box_id + '"></ul>').appendTo($("#layer .content"));

		$("#fclayers-"+mododata.active_box_id).addClass('active');
		//if(  )
		
		//console.log( this );
	} );
	
}

function clipboard_init()
{
	document.addEventListener('paste', function (e) 
	{
	  if( mododata.active_box_id > 0 && mododata.fcanvas[mododata.active_box_id] )
	  {
	  	if (e.clipboardData) 
	  	{
	      // Get the items from the clipboard
	      var blob = null;
	      var items = e.clipboardData.items;
	      if (items) 
	      {
	         console.log(items);
	  	
	         // Loop through all items, looking for any kind of image
	         for (var i = 0; i < items.length; i++) 
	         {
	            console.log(items[i]);
	            if (items[i].type.indexOf("image") !== -1) 
	            {
	               // We need to represent the image as a file,
	               blob = items[i].getAsFile();
	            }

	            if (blob !== null) 
	            {
				    var reader = new FileReader();
				    reader.onload = function(event) 
				    {
				      
				      //console.log(event.target.result); // data url!
				      fabric.Image.fromURL( event.target.result , function( oImg ) 
						{
					  		mododata.fcanvas[mododata.active_box_id].add(oImg);
							
							// 将图片对象保存到数组
							mododata.darkobj_count++;
							var  doid = mododata.darkobj_count;
							oImg.doid = doid;
							mododata.darkobjs[doid] = oImg;

							oImg.on('selected' , function()
							{
								$('.fclayer').removeClass('active');
								$('#fclayer-'+this.doid).addClass('active');
								props_show( doid , 'image' );
								//console.log( this );
							});

							layer_insert( '剪贴板图片' , doid , 'image' );

					  		
						});	
				    };
				    reader.readAsDataURL(blob);
				  }
	    		}
	    	  }
	    	}		
	  	}
	  
      
		});
}

function key_init()
{
	mododata.listener = new window.keypress.Listener();
	mododata.listener.simple_combo( 'delete' , function()
	{
		if( mododata.active_box_id > 0 && mododata.fcanvas[mododata.active_box_id] )
		{
			var obj = null;
			if( obj = mododata.fcanvas[mododata.active_box_id].getActiveObject())
			{
				if( obj['doid'] )
				{
					$('#fclayer-'+obj['doid']).remove();
					//alert(obj['doid']);
					//mododata.darkobjs[obj['doid']].remove();
				}

				obj.remove();
			}
			else
			{
				var groups = null;
				if( groups = mododata.fcanvas[mododata.active_box_id].getActiveGroup())
				{
					groups.forEachObject(function(obj)
					{ 
						if( obj['doid'] )
						{
							$('#fclayer-'+obj['doid']).remove();
							//alert(obj['doid']);
							//mododata.darkobjs[obj['doid']].remove();
						}

						obj.remove();

					});

					groups.remove();
				}
			}
			

			//console.log( obj );
			
		}
		//alert('del!');
	} );

	mododata.listener.simple_combo( 'cmd [' , function()
	{
		if( mododata.active_box_id > 0 && mododata.fcanvas[mododata.active_box_id] )
		{
			var obj = null;
			if( obj = mododata.fcanvas[mododata.active_box_id].getActiveObject())
			{
				if(obj['doid'])
					move_up( $( "#fclayer-"+obj['doid'] ) ); 
				else
					obj.bringForward();
			}
		}	
	} );

	mododata.listener.simple_combo( 'cmd ]' , function()
	{
		if( mododata.active_box_id > 0 && mododata.fcanvas[mododata.active_box_id] )
		{
			var obj = null;
			if( obj = mododata.fcanvas[mododata.active_box_id].getActiveObject())
			{
				if(obj['doid'])
					move_down( $( "#fclayer-"+obj['doid'] ) ); 
				else
					obj.sendBackwards();
			}
		}	
	} );

	mododata.listener.simple_combo( 'esc' , function()
	{
		if( mododata.active_box_id > 0 && mododata.fcanvas[mododata.active_box_id] )
			mododata.fcanvas[mododata.active_box_id].discardActiveObject();

		//mododata.active_box_id = 0;
		$(".manga .grid").removeClass('active');
		$(".sidebar").hide();		
	} );
}

function mtlog( text )
{
	var li = $("<li></li>");
	li.text(text);
	$(li).prependTo($("#output .loglist"));
}

function sidebar_init()
{
	for( var i = 0 ; i <  mododata.mttabs.length ; i++ )
	{
		var mttab = mododata.mttabs[i];
		$('<span class="' + mttab.icon +'" title="' + mttab.cname + '" onClick="mt_box(\''+mttab.name+'\')" ></span>').appendTo($('.sidebar'));	
	}

	// 添加自由作画按钮
	$('<span class="moicon-gesture" title="手绘" onClick="mt_draw_toggle()" ></span>').appendTo($('.sidebar'));

	// 添加合并图层的按钮
	$('<span class="moicon-vertical_align_center" title="合并图层" onClick="mt_box_merge()" ></span>').appendTo($('.sidebar'));

	// 添加预览图片按钮
	$('<span class="moicon-photo_filter" title="单图预览" onClick="mt_image_preview()" ></span>').appendTo($('.sidebar'));	

	// 添加上移图层的按钮
	// moicon-expand_less
	$('<span class="moicon-publish" title="上移画框" onClick="mt_box_up()" ></span>').appendTo($('.sidebar'));

	
}

function mt_box_up()
{
	//alert('up');
	var aid = mododata.active_box_id;
	var item = $("#mbox_"+aid);
	if(before = item.prev())
    {
    	item.insertBefore(before);
    } 
}

function mt_box( name )
{
	$('.mtdiv').show();
	$('.mtdiv a[href="#'+name+'"]').tab('show');
}

function mo3d_box( name )
{
	var p = $("#mbox_"+mododata.active_box_id).position();
	// var draggie = new Draggabilly( '.mo3ddiv', 
	// {
 //  		//handle:'.thehandle'
	// });
	$('.mo3ddiv').dragon();
	
	$('.mo3ddiv').show();
	$('.mo3ddiv a[href="#'+name+'"]').tab('show');
}

function mt_draw_toggle()
{
	// active
	//console.log(mododata.fcanvas);
	if( mododata.fcanvas[mododata.active_box_id].isDrawingMode )
	{
		$("span.moicon-gesture").removeClass('active');
	}
	else
	{
		$("span.moicon-gesture").addClass('active');
	}
	mododata.fcanvas[mododata.active_box_id].isDrawingMode = ! mododata.fcanvas[mododata.active_box_id].isDrawingMode;
}

function mt_image_preview()
{
	mododata.fcanvas[mododata.active_box_id].discardActiveObject();
	window.open(mododata.fcanvas[mododata.active_box_id].toDataURL());
}

function mt_box_merge()
{
	mododata.fcanvas[mododata.active_box_id].discardActiveObject();
	var dataurl = mododata.fcanvas[mododata.active_box_id].toDataURL();
	mododata.fcanvas[mododata.active_box_id].clear();
	$("#fclayers-"+mododata.active_box_id+" li").remove();

	_mt_add_image( mododata.fcanvas[mododata.active_box_id] , dataurl , '合并后的图层' );
}

function mt_image_save( preview )
{
	// 计算画格数量
	var count = $(".manga .grid").length;

	// 创建一个隐藏的画布
	$('<canvas id="tp_canvas" class="hide"></canvas>').appendTo($('body'));

	// 设置画布宽高
	var fcan = new fabric.Canvas('tp_canvas');
	var theheight = 400*count;
	var i = 0;
	fcan.setDimensions({'width':700,'height':theheight});
	//console.log(fcan);

	$(".manga .grid").each(function()
	{
		var aid = $(this).data('bid');
		mododata.fcanvas[aid].discardActiveObject();
		
		var dataurl = mododata.fcanvas[aid].toDataURL();
		//window.open(dataurl);
		console.log(fcan);
		fabric.Image.fromURL( dataurl , function( oImg ) 
		{
	  		console.log(fcan);
		
	  		oImg.top = i*400;
	  		i++;
	  		fcan.add( oImg );
		});	

		//console.log( $(this).data('bid') );
	});

	setTimeout( function()
	{
		//mododata.fcanvas[mododata.active_box_id].discardActiveObject();
		var thedata = fcan.toDataURL();
		if( preview )
			window.open( thedata );
		else
			downloadURI( thedata , 'modo.out.'+Date.now()+'.png' );
		
		fcan.dispose();
		fcan = null;
		$("#tp_canvas").parent().remove();
	} , 100 );
}	


function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  link.click();
}

function mt_box_close()
{
	$('.mtdiv').hide();
}

function mo3d_box_close()
{
	$('.mo3ddiv').hide();
}

function mo3d_box_init()
{
	if( mododata.mo3dlist == null )
	{
		// 读取全部数据
		$.get( '/mt/vpd'  , { } , function( data )
		{
			// 先缓存到本地
			mododata.mo3dlist = data.data;

			// 初始化tab
			for( var i = 0 ; i <  mododata.mo3dtabs.length ; i++ )
			{
				var mo3dtab = mododata.mo3dtabs[i];

				$('<li role="presentation" ><a href="#' + mo3dtab.name + '" aria-controls="' + mo3dtab.name + '" data-toggle="tab" role="tab"><span class="' + mo3dtab.icon + '"></span></a></li>').appendTo($(".mo3dlist"));
			}

			// 初始化面板
			for( key in mododata.mo3dlist )
			{
				//console.log( mododata.mtlist[key] );
				var mhtml = '<div role="tabpanel" class="tab-pane" id="'+ key +'">';
				for( var i = 0 ; i <  mododata.mo3dlist[key].length ; i++ )
				{
					var o = mododata.mo3dlist[key][i];

					mhtml += '<div class="mtitem" onClick="mo3d_select( \'' + o.name + '\' , \'' + o.cate + '\' , \'' + o.resource_url + '\' );"><img  src="' + o.image_url + '" class="item" title="' + o.name + '"/> </div>';
				}

				mhtml += '</div>';
				
				$(mhtml).appendTo( $('.mo3dlistcontent') );

		    	// mtlistcontent
			}

			

			// 然后添加mtbox的item list

		} );
	}
}

function mo3d_select( name , cate , resource_url )
{
	// mo3d因为要预览，所以不自动关闭
	//alert( resource_url );
	var ifid = mododata.iframe_count;
	$("#mo3diframe_"+ifid)[0].contentWindow.load_pose(resource_url);
	// load_pose
}

function mt_box_init()
{
	if( mododata.mtlist == null )
	{
		// 读取全部数据
		$.get( '/mt/list'  , { } , function( data )
		{
			// 先缓存到本地
			mododata.mtlist = data.data;

			// 初始化tab
			for( var i = 0 ; i <  mododata.mttabs.length ; i++ )
			{
				var mttab = mododata.mttabs[i];

				$('<li role="presentation" ><a href="#' + mttab.name + '" aria-controls="' + mttab.name + '" data-toggle="tab" role="tab"><span class="' + mttab.icon + '"></span></a></li>').appendTo($(".mtlist"));
			}

			// 初始化面板
			for( key in mododata.mtlist )
			{
				//console.log( mododata.mtlist[key] );
				var mhtml = '<div role="tabpanel" class="tab-pane" id="'+ key +'">';
				for( var i = 0 ; i <  mododata.mtlist[key].length ; i++ )
				{
					var o = mododata.mtlist[key][i];

					mhtml += '<div class="mtitem" onClick="mt_item_insert( \'' + o.name + '\' , \'' + o.cate + '\' , \'' + o.resource_url + '\' );"><img  src="' + o.image_url + '" class="item" title="' + o.name + '"/> </div>';
				}

				mhtml += '</div>';
				
				$(mhtml).appendTo( $('.mtlistcontent') );

		    	// mtlistcontent
			}

			

			// 然后添加mtbox的item list

		} );
	}
}

function _mt_add_image( canvas , mres , name )
{
	fabric.Image.fromURL( mres , function( oImg ) 
		{
	  		canvas.add(oImg);
			
			// 将图片对象保存到数组
			mododata.darkobj_count++;
			var  doid = mododata.darkobj_count;
			oImg.doid = doid;
			mododata.darkobjs[doid] = oImg;

			oImg.on('selected' , function()
			{
				$('.fclayer').removeClass('active');
				$('#fclayer-'+this.doid).addClass('active');
				props_show( doid , 'image' );
				//console.log( this );
			});

			layer_insert( name , doid , 'image' );
		});	
}

function mt_item_insert( mname , mcate , mres )
{
	mt_box_close();

	// 检查当前活动box是否已经初始化了fcanvas
	if( !mododata.fcanvas || !mododata.fcanvas[mododata.active_box_id] )
	{
		mododata.fcanvas[mododata.active_box_id] = new fabric.Canvas('mcanvas_'+mododata.active_box_id);
		mododata.fcanvas[mododata.active_box_id].setDimensions({width:700,height:400});
	}

	if( mcate == 'role' )
	{
		//alert( mname + '~' + mcate + '~' +mres );
		// 进入3D模式
		// 首先取得画布的位置
		var aid = mododata.active_box_id;
		var p = $("#mbox_"+aid).offset();
		
		console.log(p);
		// top , left
		var thewidth = $("#mbox_"+aid).width();
		var theheight = $("#mbox_"+aid).height(); 

		// 然后创建一个iframe,
		mododata.iframe_count++;
		var ifid = mododata.iframe_count;
		$('<iframe class="mo3diframe" id="mo3diframe_'+ ifid +'"></iframe>').appendTo($('body'));

		$("#mo3diframe_"+ifid).css('width',thewidth);
		$("#mo3diframe_"+ifid).css('height',theheight);
		$("#mo3diframe_"+ifid).css('top',p.top);
		$("#mo3diframe_"+ifid).css('left',p.left);

		$("#mo3diframe_"+ifid).attr('src','/mt/mmd/?url='+encodeURIComponent( mres ));

		$('#rolebtn').css( 'top' , p.top - 40 );
		$('#rolebtn').css( 'left' , p.left + thewidth - $('#rolebtn').width() - 5 );
		$('#rolebtn').css('display','block');
		$('#overlay').css('display','block');

		$("span.moicon-accessibility").addClass('active');

		setTimeout( function()
		{
			$("#mo3diframe_"+ifid)[0].contentWindow.scrollTo(350 , 200);
		} , 2000 );
		
	}

	if( mcate == 'mo3d' )
	{
		//alert( mname + '~' + mcate + '~' +mres );
		// 进入3D模式
		// 首先取得画布的位置
		var aid = mododata.active_box_id;
		var p = $("#mbox_"+aid).offset();
		
		// top , left
		var thewidth = $("#mbox_"+aid).width();
		var theheight = $("#mbox_"+aid).height(); 

		// 然后创建一个iframe,
		mododata.iframe_count++;
		var ifid = mododata.iframe_count;
		$('<iframe class="mo3diframe" id="mo3diframe_'+ ifid +'"></iframe>').appendTo($('body'));

		$("#mo3diframe_"+ifid).css('width',thewidth);
		$("#mo3diframe_"+ifid).css('height',theheight);
		$("#mo3diframe_"+ifid).css('top',p.top);
		$("#mo3diframe_"+ifid).css('left',p.left);

		$("#mo3diframe_"+ifid).attr('src','/mt/mmd/?url='+encodeURIComponent( mres ));

		$('#mo3dbtn').css( 'top' , p.top - 40 );
		$('#mo3dbtn').css( 'left' , p.left + thewidth - $('#mo3dbtn').width() - 5 );
		$('#mo3dbtn').css('display','block');
		$('#overlay').css('display','block');

		$("span.moicon-3d_rotation").addClass('active');

		setTimeout( function()
		{
			$("#mo3diframe_"+ifid)[0].contentWindow.scrollTo(350 , 200);
		} , 2000 );
		
	}



	if( mcate == 'frame' || mcate == 'talk' || mcate == 'symbol' )
	{
		fabric.loadSVGFromURL( mres , function( objects ) 
		{
			for(var i = 0;i < objects.length;i++)
			{
				
				var obj = objects[i];
				
				mododata.darkobj_count++;
				var  doid = mododata.darkobj_count;
				obj.doid = doid;
				mododata.darkobjs[doid] = obj;

				obj.on('selected' , function()
				{
					$('.fclayer').removeClass('active');
					$('#fclayer-'+this.doid).addClass('active');
					//console.log( this );
				});

				layer_insert( basename(mres)+'-'+(i+1) , doid , mcate );
				mododata.fcanvas[mododata.active_box_id].add(obj);		
				
			}
		});

	}

	if( mcate == 'image' )
	{
		_mt_add_image( mododata.fcanvas[mododata.active_box_id] , mres , basename(mres) );

		// fabric.Image.fromURL( mres , function( oImg ) 
		// {
	 //  		mododata.fcanvas[mododata.active_box_id].add(oImg);
			
		// 	// 将图片对象保存到数组
		// 	mododata.darkobj_count++;
		// 	var  doid = mododata.darkobj_count;
		// 	oImg.doid = doid;
		// 	mododata.darkobjs[doid] = oImg;

		// 	oImg.on('selected' , function()
		// 	{
		// 		$('.fclayer').removeClass('active');
		// 		$('#fclayer-'+this.doid).addClass('active');
		// 		props_show( doid , 'image' );
		// 		//console.log( this );
		// 	});

		// 	layer_insert( basename(mres) , doid , mcate );

	  		
		// });	
	}

	if( mcate == 'text' )
	{
		// mres 字段重用为字体类型
		if( mres == 'textbox' )
		{
			var textbox = new fabric.Textbox("我是40号字");

			mododata.fcanvas[mododata.active_box_id].add(textbox);

			mododata.darkobj_count++;
			var  doid = mododata.darkobj_count;
			textbox.doid = doid;
			mododata.darkobjs[doid] = textbox;

			textbox.on('selected' , function()
			{
				$('.fclayer').removeClass('active');
				$('#fclayer-'+this.doid).addClass('active');
				props_show( doid , 'textbox' );
				
			});

			console.log( textbox );

			layer_insert( 'TextBox' , doid , mcate );
		}
	}
}

function role_save()
{
	var ifid = mododata.iframe_count;
	var dataurl = $("#mo3diframe_"+ifid).contents().find('#mbox')[0].toDataURL();
	var p = $($("#mo3diframe_"+ifid).contents().find('#mbox')[0]).position();
	

	$("#mo3diframe_"+ifid).remove();
	$('#rolebtn').css('display','none');
	$('#overlay').css('display','none');
	$("span.moicon-accessibility").removeClass('active');

	fabric.Image.fromURL( dataurl , function( oImg ) 
	{
  		oImg.left = p.left - 350;
  		oImg.top = p.top - 200;

  		mododata.fcanvas[mododata.active_box_id].add(oImg);
		
		// 将图片对象保存到数组
		mododata.darkobj_count++;
		var  doid = mododata.darkobj_count;
		oImg.doid = doid;
		mododata.darkobjs[doid] = oImg;

		oImg.on('selected' , function()
		{
			$('.fclayer').removeClass('active');
			$('#fclayer-'+this.doid).addClass('active');
			props_show( doid , 'image' );
			//console.log( this );
		});

		layer_insert( 'MMD' , doid , 'role' );
	
	});	
}

function mo3d_save()
{
	var ifid = mododata.iframe_count;
	var dataurl = $("#mo3diframe_"+ifid).contents().find('#mbox')[0].toDataURL();
	var p = $($("#mo3diframe_"+ifid).contents().find('#mbox')[0]).position();
	

	$("#mo3diframe_"+ifid).remove();
	$('#mo3dbtn').css('display','none');
	$('#overlay').css('display','none');
	$("span.moicon-3d_rotation").removeClass('active');

	fabric.Image.fromURL( dataurl , function( oImg ) 
	{
  		oImg.left = p.left - 350;
  		oImg.top = p.top - 200;

  		mododata.fcanvas[mododata.active_box_id].add(oImg);
		
		// 将图片对象保存到数组
		mododata.darkobj_count++;
		var  doid = mododata.darkobj_count;
		oImg.doid = doid;
		mododata.darkobjs[doid] = oImg;

		oImg.on('selected' , function()
		{
			$('.fclayer').removeClass('active');
			$('#fclayer-'+this.doid).addClass('active');
			props_show( doid , 'image' );
			//console.log( this );
		});

		layer_insert( '3D' , doid , 'mo3d' );
	
	});	
}

function props_show( doid , type )
{
	// 检查当前doid对应的UL是否存在
	console.log( $("#proplist-"+doid).length );

	$(".proplist").removeClass('active');

	if( $("#proplist-"+doid).length < 1 )
	{
		$('<ul class="proplist active" id="proplist-'+ doid +'"></ul>').appendTo($("#prop .content"));
	}
	else
	{
		$("#proplist-"+doid).addClass('active');
	}


	if( type == 'textbox' )
	{
		console.log('IMIN');
		props_set( doid , '字号' , 'fontSize' );
		props_set( doid , '字体' , 'fontFamily' );
		props_set( doid , '文字' , 'text' );
		props_set( doid , '字重' , 'fontWeight' );
		props_set( doid , '颜色' , 'fill' );
		//props_set( doid , '宽度' , 'width' );
		//props_set( doid , '高度' , 'height' );

		$("#proplist-"+doid+" .prop-item input").on( 'change' , function()
		{
			var valuefix = $(this).parent().data('valuefix');
			console.log(valuefix);
			mododata.darkobjs[doid][valuefix] = $(this).val();
			console.log(mododata.darkobjs[doid]);
			mododata.fcanvas[mododata.active_box_id].renderAll();

			//console.log('changed');
			//console.log(this);
		} );
	}

	// opacity
	if( type == 'image' )
	{
		//console.log('IMIN');
		props_set( doid , '透明度' , 'opacity' );
		

		$("#proplist-"+doid+" .prop-item input").on( 'change' , function()
		{
			var valuefix = $(this).parent().data('valuefix');
			//console.log(valuefix);
			mododata.darkobjs[doid][valuefix] = $(this).val();
			//console.log(mododata.darkobjs[doid]);
			mododata.fcanvas[mododata.active_box_id].renderAll();

			//console.log('changed');
			//console.log(this);
		} );
	}
}

function props_set( doid , name , valuefix )
{
	var value = mododata.darkobjs[doid][valuefix];
	var noname = true;
	$("#proplist-"+doid+" .prop-item").each(function()
	{
		if( $(this).data('name') == name )
		{
			noname = false;
			$(this).find('input').val(value);	
		}
	});

	console.log('Noname='+noname);
	if( noname )
	{
		$('<li class="prop-item" data-valuefix="' + valuefix + '" data-name="' + name + '"><label>' + name + '</label><input type="text" value="' + value + '" /></li>').appendTo($("#proplist-"+doid));
	}
	
	//alert( name + '~' + value );
}



function layer_insert( name , doid , type )
{
	if( type == 'image' ) icon = 'moicon-image';
	if( type == 'frame' ) icon = 'moicon-web';
	if( type == 'talk' ) icon = 'moicon-chat_bubble_outline';
	if( type == 'text' ) icon = 'moicon-format_shapes';
	if( type == 'role' ) icon = 'moicon-accessibility';
	if( type == 'mo3d' ) icon = 'moicon-3d_rotation';
	if( type == 'symbol' ) icon = 'moicon-music_note';


	//console.log( name );
	$('<li class="layer-item fclayer" id="fclayer-'+ doid +'" data-doid="'+ doid +'"><span class="no">#' + doid + '</span><span class="icon '+ icon +'"></span>&nbsp;'+name+'<div class="control"><span class="up moicon-keyboard_arrow_up"></span> <span class="down moicon-keyboard_arrow_down"></span> <span class="remove moicon-clear"></span></div></li>').prependTo( $("#fclayers-"+mododata.active_box_id) );

	// 添加绑定事件
	$("#fclayer-"+doid+" .control span.up").on( 'click' , function()
	{  
		move_up( $( "#fclayer-"+doid ) ); 
	});

	$("#fclayer-"+doid+" .control span.down").on( 'click' ,  function()
	{  
		move_down( $( "#fclayer-"+doid ) ); 
	});

	$("#fclayer-"+doid+" .control span.remove").on( 'click' ,  function()
	{  
		move_remove( $( "#fclayer-"+doid ) ); 
	});

	$("#fclayer-"+doid).on( 'click' ,  function()
	{  
		
		//alert('选中');
		$('.fclayer').removeClass('active');
		$('#fclayer-'+doid).addClass('active');
		props_show( doid , 'image' );
		mododata.fcanvas[mododata.active_box_id].setActiveObject(mododata.darkobjs[doid]); 
	});



}



function basename(path) 
{
     return path.replace( /.*\//, "" );
}

function sidebar_show( toObj )
{
	var p = $(toObj).offset();
	$('.sidebar').css( 'top' , p.top );
	$('.sidebar').css( 'left' , p.left - 40 );
	$('.sidebar').show();
}

function sidepanel_toggle()
{
	if( parseInt($('#sidepanel').data('show')) == 1)
		sidepanel_hide();
	else
		sidepanel_show();
}

function sidepanel_show()
{
	//$('#sidepanel').css('height',$(window).height());
	$('body').css('width',$('body').width()-320);
	$('.sidebar').css('left',$('.sidebar').position().left-160);
	$('#sidepanel').addClass('show');
	$('#sidepanel').data('show' , 1 );
	//$('#sidepanel').addClass('ps-active-right');
}

function sidepanel_hide()
{
	$('body').css('width','100%');
	$('.sidebar').css('left',$('.sidebar').position().left+160);
	$('#sidepanel').removeClass('show');
	$('#sidepanel').data('show' , 0 );
	//$('#sidepanel').addClass('ps-active-right');
}

function manga_add()
{
	mododata.box_count++;
	var mbox = { id:mododata.box_count };
	mododata.mboxes.push( mbox );
	$('<li class="grid" id="mbox_' + mbox.id + '" data-bid="'+ mbox.id +'"><canvas id="mcanvas_'+ mbox.id +'"></canvas></li>').appendTo($('.manga'));	
}

function move_up( item ) 
{
    var doid = $(item).data('doid');
    if(before = item.prev())
    {
    	//console.log(doid);
    	//console.log(mododata.darkobjs);
    	mododata.darkobjs[doid].bringForward();
    	item.insertBefore(before);
    } 
    	
}

function move_down(item) 
{
    var doid = $(item).data('doid');
    if(after = item.next())
    {
    	//console.log(doid);
    	//console.log(mododata.darkobjs);
    	mododata.darkobjs[doid].sendBackwards();
    	item.insertAfter(after);
			
    } 
}

function move_remove(item) 
{
    var doid = $(item).data('doid');
    //console.log(mododata.darkobjs[doid]);
    mododata.darkobjs[doid].remove();
    mododata.darkobjs[doid] = null;

    item.remove();
    
}

// 

