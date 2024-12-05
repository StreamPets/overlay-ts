import {
	Color,
	type DefaultLoader,
	DisplayMode,
	Engine,
	Vector,
} from 'excalibur';
import { Pet } from './pet';

// Roadmap: Refactor to use only the WebGL/Canvas renderer instead of the entire game engine.
export class Renderer extends Engine {
	constructor() {
		super({
			displayMode: DisplayMode.FillScreen,
			backgroundColor: Color.Transparent,
		});
	}

	onInitialize() {
		this.rootScene.camera.pos = new Vector(0, 0);
	}

	start(loader: DefaultLoader) {
		this.add(
			new Pet('/black-rex.png', {
				height: 100,
				width: 100,
				pos: new Vector(0, 0),
			}),
		);

		return super.start(loader);
	}
}
