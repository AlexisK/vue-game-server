import Gamefield from './gamefield';

export default {
    name : 'scene-player',
    components: {
        gamefield: Gamefield
    },
    props: ['levelRef'],
    data() {
        return {};
    },
};
