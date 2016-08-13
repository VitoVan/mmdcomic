<?php 
namespace Lazyphp\Core {
Class RestException extends \Exception {}
Class RouteException extends \Lazyphp\Core\RestException {}
Class InputException extends \Lazyphp\Core\RestException {}
Class DatabaseException extends \Lazyphp\Core\RestException {}
Class DataException extends \Lazyphp\Core\RestException {}
Class AuthException extends \Lazyphp\Core\RestException {}
Class TmplateException extends \Lazyphp\Core\RestException {}
Class RpwtException extends \Lazyphp\Core\RestException {}
Class RemoteException extends \Lazyphp\Core\RestException {}
}
namespace{
$GLOBALS['meta'] = array (
  '70c907e8750f400eb470132e210b44cb' => 
  array (
    'Description' => 
    array (
      0 => 
      array (
        'section' => 'Demo',
        'description' => '默认提示',
      ),
    ),
    'LazyRoute' => 
    array (
      0 => 
      array (
        'route' => 'GET /',
        'ApiMethod' => '(type="GET")',
        'ApiRoute' => '(name="/")',
      ),
    ),
    'Return' => 
    array (
      0 => 
      array (
        'type' => 'object',
        'sample' => '{\'code\': 0,\'message\': \'success\'}',
      ),
    ),
    'binding' => false,
    'route' => 
    array (
      0 => 
      array (
        'uri' => 'GET /',
        'params' => false,
      ),
    ),
  ),
  'c1b4c6d89012a26992ee044a2711f587' => 
  array (
    'Description' => 
    array (
      0 => 
      array (
        'section' => 'Editor',
        'description' => '漫画编辑器',
      ),
    ),
    'LazyRoute' => 
    array (
      0 => 
      array (
        'route' => 'GET /editor',
        'ApiMethod' => '(type="GET")',
        'ApiRoute' => '(name="/editor")',
      ),
    ),
    'Return' => 
    array (
      0 => 
      array (
        'type' => 'object',
        'sample' => '{\'code\': 0,\'message\': \'success\'}',
      ),
    ),
    'binding' => false,
    'route' => 
    array (
      0 => 
      array (
        'uri' => 'GET /editor',
        'params' => false,
      ),
    ),
  ),
  '039a3032e1bca4289db765365162086a' => 
  array (
    'Description' => 
    array (
      0 => 
      array (
        'section' => 'Demo',
        'description' => '系统提示',
      ),
    ),
    'LazyRoute' => 
    array (
      0 => 
      array (
        'route' => 'GET /info',
        'ApiMethod' => '(type="GET")',
        'ApiRoute' => '(name="/info")',
      ),
    ),
    'Return' => 
    array (
      0 => 
      array (
        'type' => 'object',
        'sample' => '{\'code\': 0,\'message\': \'success\'}',
      ),
    ),
    'binding' => false,
    'route' => 
    array (
      0 => 
      array (
        'uri' => 'GET /info',
        'params' => false,
      ),
    ),
  ),
  '4e262f143508d5f6d1a796bb8d54eafa' => 
  array (
    'Description' => 
    array (
      0 => 
      array (
        'section' => 'Demo',
        'description' => 'Import',
      ),
    ),
    'LazyRoute' => 
    array (
      0 => 
      array (
        'route' => 'GET /import',
        'ApiMethod' => '(type="GET")',
        'ApiRoute' => '(name="/import")',
      ),
    ),
    'Return' => 
    array (
      0 => 
      array (
        'type' => 'object',
        'sample' => '{\'code\': 0,\'message\': \'success\'}',
      ),
    ),
    'binding' => false,
    'route' => 
    array (
      0 => 
      array (
        'uri' => 'GET /import',
        'params' => false,
      ),
    ),
  ),
  'cac4f8896a1bcddf2b2ffaa64d260195' => 
  array (
    'Description' => 
    array (
      0 => 
      array (
        'section' => 'mt',
        'description' => '获取可用的素材列表',
      ),
    ),
    'LazyRoute' => 
    array (
      0 => 
      array (
        'route' => 'GET /mt/list',
        'ApiMethod' => '(type="GET")',
        'ApiRoute' => '(name="/mt/list")',
      ),
    ),
    'Params' => 
    array (
      0 => 
      array (
        'name' => 'cate',
        'filters' => 
        array (
          0 => 'donothing',
        ),
        'cnname' => '素材分类',
      ),
    ),
    'Return' => 
    array (
      0 => 
      array (
        'type' => 'object',
        'sample' => '{\'code\': 0,\'message\': \'success\'}',
      ),
    ),
    'binding' => 
    array (
      'cate' => 
      array (
        'name' => 'cate',
      ),
    ),
    'route' => 
    array (
      0 => 
      array (
        'uri' => 'GET /mt/list',
        'params' => false,
      ),
    ),
  ),
  'a8488bf79cf6eac62b62e6bfebdc7936' => 
  array (
    'Description' => 
    array (
      0 => 
      array (
        'section' => 'mt',
        'description' => '获取可用的姿势和表情列表',
      ),
    ),
    'LazyRoute' => 
    array (
      0 => 
      array (
        'route' => 'GET /mt/vpd',
        'ApiMethod' => '(type="GET")',
        'ApiRoute' => '(name="/mt/vpd")',
      ),
    ),
    'Params' => 
    array (
      0 => 
      array (
        'name' => 'cate',
        'filters' => 
        array (
          0 => 'donothing',
        ),
        'cnname' => '数据分类',
      ),
    ),
    'Return' => 
    array (
      0 => 
      array (
        'type' => 'object',
        'sample' => '{\'code\': 0,\'message\': \'success\'}',
      ),
    ),
    'binding' => 
    array (
      'cate' => 
      array (
        'name' => 'cate',
      ),
    ),
    'route' => 
    array (
      0 => 
      array (
        'uri' => 'GET /mt/vpd',
        'params' => false,
      ),
    ),
  ),
  '8626e9fffd981eda74f40c9895b13362' => 
  array (
    'Description' => 
    array (
      0 => 
      array (
        'section' => 'mt',
        'description' => 'MMD模型编辑页',
      ),
    ),
    'LazyRoute' => 
    array (
      0 => 
      array (
        'route' => 'GET /mt/mmd',
        'ApiMethod' => '(type="GET")',
        'ApiRoute' => '(name="/mt/mmd")',
      ),
    ),
    'Params' => 
    array (
      0 => 
      array (
        'name' => 'url',
        'filters' => 
        array (
          0 => 'donothing',
        ),
        'cnname' => '模型相对路径',
      ),
    ),
    'Return' => 
    array (
      0 => 
      array (
        'type' => 'object',
        'sample' => '{\'code\': 0,\'message\': \'success\'}',
      ),
    ),
    'binding' => 
    array (
      'url' => 
      array (
        'name' => 'url',
      ),
    ),
    'route' => 
    array (
      0 => 
      array (
        'uri' => 'GET /mt/mmd',
        'params' => false,
      ),
    ),
  ),
);
$app = new \Lazyphp\Core\Application();
$app->route('GET /',array( 'Lazyphp\Controller\LazyphpController','index'));
$app->route('GET /editor',array( 'Lazyphp\Controller\LazyphpController','editor'));
$app->route('GET /info',array( 'Lazyphp\Controller\LazyphpController','info'));
$app->route('GET /import',array( 'Lazyphp\Controller\LazyphpController','import'));
$app->route('GET /mt/list',array( 'Lazyphp\Controller\LazyphpController','mt_list'));
$app->route('GET /mt/vpd',array( 'Lazyphp\Controller\LazyphpController','mt_vpd'));
$app->route('GET /mt/mmd',array( 'Lazyphp\Controller\LazyphpController','mmd'));
$app->run();
}
