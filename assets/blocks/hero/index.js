/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import blockMeta from './block.json';
import './editor.scss';
import './style.scss';

/**
 * Register block
 */
registerBlockType( blockMeta, {
	edit,
	save,
} );
