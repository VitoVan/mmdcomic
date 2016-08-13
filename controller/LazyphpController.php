<?php
namespace Lazyphp\Controller;

class LazyphpController
{
	public function __construct()
    {
        
    }


    /**
     * 默认提示
     * @ApiDescription(section="Demo", description="默认提示")
     * @ApiLazyRoute(uri="/",method="GET")
     * @ApiReturn(type="object", sample="{'code': 0,'message': 'success'}")
     */
    public function index()
    {
        $data['title'] = $data['top_title'] = 'Version 4.5';
        return render_web( $data  , 'modo' );

    }

    /**
     * 漫画编辑器
     * @ApiDescription(section="Editor", description="漫画编辑器")
     * @ApiLazyRoute(uri="/editor",method="GET")
     * @ApiReturn(type="object", sample="{'code': 0,'message': 'success'}")
     */
    public function editor()
    {
        $data['title'] = $data['top_title'] = 'Modo编辑器';
        return render_web( $data  , 'modo' );
    }

    /**
     * 系统提示
     * @ApiDescription(section="Demo", description="系统提示")
     * @ApiLazyRoute(uri="/info",method="GET")
     * @ApiReturn(type="object", sample="{'code': 0,'message': 'success'}")
     */
    public function info()
    {
        //$data['notice'] = ;
        return send_error('SYSTEM','这里是信息提示页面');
    }

    /**
     * Import
     * @ApiDescription(section="Demo", description="Import")
     * @ApiLazyRoute(uri="/import",method="GET")
     * @ApiReturn(type="object", sample="{'code': 0,'message': 'success'}")
     */
    public function import()
    {
        exit;
        $vpd_dir = AROOT . 'assets'. DS . 'mt' . DS . 'res' . DS . 'vpd' . DS ;
        $sql = "INSERT IGNORE INTO `vpd` ( `cate` , `name` , `image_url` , `resource_url` , `created` ) VALUES  ";

        foreach (glob($vpd_dir . "*.vpd") as $filename) 
        {
            $fname = basename( $filename );
            $fname = str_replace( '.vpd' , '' , $fname );

            $dsql[] = " ( 'pose' , '姿势" . $fname . "' , '/assets/mt/snap/pose." . $fname . ".png' , '/assets/mt/res/vpd/" . $fname . ".vpd' , '" . date("Y-m-d H:i:s") . "' ) ";     
        }

        $sql = $sql . join( ' , ' ,  $dsql );
        run_sql( $sql );
        //echo $sql;
        //$data['notice'] = ;
        //return send_error('SYSTEM','这里是信息提示页面');
    }
    
    /**
     * 获取可用的素材列表
     * @ApiDescription(section="mt", description="获取可用的素材列表")
     * @ApiLazyRoute(uri="/mt/list",method="GET")
     * @ApiParams(name="cate", type="string", nullable=true, description="cate", cnname="素材分类")
     * @ApiReturn(type="object", sample="{'code': 0,'message': 'success'}")
     */
    public function mt_list($cate)
    {
        /*
        $sql = "SELECT * FROM `mt` WHERE `show_it` = 1 ORDER BY `cate` DESC LIMIT 1000";
        $data = get_data( $sql );
        //$data = json_decode(file_get_contents('assets/data/list.data') , 1 );
        
        //file_put_contents('list.data', json_encode($data));
        foreach( $data as $item )
        {
            $ret[$item['cate']][] = $item;
        }
        
        file_put_contents('list.data', json_encode($ret));
        */
        $ret = json_decode(file_get_contents('assets/data/list.data') , 1 );
        return render_json( $ret );
    }

    /**
     * 获取可用的姿势和表情列表
     * @ApiDescription(section="mt", description="获取可用的姿势和表情列表")
     * @ApiLazyRoute(uri="/mt/vpd",method="GET")
     * @ApiParams(name="cate", type="string", nullable=true, description="cate", cnname="数据分类")
     * @ApiReturn(type="object", sample="{'code': 0,'message': 'success'}")
     */
    public function mt_vpd($cate)
    {
        /*
        $sql = "SELECT * FROM `vpd` WHERE `show_it` = 1 ORDER BY `id` DESC LIMIT 1000";
        $data = get_data( $sql );
        foreach( $data as $item )
        {
            $ret[$item['cate']][] = $item;
        }

        file_put_contents('vpd.data', json_encode($ret));
        */
        $ret = json_decode(file_get_contents('assets/data/vpd.data') , 1 );
        return render_json( $ret );
    }

    /**
     * MMD模型编辑页
     * @ApiDescription(section="mt", description="MMD模型编辑页")
     * @ApiLazyRoute(uri="/mt/mmd",method="GET")
     * @ApiParams(name="url", type="string", nullable=false, description="url", cnname="模型相对路径")
     * @ApiReturn(type="object", sample="{'code': 0,'message': 'success'}")
     */
    public function mmd($url)
    {
        $data['top_title'] = $data['title'] = 'MMD模型编辑页';
        $data['js'][] = 'jThree.js';
        $data['js'][] = 'jThree.MMD.js';
        $data['js'][] = 'editorcontrols.js';
        $data['js'][] = 'gridhelper.js';
        //$data['js'][] = 'ammo.js';
        $data['js'][] = 'mmd.js';
        $data['url'] = $url;
        return render_web( $data , 'modosolo' );
    }

}
