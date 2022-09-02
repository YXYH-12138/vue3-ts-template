import mitt from "mitt";

type Event = {
	//
};

const emitter = mitt<Event>();

export default emitter;
