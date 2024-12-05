import {
	Color,
	type DefaultLoader,
	DisplayMode,
	Engine,
	Scene,
	Vector,
} from 'excalibur';
import { Pet } from './pet';

// Roadmap: Refactor to use only the WebGL/Canvas renderer instead of the entire game engine.
export class Renderer extends Engine {
	world = new Scene();

	constructor() {
		super({
			displayMode: DisplayMode.FillScreen,
			backgroundColor: Color.Transparent,
		});
	}

	// Should probably split into joinWorld and addPetToWorld to leverage the unkill() method on Actors.
	public addPetToWorld(imageUrl: string, username: string) {
		const pet = new Pet(imageUrl, {
			height: 100,
			width: 100,
			pos: new Vector(0, 0),
		});

		// TODO: Add a label on the pet that contains the username
		this.world.add(pet);
		return pet;
	}

	public removePetFromWorld(pet: Pet) {
		pet.kill();
	}

	onInitialize() {
		this.world.camera.pos = new Vector(0, 0);
	}

	start(loader: DefaultLoader) {
		this.add('world', this.world);
		return super.start(loader);
	}
}
