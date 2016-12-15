import Cell from './cell';
import Actor from './actor';

export default {
    name       : 'gamefield',
    components : {
        cell  : Cell,
        actor : Actor
    },
    props      : ['levelRef'],
    data() {
        return {};
    },
};
