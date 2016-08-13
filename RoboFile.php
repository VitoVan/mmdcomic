<?php
/**
 * This is project's console commands configuration for Robo task runner.
 *
 * @see http://robo.li/
 */
class RoboFile extends \Robo\Tasks
{
    /**
     * 复制代码到Web目录，并启动
     */
    public function build_www()
    {
    	$path = $this->askDefault('setting Document root , related path only ' , '../mmdcomicweb');
    	$apath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . $path;

    	$this->_exec( 'mkdir -p ' . $apath );
 		$this->_exec( 'cp -Rf * ' . $apath );
 		$this->_exec( 'cd ' . $apath . ' && php -S localhost:8888 route.php ' );		
    }
}