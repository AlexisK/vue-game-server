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
    methods: {
        handleMouseMove(ev) {
            let rect = this.$el.getBoundingClientRect();
            this.$emit('pointerupdate', ev.clientX - Math.round(rect.left), ev.clientY - Math.round(rect.top));
        },
        handleClick(ev) {
            this.$emit('focused');
            if ( ev.button === 2 ) {
                this.$emit('pointerRight');
            } else {
                this.$emit('pointerLeft');
            }
        }
    }
};
