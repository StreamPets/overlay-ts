import { SSE_ENDPOINT } from './constants.ts';
import type { Pet } from './pet.ts';
import type { Renderer } from './renderer.ts';

export class EventManager {
	private eventSource: EventSource;
	private connectedUsers: Record<string, Pet> = {};

	constructor(private renderer: Renderer) {
		const { searchParams } = new URL(window.location.href);

		this.eventSource = new EventSource(
			`${SSE_ENDPOINT}?${searchParams.toString()}`,
		);

		this.eventSource.onopen = () => {
			this.renderer.goToScene('world').catch((err) => {
				console.error(err);
			});
		};

		// TODO: Error handling for connection to backend

		this.eventSource.onmessage = (event: MessageEvent) => {
			const data = JSON.parse(event.data);

			switch (event.type) {
				case 'viewer.join':
					this.connectedUsers[data.user.id] =
						this.renderer.addPetToWorld(
							data.imageUrl,
							data.user.name,
						);

					break;

				case 'viewer.leave':
					this.renderer.removePetFromWorld(
						this.connectedUsers[data.user.id],
					);

					break;

				case 'action.jump':
					// Do something with renderer and data
					break;

				case 'update.color':
					// Do something with renderer and data
					break;
			}
		};
	}
}
