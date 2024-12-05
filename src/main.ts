import { Loader } from 'excalibur';
import { Renderer } from './renderer';

const renderer = new Renderer();

renderer
	.start(new Loader())
	.then(() => {
		console.log('Renderer started!');
	})
	.catch((err) => {
		console.error(err);
	});
