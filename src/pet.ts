import {
	Actor,
	type ActorArgs,
	type Engine,
	ImageSource,
	Sprite,
} from 'excalibur';

export class Pet extends Actor {
	constructor(
		private graphicUrl: string,
		public options: ActorArgs,
	) {
		super(options);
	}

	onInitialize(_engine: Engine) {
		const imageSource = new ImageSource(this.graphicUrl);

		(async () => {
			await imageSource.load();
		})();

		const sprite = new Sprite({
			image: imageSource,
			destSize: {
				height: this.options.height || 100,
				width: this.options.width || 100,
			},
		});

		this.graphics.use(sprite);
	}
}
