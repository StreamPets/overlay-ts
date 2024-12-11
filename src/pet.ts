import {
	Actor,
	type ActorArgs,
	type Engine,
	ImageSource,
	Sprite,
	Vector,
} from 'excalibur';

export class Pet extends Actor {
	public speed = 100;
	private direction = Vector.Right;
	private isMoving = false;
	private minBreakDuration = 1000; // 1 second
	private maxBreakDuration = 3000; // 3 seconds
	private breakDuration = 0;
	private breakChance = 0.01; // 1% chance to start a break per frame

	constructor(
		private graphicUrl: string,
		public options: ActorArgs,
	) {
		super(options);
	}

	onInitialize(_engine: Engine) {
		const imageSource = new ImageSource(this.graphicUrl);

		imageSource.load().catch((err) => {
			console.error(err);
		});

		const sprite = new Sprite({
			image: imageSource,
			destSize: {
				height: this.options.height || 100,
				width: this.options.width || 100,
			},
		});

		this.graphics.use(sprite);
	}

	update(engine: Engine, delta: number) {
		super.update(engine, delta);

		if (this.isMoving) {
			const newPos = this.pos.add(
				this.direction.scale((this.speed * delta) / 1000),
			);

			// Mathematical trick to reverse direction
			const sign = Math.sign(Math.abs(newPos.x) - engine.halfDrawWidth);
			const newDirection = this.direction.scale(-sign);

			// TODO: Fix graphic not flipping on direction change
			this.graphics.flipHorizontal = !(newDirection !== this.direction);
			this.direction = newDirection;

			// Randomly decide whether to start a break
			if (Math.random() < this.breakChance) {
				this.isMoving = false;
			}

			this.pos = newPos;
		} else {
			this.breakDuration -= delta;
			if (this.breakDuration <= 0) {
				this.isMoving = true;
				this.breakDuration =
					Math.random() *
						(this.maxBreakDuration - this.minBreakDuration) +
					this.minBreakDuration;
			}
		}
	}
}
