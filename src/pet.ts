import {
	Actor,
	type ActorArgs,
	type Engine,
	ImageSource,
	Sprite,
	Vector,
} from 'excalibur';
import {
	BREAK_CHANCE,
	JUMP_VELOCITY,
	MAX_BREAK_DURATION,
	MIN_BREAK_DURATION,
} from './constants.ts';

export class Pet extends Actor {
	public speed = 100;
	private direction = Vector.Right;
	private isMoving = false;
	private isJumping = false;
	private breakDuration = 0;
	private verticalVelocity = 0;

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

		if (this.isJumping) {
			this.verticalVelocity += 981 * (delta / 1000);
			this.pos.y += this.verticalVelocity * (delta / 1000);
			if (this.pos.y >= 0) {
				this.pos.y = 0;
				this.verticalVelocity = 0;
				this.isJumping = false;
			}
		}

		if (this.isMoving) {
			const newPos = this.pos.add(
				this.direction.scale((this.speed * delta) / 1000),
			);

			// Mathematical trick to reverse direction
			const sign = Math.sign(Math.abs(newPos.x) - engine.halfDrawWidth);
			this.direction.scaleEqual(-sign);
			this.graphics.flipHorizontal = this.direction.x < 0;

			// Randomly decide whether to start a break
			if (Math.random() < BREAK_CHANCE) {
				this.isMoving = false;
			}

			this.pos = newPos;
		} else {
			this.breakDuration -= delta;
			if (this.breakDuration <= 0) {
				this.isMoving = true;
				this.breakDuration =
					Math.random() * (MAX_BREAK_DURATION - MIN_BREAK_DURATION) +
					MIN_BREAK_DURATION;
			}
		}
	}

	jump() {
		if (!this.isJumping) {
			this.isJumping = true;
			this.verticalVelocity = -JUMP_VELOCITY;
		}
	}
}
