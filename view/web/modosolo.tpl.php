<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <!-- Required meta tags always come first -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
	<title><?=$data['title'] . ' | ' . c('site_name');?></title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="/assets/css/bootstrap.min.css"/>

    <link rel="stylesheet" href="/assets/font/font.css"/>
    
    <link rel="stylesheet" type="text/css" href="/assets/css/appsolo.css"/>

    <?php if( isset($data['css']) && is_array( $data['css'] ) ): ?>
        <?php foreach( $data['css'] as $cfile ): ?><link rel="stylesheet" type="text/css" href="/assets/css/<?=$cfile?>"/>
        <?php endforeach; ?>
	<?php endif; ?>

	<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

    <!-- jQuery first, then Bootstrap JS. -->
    <script src="/assets/script/jquery.min.js"></script>
    <!-- Bootstrap Core JavaScript -->
    <script src="/assets/script/bootstrap.min.js"></script>
    <script src="/assets/script/jquery.panelslider.js"></script>


    <?php if( isset($data['js']) && is_array( $data['js'] ) ): ?>
        <?php foreach( $data['js'] as $jfile ): ?><script type="text/javascript" src="/assets/script/<?=$jfile;?>" ></script>
        <?php endforeach; ?>
    <?php endif; ?>

    <script type="text/javascript" src="/assets/script/app.js" ></script>

  </head>
  <body>
    <?php

    
    $mainfile = dirname( __FILE__ ) . DS . 'main' . DS . g('c') . '_' . g('a') . '.tpl.php';
    if( file_exists( $mainfile ) ) include( $mainfile );
    else echo "<div class='notice-box'>没有设置模板文件，如需获取JSON，请将Header的Content-Type设置为application/json</div>";
			
    ?>
  </body>
</html>
