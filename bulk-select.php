<?php
/**
 * Plugin Name:     Bulk Select
 * Plugin URI:      bulk_select
 * Description:     adds a select all products checkbox to woocommerce table
 * Author:          codewithbanji.com
 * Text Domain:     bulk-select
 * Domain Path:     /languages
 * Version:         0.1.0
 *
 * @package         Bulk_Select
 */
add_action("wp_ajax_get_my_stupid_posts", function() {
	global $wp_query;
	add_filter( "edit_posts_per_page", function($ppp){
		return -1;
	});
	wp_edit_posts_query();
	$ret = [];
	foreach($wp_query->posts as $post){
		$ret[] = $post->ID;
	}
	wp_send_json($ret);
});

add_action('current_screen', function($screen){
	if($screen->id == "edit-product"){
		wp_enqueue_script( 'select_all_js', plugins_url( 'assets/js/check_all.js', __FILE__ ), array(), 1.3, true );
		wp_enqueue_style( 'select_all_css', plugins_url( 'assets/css/check_all.css', __FILE__ ), array(), 1.4);
		if($_REQUEST['apply-on-everything']=="true"){
			add_filter( "edit_posts_per_page", function($ppp){
				return -1;
			});
		}
	}
});

function load_all_products_select_js(){
	error_log($screen->id);
	wp_enqueue_script( 'select_all_js', plugins_url( 'assets/js/check_all.js', __FILE__ ), array(), 1.0, true );

}
