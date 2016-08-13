<div class="marea">
	<ul class="manga">
	</ul>
	<div class="bar">
	
	<a href="javascript:void(0);" onClick="manga_add()"><span class="moicon-add_box"></span>&nbsp;追加画格</a> 
	
	<a href="javascript:void(0);" onClick="mt_image_save(1)"><span class="moicon-center_focus_weak"></span>&nbsp;预览作品</a>
	
	<a href="javascript:void(0);" onClick="mt_image_save()"><span class="moicon-cloud_download"></span>&nbsp;下载作品</a> 
	
	<a href="javascript:sidepanel_toggle()" id="sidepanel_link"><span class="moicon-chrome_reader_mode"></span>&nbsp;切换侧栏</a></div>	
	<!-- 素材面板 -->
	<div class="mtdiv">
		<div class="row">
			<div class="col-sm-8">
				<ul class="nav nav-tabs mtlist" role="tablist">
				</ul>
			</div>
			<div class="col-sm-3">
				<div class="input-group">
			      <input type="text" class="form-control" placeholder="Search for...">
			      <span class="input-group-btn">
			        <button class="btn btn-default" type="button"><span class="glyphicon moicon-search" aria-hidden="true"></span></button>
			      </span>
			    </div><!-- /input-group -->
	    	</div>
			<div class="col-sm-1"><button type="button" class="close" aria-label="Close" onClick="mt_box_close();"><span aria-hidden="true">&times;</span></button></div>
		</div>
		<div class="hr"></div>
		
		<div class="tab-content mtlistcontent">
		    

		</div>
		
	</div>
	<!-- /素材面板 -->
	<!-- mo3d面板 -->
	<div class="mo3ddiv">
		<div class="row">
			<div class="col-sm-6">
				<ul class="nav nav-tabs mo3dlist" role="tablist">
				</ul>
			</div>
			<div class="col-sm-5">
				<div class="input-group">
			      <input type="text" class="form-control" placeholder="Search for...">
			      <span class="input-group-btn">
			        <button class="btn btn-default" type="button"><span class="glyphicon moicon-search" aria-hidden="true"></span></button>
			      </span>
			    </div><!-- /input-group -->
	    	</div>
			<div class="col-sm-1">
				<button type="button" class="close" aria-label="Close" onClick="mo3d_box_close();"><span aria-hidden="true">&times;</span></button>

				</div>
		</div>
		<div class="hr"></div>
		
		<div class="tab-content mo3dlistcontent">
		    

		</div>
		
	</div>
	<!-- /mo3d面板 -->
</div>
<div class="sidebar"></div>
<div id="sidepanel">
	<div class="box" id="layer">
		<h1>画格图层</h1>
		<div class="content">
		</div>
	</div>
	<div class="box" id="prop">
		<h1>图层属性</h1>
		<div class="content">
		</div>
	</div>
	<div class="box" id="output">
		<h1>系统输出</h1>
		<div class="content">
			<ul class="loglist"></ul>
		</div>
	</div>
</div>
<div id="overlay"></div>

<div id="rolebtn">
<span class="moicon-directions_run" title="姿势" onclick="mo3d_box('pose');"></span>
<span class="moicon-tag_faces" title="表情" onclick="mo3d_box('emotion');"></span>
<span class="moicon-check_circle" title="退出" onclick="role_save();"></span>
</div>

<div id="mo3dbtn">
<span class="moicon-check_circle" title="退出" onclick="mo3d_save();"></span>
</div>


<script>
var mododata = {};
mododata.mboxes = [ {id:1} ];
mododata.box_count = 1;
mododata.mttabs = 
[ 
	{ 'name':'frame' , 'cname':'画格' , 'icon':'moicon-web' },
	{ 'name':'role' , 'cname':'人物' , 'icon':'moicon-accessibility' },
	{ 'name':'image' , 'cname':'网点' , 'icon':'moicon-gradient' },
	{ 'name':'talk' , 'cname':'对话' , 'icon':'moicon-chat_bubble_outline' },
	{ 'name':'symbol' , 'cname':'符号' , 'icon':'moicon-music_note' },
	{ 'name':'text' , 'cname':'文字' , 'icon':'moicon-format_shapes' },
	{ 'name':'mo3d' , 'cname':'3D' , 'icon':'moicon-3d_rotation' }
];

mododata.mo3dtabs = 
[ 
	{ 'name':'pose' , 'cname':'姿势' , 'icon':'moicon-directions_run' },
	{ 'name':'emotion' , 'cname':'表情' , 'icon':'moicon-tag_faces' }
];
mododata.mtlist = null;
mododata.fcanvas = [];
mododata.active_box_id = 0;
mododata.darkobjs = [];
mododata.darkobj_count = 0;
mododata.iframe_count = 0;

$( document ).ready()
{
	mtlog('页面载入完成，开始载入资源...');
	manga_init();
	sidebar_init();
	mt_box_init();
	mo3d_box_init();
	sidepanel_toggle();
	key_init();
	clipboard_init();
	mtlog('初始化完成...✅');
	
}





</script>