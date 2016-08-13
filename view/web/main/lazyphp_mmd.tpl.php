<canvas id="mbox"></canvas>


<script>
var modo = {};
modo.canvas = $("#mbox");

$( document ).ready()
{
	//alert('<?=$data['url']?>');
	load_model( 'mbox' , '<?=$data['url']?>' );
}


</script>