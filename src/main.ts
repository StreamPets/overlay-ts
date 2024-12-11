import { Loader } from 'excalibur';
import { EventManager } from './event-manager.ts';
import { Renderer } from './renderer';

const renderer = new Renderer();

new EventManager(renderer);

renderer
	.start(new Loader())
	.then(() => {
		console.log('[Renderer] Ready!');
	})
	.catch((err) => {
		console.error(err);
	});
