<?php
function itmar_render_callback_pickup_posts( $attributes ){
	$wrapper_attributes = get_block_wrapper_attributes();
 
	$args = array(
		'numberposts'	=> $attributes['numberOfItems'],
	);
 
	$output = sprintf( '<div %1$s>', $wrapper_attributes );
 
	$picup_posts = get_posts( $args );
 
	if( ! empty( $picup_posts ) ){
		$output .= '<ul class="post_items">';
 
		foreach ( $picup_posts as $p ){
			$title = $p->post_title ? $p->post_title : __( 'No title', 'block-location' );
			$url = esc_url( get_permalink( $p->ID ) );
			$thumbnail = has_post_thumbnail( $p->ID ) ? get_the_post_thumbnail( $p->ID, 'medium' ) : '';
 
			$output .= '<li>';
			if( ! empty( $thumbnail ) && $attributes['displayThumbnail'] ){
				$output .= '<a href="' . $url . ' class="post_thumbnail_link">' . $thumbnail . '</a>';
			}
			$output .= '<h3 class="post_title">';
			$output .= '<a href="' . $url . '">' . $title . '</a>';
			$output .= '</h3>';
			if( $attributes['displayDate'] ){
				$output .= '<time class="post_date" datetime="'. esc_attr( get_the_date( 'c', $p )).'">'. esc_html( get_the_date( '', $p ) ) . '</time>';
			}
			$output .= '</li>';
		}

		$output .= '</ul>';
	} else {
		$output .= sprintf( '<p>%1$s</p>', __( 'Sorry. No posts matching your criteria!', 'block-location' ) );
	}
 
	$output .= '</div>';
 
	return $output;
}
